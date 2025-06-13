import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Icon from "@/components/ui/icon";

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: string;
}

const ROUTE_CONFIG: Record<string, { label: string; icon: string }> = {
  tree: { label: "Семейное древо", icon: "TreePine" },
  "edit-member": { label: "Редактирование", icon: "Edit" },
  profile: { label: "Профиль", icon: "User" },
  auth: { label: "Авторизация", icon: "LogIn" },
  member: { label: "Участник", icon: "Users" },
  heritage: { label: "Наследие", icon: "Scroll" },
};

const BreadcrumbNavigation = () => {
  const location = useLocation();

  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Главная", path: "/", icon: "Home" },
    ];

    if (pathSegments.length === 0) {
      return breadcrumbs;
    }

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      const config = ROUTE_CONFIG[segment];
      const label =
        config?.label || (/^\d+$/.test(segment) ? `#${segment}` : segment);
      const icon = config?.icon || (/^\d+$/.test(segment) ? "Hash" : "");

      breadcrumbs.push({ label, path: currentPath, icon });
    });

    return breadcrumbs;
  }, [location.pathname]);

  if (breadcrumbs.length <= 1 && location.pathname === "/") {
    return null;
  }

  return (
    <div className="px-4 py-3 bg-white/50 backdrop-blur-sm">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <div key={item.path} className="contents">
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        size={16}
                        className="text-green-600"
                      />
                    )}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.path}
                      className="flex items-center gap-2 hover:text-green-600"
                    >
                      {item.icon && (
                        <Icon
                          name={item.icon}
                          size={16}
                          className="text-green-500"
                        />
                      )}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNavigation;
