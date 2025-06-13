import { useTranslation } from "react-i18next";
import Icon from "@/components/ui/icon";
import ActionButton from "@/components/ui/action-button";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4 md:mb-6 font-serif">
          {t("hero.title")}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-green-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <ActionButton size="lg">{t("hero.cta")}</ActionButton>
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          <div className="p-4 md:p-6">
            <Icon
              name="Users"
              size={48}
              className="text-green-600 mx-auto mb-3 md:mb-4"
            />
            <h3 className="text-base md:text-lg font-semibold text-green-800 mb-2">
              {t("features.relationships.title")}
            </h3>
            <p className="text-sm md:text-base text-green-600">
              {t("features.relationships.description")}
            </p>
          </div>

          <div className="p-4 md:p-6">
            <Icon
              name="Camera"
              size={48}
              className="text-green-600 mx-auto mb-3 md:mb-4"
            />
            <h3 className="text-base md:text-lg font-semibold text-green-800 mb-2">
              {t("features.photos.title")}
            </h3>
            <p className="text-sm md:text-base text-green-600">
              {t("features.photos.description")}
            </p>
          </div>

          <div className="p-4 md:p-6">
            <Icon
              name="Share2"
              size={48}
              className="text-green-600 mx-auto mb-3 md:mb-4"
            />
            <h3 className="text-base md:text-lg font-semibold text-green-800 mb-2">
              {t("features.sharing.title")}
            </h3>
            <p className="text-sm md:text-base text-green-600">
              {t("features.sharing.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
