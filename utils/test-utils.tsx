import type { RenderOptions } from "@testing-library/react";
import { render as rtlRender } from "@testing-library/react";
import { RemixBrowser } from "@remix-run/react";
import { faker } from "@faker-js/faker";

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  function RootComponent() {
    return ui;
  }

  window.__remixManifest = {
    routes: {
      root: {
        hasAction: false,
        hasCatchBoundary: false,
        hasErrorBoundary: false,
        hasLoader: false,
        id: "root",
        imports: [],
        module: "",
        path: "",
      },
    },
    entry: { imports: [], module: "" },
    url: "",
    version: "",
  };
  window.__remixRouteModules = { root: { default: RootComponent } };
  window.__remixContext = {
    matches: [],
    manifest: window.__remixManifest,
    routeModules: window.__remixRouteModules,
    routeData: {},
    appState: {
      catchBoundaryRouteId: null,
      loaderBoundaryRouteId: null,
      renderBoundaryRouteId: "root",
      trackBoundaries: false,
      trackCatchBoundaries: false,
    },
  };

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <RemixBrowser>{children}</RemixBrowser>;
  }
  return rtlRender(ui, {
    wrapper: Wrapper,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { faker };
// override render export
export { customRender as render };
