import { Outlet, useLocation } from "react-router";
import Header from "../common/header";
import { Footer } from "../common/footer";
import { Toaster } from "sonner";
import TanStackLayout from "./tanstak-layout";

export const RootLayout = () => {
  const location = useLocation()
  return (
    <TanStackLayout>
    <div className="min-h-screen">
      {location.pathname !== "/auth" && <Header />}
      <Outlet />
      {location.pathname === "/" && <Footer />}

      <Toaster />
    </div>
    </TanStackLayout>
  );
};

