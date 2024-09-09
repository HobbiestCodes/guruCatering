import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./routers/App.jsx";
import ErrorPage from "./routers/error.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./components/sass/universal.scss";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Dashboard from "./components/ui/admin/index.jsx";
import Update from "./routers/Update.jsx";
import Menu from "./routers/Menu.jsx";
import { ArrayProvider } from "./components/funcs/context.jsx";
import Items from "./routers/Items.jsx";
import Navbar from "./components/ui/navbar/index.jsx";
import Tea from "./components/ui/loader/tea.jsx";
import Render from "./components/render/Render.jsx";

// const ReactRouter = () => {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <App />,
//       errorElement: <ErrorPage />,
//     },
//     {
//       path: "/dashboard",
//       element: <Dashboard />,
//       errorElement: <ErrorPage />,
//     },
//     {
//       path: "/edit",
//       element: <Update />,
//       errorElement: <ErrorPage />,
//     },
//     {
//       path: "/menu",
//       element: <Menu />,
//       errorElement: <ErrorPage />,
//     },
//     {
//       path: "/menu/:category",
//       element: <Menu />,
//       errorElement: <ErrorPage />,
//     },
//     {
//       path: "/dashboard/items",
//       element: <Items />,
//       errorElement: <ErrorPage />,
//     },
//   ]);
//   return <RouterProvider router={router} />;
// };
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ArrayProvider>
        {/* <ReactRouter /> */}
        <Navbar />
        <Routes>
          <Route path="*" element={<Tea />} />
          <Route
            errorElement={<ErrorPage />}
            path="/"
            element={
              <Suspense fallback={<Tea />}>
                <Render />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/edit"
            element={<Update />}
            errorElement={<ErrorPage />}
          />
          <Route path="/menu" element={<Menu />} errorElement={<ErrorPage />} />
          <Route
            path="/dashboard/items"
            element={<Items />}
            errorElement={<ErrorPage />}
          />
        </Routes>
      </ArrayProvider>
    </BrowserRouter>
  </StrictMode>
);
