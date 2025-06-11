import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
  const [viewMode, setViewMode] = useState<"cards" | "timeline">("cards");

  const [familyData, setFamilyData] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Дедушка Иван",
      relation: "Дедушка",
      generation: 0,
      birthDate: "1940",
      description: "Ветеран войны, любит рыбалку",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Бабушка Мария",
      relation: "Бабушка",
      generation: 0,
      birthDate: "1942",
      description: "Учительница, отличная кулинарка",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "3",
      name: "Папа Алексей",
      relation: "Отец",
      generation: 1,
      birthDate: "1970",
      children: ["5", "6"],
      description: "Инженер, увлекается фотографией",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "4",
      name: "Мама Елена",
      relation: "Мать",
      generation: 1,
      birthDate: "1972",
      children: ["5", "6"],
      description: "Врач, любит садоводство",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b332c5d6?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "5",
      name: "Я",
      relation: "Сын/Дочь",
      generation: 2,
      birthDate: "1995",
      description: "Программист, путешественник",
      photo:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "6",
      name: "Брат Михаил",
      relation: "Брат",
      generation: 2,
      birthDate: "1998",
      description: "Студент, музыкант",
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

  const getGenerationColor = (generation: number) => {
    const colors = [
      "bg-purple-100 text-purple-700 border-purple-200",
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-green-100 text-green-700 border-green-200",
    ];
    return colors[generation] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getGenerationLabel = (generation: number) => {
    const labels = ["Старшее поколение", "Родители", "Наше поколение"];
    return labels[generation] || `Поколение ${generation + 1}`;
  };

  const sortedFamilyData = [...familyData].sort(
    (a, b) => a.generation - b.generation,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Семейное Древо
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Откройте историю своей семьи и узнайте больше о родственных связях
          </p>
        </div>

        {/* Панель управления */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              onClick={() => setViewMode("cards")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Карточки
            </Button>
            <Button
              variant={viewMode === "timeline" ? "default" : "outline"}
              onClick={() => setViewMode("timeline")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Icon name="Timeline" size={16} className="mr-2" />
              Временная линия
            </Button>
          </div>

          <Button
            onClick={handleAddMember}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Icon name="UserPlus" size={16} className="mr-2" />
            Добавить члена семьи
          </Button>
        </div>

        {viewMode === "cards" ? (
          /* Режим карточек */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedFamilyData.map((member) => (
              <Card
                key={member.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getGenerationColor(member.generation)} border-2`}
                onClick={() => setSelectedMember(member)}
              >
                <CardHeader className="text-center pb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-white shadow-lg">
                    <AvatarImage src={member.photo} alt={member.name} />
                    <AvatarFallback className="text-lg font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">
                    {member.relation}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {member.birthDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={14} />
                      <span>Родился: {member.birthDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Users" size={14} />
                    <span>{getGenerationLabel(member.generation)}</span>
                  </div>
                  {member.description && (
                    <p className="text-sm text-slate-600 italic">
                      "{member.description}"
                    </p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditMember(member);
                    }}
                  >
                    <Icon name="Edit" size={14} className="mr-2" />
                    Редактировать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Режим временной линии */
          <div className="space-y-12">
            {[0, 1, 2].map((generation) => {
              const generationMembers = familyData.filter(
                (m) => m.generation === generation,
              );
              if (generationMembers.length === 0) return null;

              return (
                <div key={generation} className="relative">
                  <div className="flex items-center mb-6">
                    <div
                      className={`h-4 w-4 rounded-full ${getGenerationColor(generation).split(" ")[0]} mr-4`}
                    ></div>
                    <h2 className="text-2xl font-bold text-slate-700">
                      {getGenerationLabel(generation)}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-8">
                    {generationMembers.map((member) => (
                      <Card
                        key={member.id}
                        className="cursor-pointer hover:shadow-lg transition-all duration-200"
                        onClick={() => setSelectedMember(member)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage
                                src={member.photo}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">
                                {member.name}
                              </h3>
                              <p className="text-slate-600 text-sm">
                                {member.relation}
                              </p>
                              {member.birthDate && (
                                <p className="text-slate-500 text-xs">
                                  Род. {member.birthDate}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Информационная панель */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full max-h-[80vh] overflow-y-auto">
              <CardHeader className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-4"
                  onClick={() => setSelectedMember(null)}
                >
                  <Icon name="X" size={16} />
                </Button>
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {selectedMember.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">
                  {selectedMember.name}
                </CardTitle>
                <Badge
                  className={getGenerationColor(selectedMember.generation)}
                >
                  {selectedMember.relation}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMember.birthDate && (
                  <div className="flex items-center gap-3">
                    <Icon
                      name="Calendar"
                      size={16}
                      className="text-slate-500"
                    />
                    <span>Год рождения: {selectedMember.birthDate}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Icon name="Users" size={16} className="text-slate-500" />
                  <span>{getGenerationLabel(selectedMember.generation)}</span>
                </div>
                {selectedMember.description && (
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">О человеке:</h4>
                    <p className="text-slate-600 italic">
                      "{selectedMember.description}"
                    </p>
                  </div>
                )}
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => handleEditMember(selectedMember)}
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMember(null)}
                  >
                    Закрыть
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tree;
