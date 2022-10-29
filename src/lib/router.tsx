import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../component/layout";
import { Detail, FourOhFour, Home } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <FourOhFour />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detail/:activityId",
        element: <Detail />,
      },
    ],
  },
]);
