import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: number;
  age?: number;
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

    if (member.id === "10") {
      return (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-100 via-lavender-50 to-violet-100 border-2 border-purple-300 opacity-90">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
              <Icon name="Flower" size={12} />В наших сердцах
            </div>
          </div>
          <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">♡</span>
          </div>
        </div>
      );
    }

    if (member.id === "11") {
      return (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 border border-yellow-600 opacity-95">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 rounded-lg"></div>
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 px-2 py-1 rounded-md text-xs font-bold shadow-lg border border-yellow-500">
            ◆ Светлая память
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-800/80 text-yellow-400 px-2 py-1 rounded-full text-xs border border-yellow-600/30">
            <Icon name="Crown" size={10} />
            <span>Наследие</span>
          </div>
          <div className="absolute top-1/2 right-2 w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border border-yellow-400">
            <span className="text-slate-900 text-sm font-bold">✦</span>
          </div>
        </div>
      );
    }

    if (member.id === "12") {
      return (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-amber-500 opacity-95">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-amber-400/10 to-gold-400/15 rounded-lg"></div>
          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-gray-900 px-3 py-1 rounded-lg text-xs font-extrabold shadow-xl border border-amber-400">
            ♔ Вечная слава
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-gray-900/90 text-amber-400 px-2 py-1 rounded-md text-xs border border-amber-500/40">
            <Icon name="Star" size={10} />
            <span className="font-semibold">Легенда</span>
          </div>
          <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-300">
            <span className="text-gray-900 text-lg font-extrabold">♛</span>
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center border border-amber-300">
            <span className="text-gray-900 text-xs font-bold">◆</span>
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
    if (member.id === "9") return "text-amber-800 font-semibold";
    if (member.id === "10") return "text-purple-800 font-semibold";
    if (member.id === "11") return "text-yellow-600 font-bold";
    if (member.id === "12") return "text-amber-400 font-extrabold";
    return "text-gray-600";
  };

  const getSubTextColor = (baseColor: string) => {
    if (!member.deceased) return baseColor;
    if (member.id === "9") return "text-amber-700";
    if (member.id === "10") return "text-purple-700";
    if (member.id === "11") return "text-yellow-700";
    if (member.id === "12") return "text-amber-500";
    return "text-gray-500";
  };

  return (
    <Card
      className="relative w-52 cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0"
      onClick={() => onClick(member)}
    >
      <CardContent className="p-5 flex flex-col items-center h-full">
        <Avatar className="w-44 h-44 mb-3 rounded-none">
          <AvatarImage
            src={member.photo}
            alt={member.name}
            className="rounded-none"
          />
          <AvatarFallback
            className={`h-44 w-44 text-lg rounded-none ${
              member.deceased
                ? "bg-gray-100 text-gray-500"
                : "bg-green-100 text-green-700"
            } flex items-center justify-center`}
          >
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        {renderDeceasedOverlay()}

        <div className="flex-1">
          <h4
            className={`font-medium mb-1 text-base ${getTextColor("text-green-800")}`}
          >
            {member.fullName || member.name}
            {member.deceased && member.id === "7" && (
              <span className="text-xs text-gray-500 ml-2">✝</span>
            )}
            {member.deceased && member.id === "9" && (
              <span className="text-xs text-amber-600 ml-2">⭐</span>
            )}
            {member.deceased && member.id === "10" && (
              <span className="text-xs text-purple-600 ml-2">🌸</span>
            )}
            {member.deceased && member.id === "11" && (
              <span className="text-xs text-yellow-600 ml-2">✦</span>
            )}
            {member.deceased && member.id === "12" && (
              <span className="text-xs text-amber-400 ml-2">♛</span>
            )}
          </h4>

          {member.age && (
            <div
              className={`flex items-center justify-center gap-1 mb-2 ${getSubTextColor("text-green-600")}`}
            >
              <Icon name="Calendar" size={14} />
              <span className="text-sm font-medium">{member.age} лет</span>
            </div>
          )}

          {member.deceased &&
            member.birthDate &&
            (member.id === "8" ||
              member.id === "9" ||
              member.id === "10" ||
              member.id === "11" ||
              member.id === "12") && (
              <p
                className={`text-xs mb-1 italic ${
                  member.id === "9"
                    ? "text-amber-700 font-medium"
                    : member.id === "10"
                      ? "text-purple-700 font-medium"
                      : member.id === "11"
                        ? "text-yellow-700 font-medium"
                        : member.id === "12"
                          ? "text-amber-500 font-bold"
                          : "text-gray-500"
                }`}
              >
                {member.birthDate}
              </p>
            )}

          {member.deceased &&
            member.description &&
            (member.id === "9" ||
              member.id === "10" ||
              member.id === "11" ||
              member.id === "12") && (
              <p
                className={`text-xs font-medium ${
                  member.deceased
                    ? member.id === "9"
                      ? "text-amber-600"
                      : member.id === "10"
                        ? "text-purple-600"
                        : member.id === "11"
                          ? "text-yellow-600"
                          : member.id === "12"
                            ? "text-yellow-500"
                            : "text-gray-400"
                    : "text-green-500"
                }`}
              >
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
                  : member.id === "10"
                    ? "text-purple-600"
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
