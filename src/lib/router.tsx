import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../component/layout";
import { Home } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
