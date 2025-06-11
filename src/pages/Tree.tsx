import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const Tree = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );

  const [familyData, setFamilyData] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Дедушка Иван",
      relation: "Дедушка",
      generation: 0,
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Бабушка Мария",
      relation: "Бабушка",
      generation: 0,
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "3",
      name: "Папа Алексей",
      relation: "Отец",
      generation: 1,
      children: ["5", "6"],
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "4",
      name: "Мама Елена",
      relation: "Мать",
      generation: 1,
      children: ["5", "6"],
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b332c5d6?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "5",
      name: "Я",
      relation: "Сын/Дочь",
      generation: 2,
      photo:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "6",
      name: "Брат Михаил",
      relation: "Брат",
      generation: 2,
      photo:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
    },
  ]);

  const handleEditMember = (member: FamilyMember) => {
    navigate(`/edit-member?id=${member.id}`);
  };

  const handleAddMember = () => {
    navigate("/edit-member");
  };

  const handleSaveMember = (updatedMember: FamilyMember) => {
    setFamilyData((prev) =>
      prev.map((member) =>
        member.id === updatedMember.id ? updatedMember : member,
      ),
    );
    if (selectedMember?.id === updatedMember.id) {
      setSelectedMember(updatedMember);
    }
  };

  const getGenerationMembers = (generation: number) => {
    return familyData.filter((member) => member.generation === generation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Визуализация древа */}
          <div className="lg:col-span-3">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800"></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Поколение 0 - Дедушки и бабушки */}
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-green-600 mb-4">
                      Старшее поколение
                    </h3>
                    <div className="flex justify-center gap-8">
                      {getGenerationMembers(0).map((member) => (
                        <Button
                          key={member.id}
                          variant="outline"
                          className="h-16 w-32 border-green-300 hover:bg-green-50 flex flex-col"
                          onClick={() => setSelectedMember(member)}
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.photo} alt={member.name} />
                            <AvatarFallback className="text-xs bg-green-100 text-green-700">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs mt-1">{member.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Соединительные линии */}
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-green-300"></div>
                  </div>

                  {/* Поколение 1 - Родители */}
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-green-600 mb-4">
                      Родители
                    </h3>
                    <div className="flex justify-center gap-8">
                      {getGenerationMembers(1).map((member) => (
                        <Button
                          key={member.id}
                          variant="outline"
                          className="h-16 w-32 border-green-300 hover:bg-green-50 flex flex-col"
                          onClick={() => setSelectedMember(member)}
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.photo} alt={member.name} />
                            <AvatarFallback className="text-xs bg-green-100 text-green-700">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs mt-1">{member.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Соединительные линии */}
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-green-300"></div>
                  </div>

                  {/* Поколение 2 - Дети */}
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-green-600 mb-4">
                      Наше поколение
                    </h3>
                    <div className="flex justify-center gap-8">
                      {getGenerationMembers(2).map((member) => (
                        <Button
                          key={member.id}
                          variant="outline"
                          className="h-16 w-32 border-green-300 hover:bg-green-50 flex flex-col"
                          onClick={() => setSelectedMember(member)}
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.photo} alt={member.name} />
                            <AvatarFallback className="text-xs bg-green-100 text-green-700">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs mt-1">{member.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Информационная панель */}
          <div className="lg:col-span-1">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Информация</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedMember ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                        <AvatarImage
                          src={selectedMember.photo}
                          alt={selectedMember.name}
                        />
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {selectedMember.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-green-800">
                        {selectedMember.name}
                      </h3>
                      <p className="text-sm text-green-600">
                        {selectedMember.relation}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-green-700">
                          Поколение:
                        </span>
                        <span className="ml-2">
                          {selectedMember.generation + 1}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-green-700">
                          Роль в семье:
                        </span>
                        <span className="ml-2">{selectedMember.relation}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 mt-4"
                      onClick={() => handleEditMember(selectedMember)}
                    >
                      <Icon name="User" size={16} className="mr-2" />
                      Подробнее
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-green-600">
                    <Icon
                      name="MousePointer"
                      size={48}
                      className="mx-auto mb-2 opacity-50"
                    />
                    <p className="text-sm">
                      Нажмите на члена семьи, чтобы узнать больше
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Действия */}
            <Card className="border-green-200 mt-4">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-700 hover:bg-green-800"
                    onClick={handleAddMember}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить члена
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-300 text-green-700"
                    onClick={() =>
                      selectedMember && handleEditMember(selectedMember)
                    }
                    disabled={!selectedMember}
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-300 text-green-700"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать древо
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tree;
