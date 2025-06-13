import Icon from "@/components/ui/icon";
import PersonCard from "@/components/ui/person-card";
import SectionHeader from "@/components/ui/section-header";
import ActionButton from "@/components/ui/action-button";

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
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Визуализация семейного древа"
          subtitle="Интерактивное представление семейных связей с возможностью добавления деталей"
        />

        <div className="relative overflow-x-auto md:overflow-visible">
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
          <div className="relative z-10 min-h-96 min-w-[600px] md:min-w-0">
            {/* Первое поколение */}
            <div className="flex justify-center gap-8 md:gap-16 mb-12 md:mb-16">
              <PersonCard name="Дедушка Иван" years="1920-2010" />
              <PersonCard name="Бабушка Мария" years="1925-2015" />
            </div>

            {/* Второе поколение */}
            <div className="flex justify-center gap-16 md:gap-32 mb-12 md:mb-16">
              <PersonCard name="Папа Сергей" years="род. 1950" />
              <PersonCard name="Мама Елена" years="род. 1955" />
            </div>

            {/* Третье поколение */}
            <div className="flex justify-center gap-8 md:gap-16">
              <PersonCard name="Вы" years="род. 1985" isHighlighted={true} />
              <PersonCard name="Сестра Анна" years="род. 1988" />
            </div>
          </div>

          {/* Кнопка добавления */}
          <div className="text-center mt-12">
            <ActionButton icon="Plus">Добавить члена семьи</ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyTreeVisualization;
