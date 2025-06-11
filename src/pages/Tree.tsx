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

  const groupByGeneration = (members: FamilyMember[]) => {
    return members.reduce(
      (acc, member) => {
        if (!acc[member.generation]) {
          acc[member.generation] = [];
        }
        acc[member.generation].push(member);
        return acc;
      },
      {} as Record<number, FamilyMember[]>,
    );
  };

  const generationGroups = groupByGeneration(familyData);
  const generations = Object.keys(generationGroups).map(Number).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-emerald-800 mb-4">
            🌳 Семейное Древо
          </h1>
          <p className="text-lg text-emerald-600 max-w-2xl mx-auto">
            История нашей семьи в виде живого древа поколений
          </p>
          <Button
            onClick={handleAddMember}
            className="mt-6 bg-emerald-600 hover:bg-emerald-700"
          >
            <Icon name="UserPlus" size={16} className="mr-2" />
            Добавить члена семьи
          </Button>
        </div>

        {/* Древо поколений */}
        <div className="relative">
          {generations.map((generation, index) => (
            <div key={generation} className="mb-16 relative">
              {/* Линия поколения */}
              {index < generations.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-emerald-300 top-full z-0"></div>
              )}

              {/* Члены поколения */}
              <div className="flex justify-center items-center flex-wrap gap-8 relative z-10">
                {generationGroups[generation].map((member, memberIndex) => (
                  <div key={member.id} className="relative">
                    {/* Соединительные линии */}
                    {memberIndex > 0 && generation > 0 && (
                      <div className="absolute top-1/2 -left-4 w-8 h-px bg-emerald-300"></div>
                    )}

                    {/* Карточка члена семьи */}
                    <Card
                      className="w-48 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400"
                      onClick={() => setSelectedMember(member)}
                    >
                      <CardHeader className="text-center pb-2">
                        <Avatar className="h-16 w-16 mx-auto mb-3 ring-4 ring-emerald-200 shadow-lg">
                          <AvatarImage src={member.photo} alt={member.name} />
                          <AvatarFallback className="text-lg font-semibold bg-emerald-100 text-emerald-700">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg text-emerald-800">
                          {member.name}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="mx-auto bg-emerald-100 text-emerald-700"
                        >
                          {member.relation}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pt-0 text-center">
                        {member.birthDate && (
                          <p className="text-sm text-emerald-600 mb-2">
                            {member.birthDate}
                          </p>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditMember(member);
                          }}
                        >
                          <Icon name="Edit" size={14} className="mr-2" />
                          Изменить
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно с информацией */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full max-h-[80vh] overflow-y-auto bg-white">
              <CardHeader className="text-center relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-4"
                  onClick={() => setSelectedMember(null)}
                >
                  <Icon name="X" size={16} />
                </Button>
                <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-emerald-200">
                  <AvatarImage
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                  />
                  <AvatarFallback className="text-2xl bg-emerald-100 text-emerald-700">
                    {selectedMember.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl text-emerald-800">
                  {selectedMember.name}
                </CardTitle>
                <Badge className="mx-auto bg-emerald-100 text-emerald-700">
                  {selectedMember.relation}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMember.birthDate && (
                  <div className="flex items-center gap-3">
                    <Icon
                      name="Calendar"
                      size={16}
                      className="text-emerald-600"
                    />
                    <span>Год рождения: {selectedMember.birthDate}</span>
                  </div>
                )}
                {selectedMember.description && (
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-emerald-800">
                      О человеке:
                    </h4>
                    <p className="text-emerald-700 italic">
                      "{selectedMember.description}"
                    </p>
                  </div>
                )}
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleEditMember(selectedMember)}
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
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
