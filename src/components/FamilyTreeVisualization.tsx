import Icon from "@/components/ui/icon";

const FamilyTreeVisualization = () => {
  const familyMembers = [
    {
      id: 1,
      name: "Дедушка Иван",
      generation: 1,
      position: "center",
      years: "1920-2010",
    },
    {
      id: 2,
      name: "Бабушка Мария",
      generation: 1,
      position: "center-right",
      years: "1925-2015",
    },
    {
      id: 3,
      name: "Папа Сергей",
      generation: 2,
      position: "left",
      years: "1950",
    },
    {
      id: 4,
      name: "Мама Елена",
      generation: 2,
      position: "right",
      years: "1955",
    },
    { id: 5, name: "Вы", generation: 3, position: "center", years: "1985" },
    {
      id: 6,
      name: "Сестра Анна",
      generation: 3,
      position: "right",
      years: "1988",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4 font-serif">
            Визуализация семейного древа
          </h2>
          <p className="text-xl text-green-600 max-w-2xl mx-auto">
            Интерактивное представление семейных связей с возможностью
            добавления деталей
          </p>
        </div>

        <div className="relative">
          {/* Дерево фон */}
          <div className="absolute inset-0 flex justify-center items-end opacity-10">
            <Icon name="TreePine" size={400} className="text-green-700" />
          </div>

          {/* Семейные связи - линии */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {/* Горизонтальные линии поколений */}
            <line
              x1="30%"
              y1="25%"
              x2="70%"
              y2="25%"
              stroke="#16a34a"
              strokeWidth="2"
            />
            <line
              x1="20%"
              y1="50%"
              x2="80%"
              y2="50%"
              stroke="#16a34a"
              strokeWidth="2"
            />
            <line
              x1="30%"
              y1="75%"
              x2="70%"
              y2="75%"
              stroke="#16a34a"
              strokeWidth="2"
            />

            {/* Вертикальные связи */}
            <line
              x1="50%"
              y1="25%"
              x2="50%"
              y2="50%"
              stroke="#16a34a"
              strokeWidth="2"
            />
            <line
              x1="50%"
              y1="50%"
              x2="50%"
              y2="75%"
              stroke="#16a34a"
              strokeWidth="2"
            />
          </svg>

          {/* Карточки членов семьи */}
          <div className="relative z-10 min-h-96">
            {/* Первое поколение */}
            <div className="flex justify-center gap-16 mb-16">
              <div className="bg-green-100 hover:bg-green-200 p-4 rounded-xl border-2 border-green-300 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="User" size={24} className="text-green-700" />
                </div>
                <h4 className="font-semibold text-green-800 text-center">
                  Дедушка Иван
                </h4>
                <p className="text-sm text-green-600 text-center">1920-2010</p>
              </div>

              <div className="bg-green-100 hover:bg-green-200 p-4 rounded-xl border-2 border-green-300 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="User" size={24} className="text-green-700" />
                </div>
                <h4 className="font-semibold text-green-800 text-center">
                  Бабушка Мария
                </h4>
                <p className="text-sm text-green-600 text-center">1925-2015</p>
              </div>
            </div>

            {/* Второе поколение */}
            <div className="flex justify-center gap-32 mb-16">
              <div className="bg-green-100 hover:bg-green-200 p-4 rounded-xl border-2 border-green-300 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="User" size={24} className="text-green-700" />
                </div>
                <h4 className="font-semibold text-green-800 text-center">
                  Папа Сергей
                </h4>
                <p className="text-sm text-green-600 text-center">род. 1950</p>
              </div>

              <div className="bg-green-100 hover:bg-green-200 p-4 rounded-xl border-2 border-green-300 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="User" size={24} className="text-green-700" />
                </div>
                <h4 className="font-semibold text-green-800 text-center">
                  Мама Елена
                </h4>
                <p className="text-sm text-green-600 text-center">род. 1955</p>
              </div>
            </div>

            {/* Третье поколение */}
            <div className="flex justify-center gap-16">
              <div className="bg-green-200 hover:bg-green-300 p-4 rounded-xl border-2 border-green-400 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="User" size={24} className="text-green-800" />
                </div>
                <h4 className="font-semibold text-green-800 text-center">Вы</h4>
                <p className="text-sm text-green-600 text-center">род. 1985</p>
              </div>

              <div className="bg-green-100 hover:bg-green-200 p-4 rounded-xl border-2 border-green-300 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="User" size={24} className="text-green-700" />
                </div>
                <h4 className="font-semibold text-green-800 text-center">
                  Сестра Анна
                </h4>
                <p className="text-sm text-green-600 text-center">род. 1988</p>
              </div>
            </div>
          </div>

          {/* Кнопка добавления */}
          <div className="text-center mt-12">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <Icon name="Plus" size={20} className="inline mr-2" />
              Добавить члена семьи
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyTreeVisualization;
