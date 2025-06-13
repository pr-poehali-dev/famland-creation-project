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
  deceased?: boolean;
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
      id: "7",
      name: "Дедушка Петр",
      relation: "Дедушка",
      generation: 0,
      deceased: true,
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "8",
      name: "Бабушка Анна",
      relation: "Бабушка",
      generation: 0,
      deceased: true,
      birthDate: "1925-1998",
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "9",
      name: "Дядя Владимир",
      relation: "Дядя",
      generation: 1,
      deceased: true,
      birthDate: "1960-2010",
      description: "Военный офицер",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
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

  const getGenerationText = (generation: number) => {
    const ordinals = ["1-е", "2-е", "3-е", "4-е", "5-е"];
    return `Поколение: ${ordinals[generation] || `${generation + 1}-е`}`;
  };

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
                      className={`w-56 border-green-300 hover:bg-green-50 cursor-pointer transition-colors ${
                        member.deceased
                          ? "opacity-70 bg-gray-50 border-gray-300"
                          : ""
                      }`}
                      onClick={() => handleViewMember(member)}
                    >
                      <CardContent className="p-5 text-center flex flex-col">
                        <div className="relative">
                          <Avatar className="h-44 w-44 mx-auto mb-3 rounded-lg">
                            <AvatarImage
                              src={member.photo}
                              alt={member.name}
                              className={member.deceased ? "grayscale" : ""}
                            />
                            <AvatarFallback
                              className={`h-44 w-44 text-lg ${
                                member.deceased
                                  ? "bg-gray-100 text-gray-500"
                                  : "bg-green-100 text-green-700"
                              } flex items-center justify-center rounded-lg`}
                            >
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {member.deceased && (
                            <>
                              {member.id === "7" ? (
                                <div className="absolute top-2 right-2 bg-gray-600 text-white p-1 rounded-full">
                                  <Icon
                                    name="Heart"
                                    size={12}
                                    className="fill-current"
                                  />
                                </div>
                              ) : member.id === "9" ? (
                                <div className="absolute inset-0 rounded-lg border-4 border-double border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 opacity-80">
                                  <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                                    ★ Вечная память
                                  </div>
                                </div>
                              ) : (
                                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs text-gray-700 font-medium">
                                    ✞ Покоится с миром
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-medium mb-1 text-base ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-800 font-semibold"
                                  : "text-gray-600"
                                : "text-green-800"
                            }`}
                          >
                            {member.name}
                            {member.deceased && member.id === "7" && (
                              <span className="text-xs text-gray-500 ml-2">
                                ✝
                              </span>
                            )}
                            {member.deceased && member.id === "9" && (
                              <span className="text-xs text-amber-600 ml-2">
                                ⭐
                              </span>
                            )}
                          </h4>
                          {member.deceased &&
                            member.birthDate &&
                            (member.id === "8" || member.id === "9") && (
                              <p
                                className={`text-xs mb-1 italic ${
                                  member.id === "9"
                                    ? "text-amber-700 font-medium"
                                    : "text-gray-500"
                                }`}
                              >
                                {member.birthDate}
                              </p>
                            )}
                          {member.deceased &&
                            member.description &&
                            member.id === "9" && (
                              <p className="text-xs text-amber-600 mb-1 font-medium">
                                {member.description}
                              </p>
                            )}
                          <p
                            className={`text-sm mb-1 ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-700"
                                  : "text-gray-500"
                                : "text-green-600"
                            }`}
                          >
                            Роль: {member.relation}
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-600"
                                  : "text-gray-400"
                                : "text-green-500"
                            }`}
                          >
                            {getGenerationText(member.generation)}
                          </p>
                        </div>
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
                      className={`w-56 border-green-300 hover:bg-green-50 cursor-pointer transition-colors ${
                        member.deceased
                          ? "opacity-70 bg-gray-50 border-gray-300"
                          : ""
                      }`}
                      onClick={() => handleViewMember(member)}
                    >
                      <CardContent className="p-5 text-center flex flex-col">
                        <div className="relative">
                          <Avatar className="h-44 w-44 mx-auto mb-3 rounded-lg">
                            <AvatarImage
                              src={member.photo}
                              alt={member.name}
                              className={member.deceased ? "grayscale" : ""}
                            />
                            <AvatarFallback
                              className={`h-44 w-44 text-lg ${
                                member.deceased
                                  ? "bg-gray-100 text-gray-500"
                                  : "bg-green-100 text-green-700"
                              } flex items-center justify-center rounded-lg`}
                            >
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {member.deceased && (
                            <>
                              {member.id === "7" ? (
                                <div className="absolute top-2 right-2 bg-gray-600 text-white p-1 rounded-full">
                                  <Icon
                                    name="Heart"
                                    size={12}
                                    className="fill-current"
                                  />
                                </div>
                              ) : member.id === "9" ? (
                                <div className="absolute inset-0 rounded-lg border-4 border-double border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 opacity-80">
                                  <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                                    ★ Вечная память
                                  </div>
                                </div>
                              ) : (
                                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs text-gray-700 font-medium">
                                    ✞ Покоится с миром
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-medium mb-1 text-base ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-800 font-semibold"
                                  : "text-gray-600"
                                : "text-green-800"
                            }`}
                          >
                            {member.name}
                            {member.deceased && member.id === "7" && (
                              <span className="text-xs text-gray-500 ml-2">
                                ✝
                              </span>
                            )}
                            {member.deceased && member.id === "9" && (
                              <span className="text-xs text-amber-600 ml-2">
                                ⭐
                              </span>
                            )}
                          </h4>
                          {member.deceased &&
                            member.birthDate &&
                            (member.id === "8" || member.id === "9") && (
                              <p
                                className={`text-xs mb-1 italic ${
                                  member.id === "9"
                                    ? "text-amber-700 font-medium"
                                    : "text-gray-500"
                                }`}
                              >
                                {member.birthDate}
                              </p>
                            )}
                          {member.deceased &&
                            member.description &&
                            member.id === "9" && (
                              <p className="text-xs text-amber-600 mb-1 font-medium">
                                {member.description}
                              </p>
                            )}
                          <p
                            className={`text-sm mb-1 ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-700"
                                  : "text-gray-500"
                                : "text-green-600"
                            }`}
                          >
                            Роль: {member.relation}
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-600"
                                  : "text-gray-400"
                                : "text-green-500"
                            }`}
                          >
                            {getGenerationText(member.generation)}
                          </p>
                        </div>
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
                      className={`w-56 border-green-300 hover:bg-green-50 cursor-pointer transition-colors ${
                        member.deceased
                          ? "opacity-70 bg-gray-50 border-gray-300"
                          : ""
                      }`}
                      onClick={() => handleViewMember(member)}
                    >
                      <CardContent className="p-5 text-center flex flex-col">
                        <div className="relative">
                          <Avatar className="h-44 w-44 mx-auto mb-3 rounded-lg">
                            <AvatarImage
                              src={member.photo}
                              alt={member.name}
                              className={member.deceased ? "grayscale" : ""}
                            />
                            <AvatarFallback
                              className={`h-44 w-44 text-lg ${
                                member.deceased
                                  ? "bg-gray-100 text-gray-500"
                                  : "bg-green-100 text-green-700"
                              } flex items-center justify-center rounded-lg`}
                            >
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {member.deceased && (
                            <>
                              {member.id === "7" ? (
                                <div className="absolute top-2 right-2 bg-gray-600 text-white p-1 rounded-full">
                                  <Icon
                                    name="Heart"
                                    size={12}
                                    className="fill-current"
                                  />
                                </div>
                              ) : member.id === "9" ? (
                                <div className="absolute inset-0 rounded-lg border-4 border-double border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 opacity-80">
                                  <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                                    ★ Вечная память
                                  </div>
                                </div>
                              ) : (
                                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs text-gray-700 font-medium">
                                    ✞ Покоится с миром
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-medium mb-1 text-base ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-800 font-semibold"
                                  : "text-gray-600"
                                : "text-green-800"
                            }`}
                          >
                            {member.name}
                            {member.deceased && member.id === "7" && (
                              <span className="text-xs text-gray-500 ml-2">
                                ✝
                              </span>
                            )}
                            {member.deceased && member.id === "9" && (
                              <span className="text-xs text-amber-600 ml-2">
                                ⭐
                              </span>
                            )}
                          </h4>
                          {member.deceased &&
                            member.birthDate &&
                            (member.id === "8" || member.id === "9") && (
                              <p
                                className={`text-xs mb-1 italic ${
                                  member.id === "9"
                                    ? "text-amber-700 font-medium"
                                    : "text-gray-500"
                                }`}
                              >
                                {member.birthDate}
                              </p>
                            )}
                          {member.deceased &&
                            member.description &&
                            member.id === "9" && (
                              <p className="text-xs text-amber-600 mb-1 font-medium">
                                {member.description}
                              </p>
                            )}
                          <p
                            className={`text-sm mb-1 ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-700"
                                  : "text-gray-500"
                                : "text-green-600"
                            }`}
                          >
                            Роль: {member.relation}
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              member.deceased
                                ? member.id === "9"
                                  ? "text-amber-600"
                                  : "text-gray-400"
                                : "text-green-500"
                            }`}
                          >
                            {getGenerationText(member.generation)}
                          </p>
                        </div>
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
