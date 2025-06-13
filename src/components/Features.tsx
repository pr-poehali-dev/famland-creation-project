import { useTranslation } from "react-i18next";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { FEATURES_DATA } from "@/constants/features";
import FeatureCard from "@/components/ui/feature-card";
import SectionHeader from "@/components/ui/section-header";
import ActionButton from "@/components/ui/action-button";

const Features = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={t("features.sectionTitle")}
          subtitle={t("features.sectionSubtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
            />
          ))}
        </div>

        <div className="mt-12 md:mt-16 bg-green-700 rounded-3xl p-6 md:p-8 text-center text-white">
          <Icon
            name="Heart"
            size={48}
            className="mx-auto mb-4 text-green-200"
          />
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            {t("features.heritage.title")}
          </h3>
          <p className="text-base md:text-lg text-green-100 mb-6 max-w-2xl mx-auto">
            {t("features.heritage.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton variant="secondary">{t("hero.cta")}</ActionButton>
            <ActionButton
              variant="outline"
              onClick={() => navigate("/heritage")}
            >
              {t("features.heritage.learnMore")}
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
