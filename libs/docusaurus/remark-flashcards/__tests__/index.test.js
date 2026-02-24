import { describe, it, expect, vi, beforeEach } from "vitest";

const remarkFlashcards = (await import("../index.js")).default;

let mockLoader;

function createPlugin() {
  return remarkFlashcards({ _loader: mockLoader });
}

function makeFCNode(attrs = []) {
  return {
    type: "mdxJsxFlowElement",
    name: "Flashcards",
    attributes: [...attrs],
    children: [],
  };
}

function makeTree(nodes) {
  return {
    type: "root",
    children: nodes || [makeFCNode()],
  };
}

function makeFile(filePath) {
  return { history: [filePath], path: filePath };
}

function getCardsAttr(node) {
  return node.attributes.find(
    (a) => a.type === "mdxJsxAttribute" && a.name === "cards",
  );
}

function getInjectedValue(node) {
  const attr = getCardsAttr(node);
  if (!attr) return undefined;
  return JSON.parse(attr.value.value);
}

describe("remark-flashcards", () => {
  beforeEach(() => {
    mockLoader = vi.fn();
  });

  it("injects cards prop when valid YAML exists", () => {
    const deck = {
      deck: { id: "test-deck", title: "Test Deck", version: 1 },
      cards: [{ id: "c1", front: "Q1?", back: "A1" }],
    };
    mockLoader.mockReturnValue({
      filePath: "/docs/lesson.flashcards.yaml",
      deck,
    });

    const tree = makeTree([makeFCNode()]);
    const plugin = createPlugin();
    plugin(tree, makeFile("/docs/lesson.md"));

    const injected = getInjectedValue(tree.children[0]);
    expect(injected).toEqual(deck);

    // Verify estree structure exists
    const attr = getCardsAttr(tree.children[0]);
    expect(attr.value.data.estree.type).toBe("Program");
    expect(attr.value.data.estree.body[0].type).toBe("ExpressionStatement");
  });

  it("injects cards={null} when no YAML file exists", () => {
    mockLoader.mockReturnValue(null);

    const tree = makeTree([makeFCNode()]);
    const plugin = createPlugin();
    plugin(tree, makeFile("/docs/lesson.md"));

    const injected = getInjectedValue(tree.children[0]);
    expect(injected).toBeNull();
  });

  it("throws when YAML is unparseable", () => {
    mockLoader.mockImplementation(() => {
      throw new Error("Invalid YAML at line 3");
    });

    const tree = makeTree([makeFCNode()]);
    const plugin = createPlugin();

    expect(() => plugin(tree, makeFile("/docs/lesson.md"))).toThrow(
      /remark-flashcards: failed to load flashcards for "\/docs\/lesson\.md"/,
    );
  });

  it("throws when deck is missing required id field", () => {
    mockLoader.mockReturnValue({
      filePath: "/docs/lesson.flashcards.yaml",
      deck: { deck: {}, cards: [] },
    });

    const tree = makeTree([makeFCNode()]);
    const plugin = createPlugin();

    expect(() => plugin(tree, makeFile("/docs/lesson.md"))).toThrow(
      /missing required "deck\.id" field/,
    );
  });

  it("throws when deck is missing cards array", () => {
    mockLoader.mockReturnValue({
      filePath: "/docs/lesson.flashcards.yaml",
      deck: { deck: { id: "d1" } },
    });

    const tree = makeTree([makeFCNode()]);
    const plugin = createPlugin();

    expect(() => plugin(tree, makeFile("/docs/lesson.md"))).toThrow(
      /missing required "cards" array/,
    );
  });

  it("normalizes backslashes in file paths", () => {
    const deck = {
      deck: { id: "d1", title: "D", version: 1 },
      cards: [{ id: "c1", front: "Q?", back: "A" }],
    };
    mockLoader.mockReturnValue({ filePath: "x", deck });

    const tree = makeTree([makeFCNode()]);
    const plugin = createPlugin();
    plugin(tree, makeFile("C:\\Users\\docs\\lesson.md"));

    // mockLoader should receive forward slashes
    expect(mockLoader).toHaveBeenCalledWith("C:/Users/docs/lesson.md");
  });

  it("processes multiple Flashcards nodes independently", () => {
    const deck1 = {
      deck: { id: "d1", title: "D1", version: 1 },
      cards: [{ id: "c1", front: "Q1?", back: "A1" }],
    };
    const deck2 = {
      deck: { id: "d2", title: "D2", version: 1 },
      cards: [{ id: "c2", front: "Q2?", back: "A2" }],
    };

    mockLoader
      .mockReturnValueOnce({ filePath: "a", deck: deck1 })
      .mockReturnValueOnce({ filePath: "b", deck: deck2 });

    const node1 = makeFCNode();
    const node2 = makeFCNode();
    const tree = makeTree([node1, node2]);
    const plugin = createPlugin();
    plugin(tree, makeFile("/docs/lesson.md"));

    expect(getInjectedValue(tree.children[0])).toEqual(deck1);
    expect(getInjectedValue(tree.children[1])).toEqual(deck2);
    expect(mockLoader).toHaveBeenCalledTimes(2);
  });

  it("skips nodes that already have a cards attribute", () => {
    mockLoader.mockReturnValue(null);

    const existingAttr = {
      type: "mdxJsxAttribute",
      name: "cards",
      value: "explicit",
    };
    const tree = makeTree([makeFCNode([existingAttr])]);
    const plugin = createPlugin();
    plugin(tree, makeFile("/docs/lesson.md"));

    // Should not have called loader at all
    expect(mockLoader).not.toHaveBeenCalled();
    // Should still have only the original attribute
    expect(tree.children[0].attributes).toHaveLength(1);
    expect(tree.children[0].attributes[0].value).toBe("explicit");
  });
});
