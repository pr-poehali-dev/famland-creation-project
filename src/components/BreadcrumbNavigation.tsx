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

    // Если на главной странице, возвращаем только её
    if (pathSegments.length === 0) {
      return breadcrumbs;
    }

    // Обрабатываем каждый сегмент пути
    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Определяем label и icon для каждого сегмента
      let label = segment;
      let icon = "";

      switch (segment) {
        case "tree":
          label = "Семейное древо";
          icon = "TreePine";
          break;
        case "edit-member":
          label = "Редактирование";
          icon = "Edit";
          break;
        case "profile":
          label = "Профиль";
          icon = "User";
          break;
        case "auth":
          label = "Авторизация";
          icon = "LogIn";
          break;
        case "member":
          label = "Участник";
          icon = "Users";
          break;
        default:
          // Для динамических параметров (например, ID)
          if (/^\d+$/.test(segment)) {
            label = `#${segment}`;
            icon = "Hash";
          }
          break;
      }

      breadcrumbs.push({ label, path: currentPath, icon });
    });

    return breadcrumbs;
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
