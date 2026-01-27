import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "@/components/layout/public-layout";
import { PrivateLayout } from "@/components/layout/private-layout";
import { HomePage } from "@/pages/home-page";

export const router = createBrowserRouter([
  // Public routes - redirect to dashboard if authenticated
  {
    element: <PublicLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },

  // Private routes - redirect to login if not authenticated
  {
    element: <PrivateLayout />,
    children: [],
  },
]);
