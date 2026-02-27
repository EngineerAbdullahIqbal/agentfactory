// Minimal stubs for @docusaurus/router used in unit tests.
// Avoids requiring a real React Router context.

export function useLocation(): { pathname: string } {
  return { pathname: "/" };
}

export function useHistory(): {
  push: (path: string) => void;
  replace: (path: string) => void;
  goBack: () => void;
} {
  return {
    push: () => {},
    replace: () => {},
    goBack: () => {},
  };
}

