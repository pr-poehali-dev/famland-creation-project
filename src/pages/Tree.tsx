import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import FamilyMemberCard, { FamilyMember } from "@/components/FamilyMemberCard";
import GenerationSection from "@/components/GenerationSection";
import TreeConnector from "@/components/TreeConnector";
import TreeHeader from "@/components/TreeHeader";

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
      age: 78,
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Бабушка Мария",
      relation: "Бабушка",
      generation: 0,
      age: 75,
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
      age: 52,
      children: ["5", "6"],
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "4",
      name: "Мама Елена",
      relation: "Мать",
      generation: 1,
      age: 48,
      children: ["5", "6"],
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b332c5d6?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "5",
      name: "Я",
      relation: "Сын/Дочь",
      generation: 2,
      age: 25,
      photo:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "6",
      name: "Брат Михаил",
      relation: "Брат",
      generation: 2,
      age: 22,
      photo:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "9",
      name: "Прадедушка Николай",
      relation: "Прадедушка",
      generation: -1,
      deceased: true,
      birthDate: "1890-1965",
      description: "Ветеран войны",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "10",
      name: "Прабабушка Елена",
      relation: "Прабабушка",
      generation: -1,
      deceased: true,
      birthDate: "1895-1970",
      description: "Учительница",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "11",
      name: "Дедушка Сергей",
      relation: "Дедушка",
      generation: 0,
      deceased: true,
      birthDate: "1930-2005",
      description: "Заслуженный инженер",
      photo:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "12",
      name: "Прапрадедушка Иван",
      relation: "Прапрадедушка",
      generation: -2,
      deceased: true,
      birthDate: "1850-1920",
      description: "Основатель рода",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ]);

  const getGenerationText = (generation: number) => {
    const ordinals = ["1-е", "2-е", "3-е", "4-е", "5-е"];
    if (generation < 0) {
      return `Прошлое поколение: ${Math.abs(generation)}`;
    }
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
        <Card className="border-green-200">
          <TreeHeader onAddMember={handleAddMember} />
          <CardContent>
            <div className="space-y-8">
              <GenerationSection
                title="Предки"
                members={getGenerationMembers(-1)}
                onMemberClick={handleViewMember}
                getGenerationText={getGenerationText}
              />

              <TreeConnector />

              <GenerationSection
                title="Далекие предки"
                members={getGenerationMembers(-2)}
                onMemberClick={handleViewMember}
                getGenerationText={getGenerationText}
              />

              <TreeConnector />

              <GenerationSection
                title="Старшее поколение"
                members={getGenerationMembers(0)}
                onMemberClick={handleViewMember}
                getGenerationText={getGenerationText}
              />

              <TreeConnector />

              <GenerationSection
                title="Родители"
                members={getGenerationMembers(1)}
                onMemberClick={handleViewMember}
                getGenerationText={getGenerationText}
              />

              <TreeConnector />

              <GenerationSection
                title="Наше поколение"
                members={getGenerationMembers(2)}
                onMemberClick={handleViewMember}
                getGenerationText={getGenerationText}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tree;
