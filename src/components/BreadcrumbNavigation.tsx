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

const BreadcrumbNavigation = () => {
  const location = useLocation();

  // Маппинг путей к хлебным крошкам
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Главная", path: "/", icon: "Home" },
    ];

    // Определяем хлебные крошки на основе текущего пути
    switch (location.pathname) {
      case "/":
        return [{ label: "Главная", path: "/", icon: "Home" }];

      case "/tree":
        return [
          ...breadcrumbs,
          { label: "Семейное древо", path: "/tree", icon: "TreePine" },
        ];

      case "/edit-member":
        return [
          ...breadcrumbs,
          { label: "Семейное древо", path: "/tree", icon: "TreePine" },
          { label: "Редактирование", path: "/edit-member", icon: "Edit" },
        ];

      case "/profile":
        return [
          ...breadcrumbs,
          { label: "Профиль", path: "/profile", icon: "User" },
        ];

      case "/auth":
        return [
          ...breadcrumbs,
          { label: "Авторизация", path: "/auth", icon: "LogIn" },
        ];

      default:
        return breadcrumbs;
    }
  };

  const breadcrumbs = getBreadcrumbs();

  // Не показываем хлебные крошки на главной странице, если это единственный элемент
  if (breadcrumbs.length <= 1 && location.pathname === "/") {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 bg-white/50 backdrop-blur-sm">
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
