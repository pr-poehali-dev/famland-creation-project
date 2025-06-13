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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Icon
            name="TreePine"
            size={64}
            className="mx-auto mb-6 text-green-600"
          />
          <h1 className="text-5xl font-bold text-green-800 mb-6 font-serif">
            Как важно сохранить семейное наследие
          </h1>
          <p className="text-xl text-green-600 leading-relaxed max-w-3xl mx-auto">
            Семейное наследие — это не просто фотографии и документы. Это живая
            связь между прошлым, настоящим и будущим, которая формирует нашу
            идентичность.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12 font-serif">
            Почему это так важно?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-green-100"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Icon
                    name={reason.icon as any}
                    size={32}
                    className="text-green-600"
                  />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  {reason.title}
                </h3>
                <p className="text-green-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12 font-serif">
            Что вы получите, сохраняя семейную историю
          </h2>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-green-50 rounded-lg"
              >
                <Icon
                  name="Check"
                  size={24}
                  className="text-green-600 mr-4 flex-shrink-0"
                />
                <p className="text-green-700 text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Icon
            name="Quote"
            size={48}
            className="mx-auto mb-6 text-green-200"
          />
          <blockquote className="text-2xl font-serif italic mb-6">
            "Семья — это связующее звено между нашим прошлым и нашим будущим"
          </blockquote>
          <p className="text-green-100 text-lg">
            Каждая история, каждая фотография, каждое воспоминание — это
            кирпичик в фундаменте вашей семейной истории.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6 font-serif">
            Начните сохранять свою историю уже сегодня
          </h2>
          <p className="text-xl text-green-600 mb-8">
            Не откладывайте на завтра то, что может исчезнуть навсегда
          </p>
          <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
            Создать семейное древо
          </button>
        </div>
      </section>
    </div>
  );
};

export default Heritage;
