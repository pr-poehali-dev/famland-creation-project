import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export interface FamilyMember {
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

interface FamilyMemberCardProps {
  member: FamilyMember;
  onClick: (member: FamilyMember) => void;
  getGenerationText: (generation: number) => string;
}

const FamilyMemberCard = ({
  member,
  onClick,
  getGenerationText,
}: FamilyMemberCardProps) => {
  const renderDeceasedOverlay = () => {
    if (!member.deceased) return null;

    if (member.id === "7") {
      return (
        <div className="absolute top-2 right-2 bg-gray-600 text-white p-1 rounded-full">
          <Icon name="Heart" size={12} className="fill-current" />
        </div>
      );
    }

    if (member.id === "9") {
      return (
        <div className="absolute inset-0 rounded-lg border-4 border-double border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 opacity-80">
          <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
            ★ Вечная память
          </div>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
        <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs text-gray-700 font-medium">
          ✞ Покоится с миром
        </div>
      </div>
    );
  };

  const getTextColor = (baseColor: string) => {
    if (!member.deceased) return baseColor;
    return member.id === "9" ? "text-amber-800 font-semibold" : "text-gray-600";
  };

  const getSubTextColor = (baseColor: string) => {
    if (!member.deceased) return baseColor;
    return member.id === "9" ? "text-amber-700" : "text-gray-500";
  };

  return (
    <Card
      className={`w-56 border-green-300 hover:bg-green-50 cursor-pointer transition-colors ${
        member.deceased ? "opacity-70 bg-gray-50 border-gray-300" : ""
      }`}
      onClick={() => onClick(member)}
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
          {renderDeceasedOverlay()}
        </div>

        <div className="flex-1">
          <h4
            className={`font-medium mb-1 text-base ${getTextColor("text-green-800")}`}
          >
            {member.name}
            {member.deceased && member.id === "7" && (
              <span className="text-xs text-gray-500 ml-2">✝</span>
            )}
            {member.deceased && member.id === "9" && (
              <span className="text-xs text-amber-600 ml-2">⭐</span>
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

          {member.deceased && member.description && member.id === "9" && (
            <p className="text-xs text-amber-600 mb-1 font-medium">
              {member.description}
            </p>
          )}

          <p className={`text-sm mb-1 ${getSubTextColor("text-green-600")}`}>
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
  );
};

export default FamilyMemberCard;
