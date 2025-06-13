import Icon from "@/components/ui/icon";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-green-800 to-green-600">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="mb-8">
          <Icon
            name="Sparkles"
            size={64}
            className="mx-auto mb-4 text-green-200"
          />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
          Начните создавать своё семейное древо уже сегодня
        </h2>

        <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          За несколько минут вы сможете создать основу своего генеалогического
          древа и начать собирать семейную историю
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="bg-white text-green-700 hover:bg-green-50 px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg">
            <Icon name="TreePine" size={24} className="inline mr-3" />
            Начать создание древа
          </button>

          <button className="border-2 border-green-200 text-green-100 hover:bg-green-700 px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300">
            <Icon name="Play" size={24} className="inline mr-3" />
            Посмотреть демо
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-green-200 mb-2">100%</div>
            <p className="text-green-100">Бесплатно для начала</p>
          </div>

          <div className="p-6">
            <div className="text-3xl font-bold text-green-200 mb-2">5 мин</div>
            <p className="text-green-100">Для создания первого древа</p>
          </div>

          <div className="p-6">
            <div className="text-3xl font-bold text-green-200 mb-2">∞</div>
            <p className="text-green-100">Неограниченно поколений</p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-green-700 bg-opacity-50 rounded-2xl">
          <p className="text-lg text-green-100 mb-4">
            <Icon name="Shield" size={20} className="inline mr-2" />
            Ваши данные защищены и конфиденциальны
          </p>
          <p className="text-sm text-green-200">
            Мы используем современные методы шифрования для защиты информации о
            вашей семье
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
