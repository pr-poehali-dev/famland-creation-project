import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: "GitBranch",
      title: "Генеалогическое древо",
      description:
        "Создавайте подробные схемы родственных связей с неограниченным количеством поколений",
    },
    {
      icon: "BookOpen",
      title: "Семейная история",
      description:
        "Записывайте истории, важные события и достижения каждого члена семьи",
    },
    {
      icon: "Image",
      title: "Фотоархив",
      description:
        "Загружайте и организуйте семейные фотографии, привязывая их к конкретным людям и событиям",
    },
    {
      icon: "MapPin",
      title: "География рода",
      description:
        "Отмечайте места рождения, жизни и важных событий на интерактивной карте",
    },
    {
      icon: "Calendar",
      title: "Хронология событий",
      description:
        "Ведите календарь семейных дат, юбилеев и важных исторических моментов",
    },
    {
      icon: "Users",
      title: "Совместная работа",
      description:
        "Приглашайте родственников для совместного наполнения и редактирования древа",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4 font-serif">
            Возможности платформы
          </h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Полный набор инструментов для создания, ведения и сохранения истории
            вашей семьи
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Icon
                  name={feature.icon as any}
                  size={32}
                  className="text-green-600"
                />
              </div>

              <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
                {feature.title}
              </h3>

              <p className="text-green-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
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
            <button className="bg-white text-green-700 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Начать создание древа
            </button>
            <button
              onClick={() => navigate("/heritage")}
              className="border-2 border-green-200 text-green-100 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Узнать больше
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
