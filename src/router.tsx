import { createBrowserRouter, Link } from "react-router";
import { ArchivePage } from "./pages/archive-page";
import { RootLayout } from "./components/layouts/root-layouts";
import HomePage from "./pages/home-page";
import MyCoursesPage from "./pages/my-courses-page";
import AuthPage from "./pages/auth-page";
import AdminPage from "./pages/admin-page";
import AdminCoursesPage from "./pages/admin-courses-page";
import AdminRegistrationsPage from "./pages/admin-registrations-page";
import AdminCertificatesPage from "./pages/admin-certificates-page";
import AdminUsersPage from "./pages/admin-users-page";
import ProfilePage from "./pages/profile-page";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
      
        children: [
                  {
          path: "/",
          element: <HomePage />,
        },
      
          {
          path: "/archive",
          element: <ArchivePage />
        },
          {
          path: "/my-courses",
          element: <MyCoursesPage />
        },

          {
          path: "/admin",
          element: <AdminPage />
        },

          {
          path: "/admin/courses",
          element: <AdminCoursesPage />
        },
        
          {
          path: "/auth",
          element: <AuthPage />
        },

          {
          path: "/admin/registrations",
          element: <AdminRegistrationsPage />
        },

          {
          path: "/admin/certificates",
          element: <AdminCertificatesPage />
        },

          {
          path: "/admin/users",
          element: <AdminUsersPage />
        },

          {
          path: "/profile",
          element: <ProfilePage />
        },

        ]
      
  
  }
])