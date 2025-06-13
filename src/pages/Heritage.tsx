import Icon from "@/components/ui/icon";

const Heritage = () => {
  const reasons = [
    {
      icon: "Heart",
      title: "Эмоциональная связь",
      description:
        "Знание своих корней укрепляет семейные узы и создает чувство принадлежности к чему-то большему.",
    },
    {
      icon: "BookOpen",
      title: "Уроки истории",
      description:
        "Семейные истории передают жизненную мудрость, ценности и традиции от поколения к поколению.",
    },
    {
      icon: "Users",
      title: "Единство семьи",
      description:
        "Общая история объединяет родственников и помогает поддерживать крепкие семейные отношения.",
    },
    {
      icon: "Star",
      title: "Источник вдохновения",
      description:
        "Достижения предков мотивируют и показывают, что мы способны на великие дела.",
    },
  ];

  const benefits = [
    "Дети лучше понимают свою идентичность",
    "Семейные традиции не теряются со временем",
    "Важные даты и события остаются в памяти",
    "Фотографии и документы сохраняются для потомков",
    "Родственные связи становятся более понятными",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Icon
            name="TreePine"
            size={48}
            className="mx-auto mb-4 text-green-600 sm:hidden"
          />
          <Icon
            name="TreePine"
            size={64}
            className="mx-auto mb-6 text-green-600 hidden sm:block"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4 sm:mb-6 font-serif px-4">
            Как важно сохранить семейное наследие
          </h1>
          <p className="text-lg sm:text-xl text-green-600 leading-relaxed max-w-3xl mx-auto px-4">
            Семейное наследие — это не просто фотографии и документы. Это живая
            связь между прошлым, настоящим и будущим, которая формирует нашу
            идентичность.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-8 sm:mb-12 font-serif px-4">
            Почему это так важно?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-green-100"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Icon
                    name={reason.icon as any}
                    size={24}
                    className="text-green-600 sm:hidden"
                  />
                  <Icon
                    name={reason.icon as any}
                    size={32}
                    className="text-green-600 hidden sm:block"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4">
                  {reason.title}
                </h3>
                <p className="text-green-600 leading-relaxed text-sm sm:text-base">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-8 sm:mb-12 font-serif px-4">
            Что вы получите, сохраняя семейную историю
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-green-50 rounded-lg"
              >
                <Icon
                  name="Check"
                  size={20}
                  className="text-green-600 mr-3 flex-shrink-0 mt-0.5 sm:hidden"
                />
                <Icon
                  name="Check"
                  size={24}
                  className="text-green-600 mr-4 flex-shrink-0 hidden sm:block"
                />
                <p className="text-green-700 text-base sm:text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 sm:py-16 px-4 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Icon
            name="Quote"
            size={40}
            className="mx-auto mb-4 text-green-200 sm:hidden"
          />
          <Icon
            name="Quote"
            size={48}
            className="mx-auto mb-6 text-green-200 hidden sm:block"
          />
          <blockquote className="text-xl sm:text-2xl font-serif italic mb-4 sm:mb-6 px-4">
            "Семья — это связующее звено между нашим прошлым и нашим будущим"
          </blockquote>
          <p className="text-green-100 text-base sm:text-lg px-4">
            Каждая история, каждая фотография, каждое воспоминание — это
            кирпичик в фундаменте вашей семейной истории.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 sm:mb-6 font-serif px-4">
            Начните сохранять свою историю уже сегодня
          </h2>
          <p className="text-lg sm:text-xl text-green-600 mb-6 sm:mb-8 px-4">
            Не откладывайте на завтра то, что может исчезнуть навсегда
          </p>
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto max-w-sm">
            Создать семейное древо
          </button>
        </div>
      </section>
    </div>
  );
};

export default Heritage;
