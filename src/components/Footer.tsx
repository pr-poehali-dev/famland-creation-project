import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-green-50 border-t border-green-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Логотип и описание */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Icon name="TreePine" size={28} className="text-green-700" />
              <span className="text-lg font-bold text-green-800 font-serif">
                Famland
              </span>
            </Link>
            <p className="text-green-600 text-sm">
              Сохраняйте историю своей семьи и создавайте генеалогическое древо
              для будущих поколений.
            </p>
          </div>

          {/* Навигация */}
          <div className="space-y-4">
            <h3 className="font-semibold text-green-800">Навигация</h3>
            <div className="space-y-2">
              <Link
                to="/tree"
                className="block text-green-600 hover:text-green-800 transition-colors text-sm"
              >
                Древо семьи
              </Link>
              <Link
                to="/heritage"
                className="block text-green-600 hover:text-green-800 transition-colors text-sm"
              >
                Наследие
              </Link>
              <Link
                to="/profile"
                className="block text-green-600 hover:text-green-800 transition-colors text-sm"
              >
                Профиль
              </Link>
              <Link
                to="/changelog"
                className="block text-green-600 hover:text-green-800 transition-colors text-sm"
              >
                История обновлений
              </Link>
            </div>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h3 className="font-semibold text-green-800">Поддержка</h3>
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <Icon name="Mail" size={16} />
              <span>support@famland.ru</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <Icon name="Phone" size={16} />
              <span>+7 (800) 123-45-67</span>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-green-200 mt-8 pt-4">
          <p className="text-center text-green-600 text-sm">
            © 2024 Famland. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
