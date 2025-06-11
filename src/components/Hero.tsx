import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <Logo />

        <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 font-serif">
          Семейное Древо
        </h1>

        <p className="text-xl md:text-2xl text-green-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Откройте историю своей семьи, создайте визуальное древо родственных
          связей и сохраните наследие для будущих поколений
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/auth">
            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Начать создание древа
            </button>
          </Link>

          <button className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
            Посмотреть примеры
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Icon
              name="Users"
              size={48}
              className="text-green-600 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Родственные связи
            </h3>
            <p className="text-green-600">
              Отслеживайте связи между членами семьи
            </p>
          </div>

          <div className="p-6">
            <Icon
              name="Camera"
              size={48}
              className="text-green-600 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Семейные фото
            </h3>
            <p className="text-green-600">
              Добавляйте фотографии и воспоминания
            </p>
          </div>

          <div className="p-6">
            <Icon
              name="Share2"
              size={48}
              className="text-green-600 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Делитесь историей
            </h3>
            <p className="text-green-600">
              Передавайте знания следующим поколениям
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
