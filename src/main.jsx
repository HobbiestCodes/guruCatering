import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routers/App.jsx'
import ErrorPage from './routers/error.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./components/sass/universal.scss";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/ui/admin/index.jsx';
import Update from './routers/Update.jsx';
import Menu from './routers/Menu.jsx';


const ReactRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/edit',
      element: <Update />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/Menu',
      element: <Menu />,
      errorElement: <ErrorPage />,
    }

  ]);
  return <RouterProvider router={router} />;
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactRouter />
  </StrictMode>,
)
