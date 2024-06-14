import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  FilmCreate,
  FilmEdit,
  FilmShow,
  FilmList,
} from "./pages/Film";
import {
  SceneCreate,
  SceneEdit,
  SceneList,
  SceneShow,
} from "./pages/Scene";
import {
  CharacterCreate,
  CharacterEdit,
  CharacterList,
  CharacterShow,
} from "./pages/Characters";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("http://localhost:8081")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "films",
                    list: "/films",
                    create: "/films/create",
                    edit: "/films/edit/:id",
                    show: "/films/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "characters",
                    list: "/characters",
                    create: "/characters/create",
                    edit: "/characters/edit/:id",
                    show: "/characters/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "scenes",
                    list: "/scenes",
                    create: "/scenes/create",
                    edit: "/scenes/edit/:id",
                    show: "/scenes/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "1loQKc-SieSpZ-xi00Jp",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="films" />}
                    />
                    <Route path="/films">
                      <Route index element={<FilmList />} />
                      <Route path="create" element={<FilmCreate />} />
                      <Route path="edit/:id" element={<FilmEdit />} />
                      <Route path="show/:id" element={<FilmShow />} />
                    </Route>
                    <Route path="/characters">
                      <Route index element={<CharacterList />} />
                      <Route path="create" element={<CharacterCreate />} />
                      <Route path="edit/:id" element={<CharacterEdit />} />
                      <Route path="show/:id" element={<CharacterShow />} />
                    </Route>
                    <Route path="/scenes">
                      <Route index element={<SceneList />} />
                      <Route path="create" element={<SceneCreate />} />
                      <Route path="edit/:id" element={<SceneEdit />} />
                      <Route path="show/:id" element={<SceneShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
