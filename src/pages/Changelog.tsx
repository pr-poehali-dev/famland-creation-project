import Icon from "@/components/ui/icon";

const Changelog = () => {
  const updates = [
    {
      version: "1.3.0",
      date: "13 июня 2024",
      title: "Расширение функций наследия",
      changes: [
        "Добавлена возможность загрузки семейных документов",
        "Улучшен интерфейс галереи семейных фото",
        "Добавлен поиск по документам и фотографиям",
      ],
    },
    {
      version: "1.2.0",
      date: "5 июня 2024",
      title: "Улучшения генеалогического древа",
      changes: [
        "Новый интерактивный редактор древа",
        "Возможность добавления заметок к членам семьи",
        "Экспорт древа в PDF формате",
      ],
    },
    {
      version: "1.1.0",
      date: "28 мая 2024",
      title: "Система профилей",
      changes: [
        "Персональные профили пользователей",
        "Настройки приватности для семейных данных",
        "Уведомления о изменениях в древе",
      ],
    },
    {
      version: "1.0.0",
      date: "15 мая 2024",
      title: "Запуск платформы",
      changes: [
        "Создание и редактирование генеалогического древа",
        "Базовая система авторизации",
        "Хранение семейной истории",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="History" size={32} className="text-green-700" />
            <h1 className="text-3xl font-bold text-green-800 font-serif">
              История обновлений
            </h1>
          </div>
          <p className="text-green-600 text-lg">
            Следите за развитием Famland и новыми возможностями
          </p>
        </div>

        {/* Временная линия */}
        <div className="space-y-8">
          {updates.map((update, index) => (
            <div key={update.version} className="relative">
              {/* Линия времени */}
              {index !== updates.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-16 bg-green-200" />
              )}

              {/* Карточка обновления */}
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 ml-14 relative">
                {/* Иконка версии */}
                <div className="absolute -left-20 top-6 w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-white" />
                </div>

                {/* Содержимое */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                        v{update.version}
                      </span>
                      <h3 className="text-xl font-semibold text-green-800">
                        {update.title}
                      </h3>
                    </div>
                    <span className="text-green-600 text-sm font-medium">
                      {update.date}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {update.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-2">
                        <Icon
                          name="CheckCircle"
                          size={16}
                          className="text-green-600 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-green-700">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Призыв к действию */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg border border-green-100 p-8">
            <Icon
              name="Sparkles"
              size={32}
              className="text-green-700 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-green-800 mb-3">
              Предложите новую функцию
            </h3>
            <p className="text-green-600 mb-4">
              Хотите видеть новые возможности в Famland? Напишите нам!
            </p>
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Icon name="Mail" size={16} />
              <span className="font-medium">support@famland.ru</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
