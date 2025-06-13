import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { FEATURES_DATA } from "@/constants/features";
import FeatureCard from "@/components/ui/feature-card";
import SectionHeader from "@/components/ui/section-header";
import ActionButton from "@/components/ui/action-button";

const Features = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Возможности платформы"
          subtitle="Полный набор инструментов для создания, ведения и сохранения истории вашей семьи"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 bg-green-700 rounded-3xl p-8 text-center text-white">
          <Icon
            name="Heart"
            size={48}
            className="mx-auto mb-4 text-green-200"
          />
          <h3 className="text-2xl font-bold mb-4">
            Сохраните семейное наследие
          </h3>
          <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
            Каждая семья имеет уникальную историю. Наша платформа поможет вам
            собрать, организовать и передать эту бесценную информацию будущим
            поколениям.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton variant="secondary">
              Начать создание древа
            </ActionButton>
            <ActionButton
              variant="outline"
              onClick={() => navigate("/heritage")}
            >
              Узнать больше
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
