import { Outlet } from "react-router-dom";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <BreadcrumbNavigation />
      <Outlet />
    </div>
  );
};

export default Layout;
