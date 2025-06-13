import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import PhotoGallery from "@/components/PhotoGallery";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: number;
  birthDate?: string;
  description?: string;
  children?: string[];
  photo?: string;
}

const MemberProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState<FamilyMember | null>(null);

  useEffect(() => {
    if (id) {
      // Заглушка для данных - в реальном приложении будет загрузка из API/состояния
      const mockMembers: FamilyMember[] = [
        {
          id: "1",
          name: "Дедушка Иван",
          relation: "Дедушка",
          generation: 0,
          birthDate: "1945-03-15",
          description:
            "Ветеран войны, работал инженером на заводе. Очень мудрый и добрый человек.",
          photo:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        },
        {
          id: "2",
          name: "Бабушка Мария",
          relation: "Бабушка",
          generation: 0,
          birthDate: "1948-07-22",
          description:
            "Учительница начальных классов. Прекрасная хозяйка и заботливая бабушка.",
          photo:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        },
        {
          id: "3",
          name: "Папа Алексей",
          relation: "Отец",
          generation: 1,
          birthDate: "1975-11-08",
          description:
            "Программист, любит рыбалку и чтение книг. Отличный семьянин.",
          children: ["5", "6"],
          photo:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        },
        {
          id: "4",
          name: "Мама Елена",
          relation: "Мать",
          generation: 1,
          birthDate: "1978-02-14",
          description: "Врач-педиатр, очень заботливая и понимающая мама.",
          children: ["5", "6"],
          photo:
            "https://images.unsplash.com/photo-1494790108755-2616b332c5d6?w=150&h=150&fit=crop&crop=face",
        },
        {
          id: "5",
          name: "Я",
          relation: "Сын/Дочь",
          generation: 2,
          birthDate: "2000-05-20",
          description:
            "Студент университета, увлекаюсь программированием и спортом.",
          photo:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        },
        {
          id: "6",
          name: "Брат Михаил",
          relation: "Брат",
          generation: 2,
          birthDate: "2003-09-12",
          description: "Школьник, любит музыку и играет на гитаре.",
          photo:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
        },
      ];

      const foundMember = mockMembers.find((m) => m.id === id);
      setMember(foundMember || null);
    }
  }, [id]);

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <Card className="border-green-200">
          <CardContent className="pt-6 text-center">
            <p className="text-green-600">Член семьи не найден</p>
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/tree")}
            >
              Вернуться к древу
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getGenerationName = (generation: number) => {
    switch (generation) {
      case 0:
        return "Старшее поколение";
      case 1:
        return "Родители";
      case 2:
        return "Наше поколение";
      default:
        return `Поколение ${generation + 1}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6"></div>

        {/* Верхняя секция с фото и основной информацией */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Фото профиля */}
          <div className="lg:col-span-1">
            <Card className="border-green-200">
              <CardContent className="pt-6 text-center">
                <Avatar className="h-38 w-38 mx-auto mb-4 aspect-square rounded-xl">
                  <AvatarImage
                    src={member.photo}
                    alt={member.name}
                    className="rounded-xl"
                  />
                  <AvatarFallback className="bg-green-100 text-green-700 text-3xl rounded-xl">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold text-green-800 mb-1">
                  {member.name}
                </h1>
                <p className="text-green-600 font-medium">{member.relation}</p>
              </CardContent>
            </Card>
          </div>

          {/* Основная информация */}
          <div className="lg:col-span-2">
            <Card className="border-green-200 h-full">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-1">Пол</h4>
                    <p className="text-gray-600">
                      {member.relation === "Бабушка" ||
                      member.relation === "Мать"
                        ? "Женский"
                        : "Мужской"}
                    </p>
                  </div>

                  {member.birthDate && (
                    <div>
                      <h4 className="font-medium text-green-700 mb-1">
                        Дата рождения
                      </h4>
                      <p className="text-gray-600">
                        {new Date(member.birthDate).toLocaleDateString(
                          "ru-RU",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {member.children && member.children.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-1">Дети</h4>
                    <p className="text-gray-600">
                      {member.children.length}{" "}
                      {member.children.length === 1 ? "ребенок" : "детей"}
                    </p>
                  </div>
                )}

                {member.description && (
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">
                      О человеке
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Действия */}
          <div className="lg:col-span-1">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Icon name="Settings" size={20} />
                  Действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => navigate(`/edit-member?id=${member.id}`)}
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-700"
                  onClick={() => navigate("/tree")}
                >
                  <Icon name="TreePine" size={16} className="mr-2" />К древу
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Галерея фотографий */}
        <div>
          <PhotoGallery
            allowEdit={true}
            onAddPhoto={() => {
              console.log("Добавить фото для", member.name);
            }}
            onDeletePhoto={(photoId) => {
              console.log("Удалить фото", photoId);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
