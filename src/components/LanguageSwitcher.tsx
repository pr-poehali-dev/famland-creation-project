import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-green-700 hover:text-green-800 hover:bg-green-50"
    >
      <Icon name="Globe" size={16} />
      <span className="text-sm font-medium">
        {i18n.language === "ru" ? "EN" : "RU"}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
