import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Ensure DOM cleanup between tests
afterEach(() => {
  cleanup();
});

// Node 25+ introduces an experimental localStorage behind flags; depending on
// NODE_OPTIONS this can surface as a partial implementation. Provide a stable
// in-memory Storage for all tests.
function createMemoryStorage(): Storage {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    },
  } as Storage;
}

try {
  const memoryStorage = createMemoryStorage();
  Object.defineProperty(globalThis, "localStorage", {
    value: memoryStorage,
    configurable: true,
  });
  if (typeof window !== "undefined") {
    Object.defineProperty(window, "localStorage", {
      value: memoryStorage,
      configurable: true,
    });
  }
} catch {
  // ignore
}

// Mock @xterm/xterm — Terminal requires a real canvas element which jsdom doesn't support
vi.mock("@xterm/xterm", () => {
  class MockTerminal {
    open = vi.fn();
    write = vi.fn();
    dispose = vi.fn();
    onData = vi.fn(() => ({ dispose: vi.fn() }));
    onResize = vi.fn(() => ({ dispose: vi.fn() }));
    loadAddon = vi.fn();
    element = document.createElement("div");
    cols = 80;
    rows = 24;
  }
  return { Terminal: MockTerminal };
});

// Mock @xterm/addon-fit
vi.mock("@xterm/addon-fit", () => {
  class MockFitAddon {
    fit = vi.fn();
    dispose = vi.fn();
    proposeDimensions = vi.fn(() => ({ cols: 80, rows: 24 }));
  }
  return { FitAddon: MockFitAddon };
});

// Mock WebSocket for node/jsdom environment
class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = MockWebSocket.CONNECTING;
  url: string;
  onopen: ((ev: Event) => void) | null = null;
  onclose: ((ev: CloseEvent) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
    // Simulate async connection
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      this.onopen?.(new Event("open"));
    }, 0);
  }

  send = vi.fn();
  close = vi.fn(() => {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose?.(new CloseEvent("close"));
  });

  addEventListener = vi.fn();
  removeEventListener = vi.fn();
}

// Always override WebSocket — jsdom 28+ includes a real WebSocket implementation
// that tries to make actual connections, which we don't want in tests.
(globalThis as Record<string, unknown>).WebSocket = MockWebSocket;

// Mock navigator.clipboard — must be configurable so @testing-library/user-event
// can redefine it with its own clipboard stub.
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(""),
  },
  writable: true,
  configurable: true,
});

// Mock ResizeObserver — not available in jsdom
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

if (typeof globalThis.ResizeObserver === "undefined") {
  (globalThis as Record<string, unknown>).ResizeObserver = MockResizeObserver;
}

// Radix UI uses Pointer Events APIs which are not fully implemented in jsdom.
if (typeof Element !== "undefined") {
  if (!Element.prototype.hasPointerCapture) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.setPointerCapture) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Element.prototype.setPointerCapture = () => {};
  }
  if (!Element.prototype.releasePointerCapture) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Element.prototype.releasePointerCapture = () => {};
  }
  if (!Element.prototype.scrollIntoView) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Element.prototype.scrollIntoView = () => {};
  }
}

// Suppress console noise in tests
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});
