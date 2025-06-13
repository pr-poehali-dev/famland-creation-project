import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "@/components/ui/icon";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Icon name="TreePine" size={32} className="text-green-700" />
            <span className="text-xl font-bold text-green-800 font-serif">
              Famland
            </span>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/tree"
              className="flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Icon name="GitBranch" size={18} />
              {t("nav.tree")}
            </Link>
            <Link
              to="/auth"
              className="flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Icon name="LogIn" size={18} />
              {t("nav.login")}
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Icon name="User" size={18} />
              {t("nav.profile")}
            </Link>
            <LanguageSwitcher />
          </nav>

          {/* Мобильная кнопка меню */}
          <button
            className="md:hidden p-2 text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-green-100 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/tree"
                className="flex items-center gap-2 px-4 py-3 text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name="GitBranch" size={18} />
                {t("nav.tree")}
              </Link>
              <Link
                to="/auth"
                className="flex items-center gap-2 px-4 py-3 text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name="LogIn" size={18} />
                {t("nav.login")}
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-3 text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name="User" size={18} />
                {t("nav.profile")}
              </Link>
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
