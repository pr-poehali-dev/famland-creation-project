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

  const handleViewMember = (member: FamilyMember) => {
    navigate(`/member/${member.id}`);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Визуализация древа */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-green-800">
              <span className="flex items-center gap-2">
                <Icon name="TreePine" size={24} />
                Семейное древо
              </span>
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                title="Добавить члена семьи"
              >
                <Icon name="UserPlus" size={16} />
                <span className="hidden sm:inline">Добавить члена</span>
              </button>
            </CardTitle>
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
                    <Card
                      key={member.id}
                      className="w-48 border-green-300 hover:bg-green-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedMember(member)}
                    >
                      <CardContent className="p-4 text-center">
                        <Avatar className="h-38 w-38 mx-auto mb-3 rounded-lg">
                          <AvatarImage src={member.photo} alt={member.name} />
                          <AvatarFallback className="h-38 text-xl bg-green-100 text-green-700 flex items-center justify-center">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-medium text-green-800 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs text-green-600 mb-1">
                          Роль: {member.relation}
                        </p>
                        <p className="text-xs text-green-600 mb-3">
                          Поколение: {member.generation + 1}
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMember(member);
                          }}
                        >
                          <Icon name="User" size={14} className="mr-1" />
                          Подробнее
                        </Button>
                      </CardContent>
                    </Card>
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
                    <Card
                      key={member.id}
                      className="w-48 border-green-300 hover:bg-green-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedMember(member)}
                    >
                      <CardContent className="p-4 text-center">
                        <Avatar className="h-38 w-38 mx-auto mb-3 rounded-lg">
                          <AvatarImage src={member.photo} alt={member.name} />
                          <AvatarFallback className="h-38 text-xl bg-green-100 text-green-700 flex items-center justify-center">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-medium text-green-800 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs text-green-600 mb-1">
                          Роль: {member.relation}
                        </p>
                        <p className="text-xs text-green-600 mb-3">
                          Поколение: {member.generation + 1}
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMember(member);
                          }}
                        >
                          <Icon name="User" size={14} className="mr-1" />
                          Подробнее
                        </Button>
                      </CardContent>
                    </Card>
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
                    <Card
                      key={member.id}
                      className="w-48 border-green-300 hover:bg-green-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedMember(member)}
                    >
                      <CardContent className="p-4 text-center">
                        <Avatar className="h-38 w-38 mx-auto mb-3 rounded-lg">
                          <AvatarImage src={member.photo} alt={member.name} />
                          <AvatarFallback className="h-38 text-xl bg-green-100 text-green-700 flex items-center justify-center">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-medium text-green-800 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs text-green-600 mb-1">
                          Роль: {member.relation}
                        </p>
                        <p className="text-xs text-green-600 mb-3">
                          Поколение: {member.generation + 1}
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMember(member);
                          }}
                        >
                          <Icon name="User" size={14} className="mr-1" />
                          Подробнее
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tree;
