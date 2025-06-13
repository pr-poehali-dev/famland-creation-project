import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { FamilyMember } from "@/types/family";
import { getDeceasedStyle } from "@/utils/deceased";

interface FamilyMemberCardProps {
  member: FamilyMember;
  onClick: (member: FamilyMember) => void;
  getGenerationText: (generation: number) => string;
}

const FamilyMemberCard = memo<FamilyMemberCardProps>(
  ({ member, onClick, getGenerationText }) => {
    const deceasedStyle = member.deceased ? getDeceasedStyle(member.id) : null;

    const textColor = member.deceased
      ? deceasedStyle?.textColor
      : "text-green-800";
    const subTextColor = member.deceased
      ? deceasedStyle?.subTextColor
      : "text-green-600";

    const shouldShowBirthDate =
      member.deceased &&
      member.birthDate &&
      ["8", "9", "10", "11", "12"].includes(member.id);

    const shouldShowDescription =
      member.deceased &&
      member.description &&
      ["9", "10", "11", "12"].includes(member.id);

    return (
      <Card
        className="relative w-52 cursor-pointer hover:shadow-lg hover:bg-green-50 transition-all duration-300 flex-shrink-0"
        onClick={() => onClick(member)}
      >
        <CardContent className="p-5 flex flex-col items-center h-full">
          <Avatar className="w-44 h-44 mb-3 rounded-lg">
            <AvatarImage
              src={member.photo}
              alt={member.name}
              className="rounded-lg"
            />
            <AvatarFallback
              className={`h-44 w-44 text-lg rounded-lg ${
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

          {member.deceased && deceasedStyle?.overlay}

          <div className="flex-1">
            <h4 className={`font-medium mb-1 text-base ${textColor}`}>
              {member.fullName || member.name}
              {member.deceased && deceasedStyle?.nameSymbol && (
                <span className="text-xs ml-2">{deceasedStyle.nameSymbol}</span>
              )}
            </h4>

            {member.age && (
              <div
                className={`flex items-center justify-center gap-1 mb-2 ${subTextColor}`}
              >
                <Icon name="Calendar" size={14} />
                <span className="text-sm font-medium">{member.age} лет</span>
              </div>
            )}

            {shouldShowBirthDate && (
              <p className={`text-xs mb-1 italic ${subTextColor} font-medium`}>
                {member.birthDate}
              </p>
            )}

            {shouldShowDescription && (
              <p className={`text-xs font-medium ${subTextColor}`}>
                {member.description}
              </p>
            )}

            <p className={`text-sm mb-1 ${subTextColor}`}>
              Роль: {member.relation}
            </p>

            <p className={`text-xs font-medium ${subTextColor}`}>
              {getGenerationText(member.generation)}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  },
);

FamilyMemberCard.displayName = "FamilyMemberCard";

export default FamilyMemberCard;
