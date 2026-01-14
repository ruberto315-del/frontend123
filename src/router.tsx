import { createBrowserRouter, Link } from "react-router";
import { CoursesPage } from "./pages/courses-page";
import { RootLayout } from "./components/layouts/root-layouts";
import HomePage from "./pages/home-page";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
      
        children: [
                  {
          path: "/",
          element: <HomePage />,
        },
      
          {
          path: "/Courses",
          element: <CoursesPage />
        },
        ]
      
  
  }
])