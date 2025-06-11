import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditMemberModal from "@/components/EditMemberModal";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: number;
  birthDate?: string;
  description?: string;
  children?: string[];
}

const Tree = () => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [familyData, setFamilyData] = useState<FamilyMember[]>([
    { id: "1", name: "Дедушка Иван", relation: "Дедушка", generation: 0 },
    { id: "2", name: "Бабушка Мария", relation: "Бабушка", generation: 0 },
    {
      id: "3",
      name: "Папа Алексей",
      relation: "Отец",
      generation: 1,
      children: ["5", "6"],
    },
    {
      id: "4",
      name: "Мама Елена",
      relation: "Мать",
      generation: 1,
      children: ["5", "6"],
    },
    { id: "5", name: "Я", relation: "Сын/Дочь", generation: 2 },
    { id: "6", name: "Брат Михаил", relation: "Брат", generation: 2 },
  ];

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleSaveMember = (updatedMember: FamilyMember) => {
    setFamilyData(prev => 
      prev.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    if (selectedMember?.id === updatedMember.id) {
      setSelectedMember(updatedMember);
    }
  };

  const getGenerationMembers = (generation: number) => {
    return familyData.filter((member) => member.generation === generation);
  }; 
        member.id === updatedMember.id ? updatedMember : member
      )
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
        {/* Заголовок страницы */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4 font-serif">
            Семейное Древо
          </h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Изучите связи между членами семьи и узнайте больше о своих корнях
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Визуализация древа */}
          <div className="lg:col-span-3">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Icon name="TreePine" size={24} />
                  Семейное Древо
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
                        <Button
                          key={member.id}
                          variant="outline"
                          className="h-16 w-32 border-green-300 hover:bg-green-50 flex flex-col"
                          onClick={() => setSelectedMember(member)}
                        >
                          <Icon
                            name="Users"
                            size={16}
                            className="text-green-600"
                          />
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
                          <Icon
                            name="Heart"
                            size={16}
                            className="text-green-600"
                          />
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
                          <Icon
                            name="User"
                            size={16}
                            className="text-green-600"
                          />
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
                      <Icon
                        name="User"
                        size={48}
                        className="text-green-600 mx-auto mb-2"
                      />
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
                  <Button className="w-full bg-green-700 hover:bg-green-800">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить члена
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-300 text-green-700"
                    onClick={() => selectedMember && handleEditMember(selectedMember)}
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

        <EditMemberModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          member={editingMember}
          onSave={handleSaveMember}
        />
      </div>
    </div>
  );
};

export default Tree;
