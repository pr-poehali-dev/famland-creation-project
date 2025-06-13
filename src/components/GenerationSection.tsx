import { memo } from "react";
import FamilyMemberCard from "./FamilyMemberCard";
import { FamilyMember } from "@/types/family";

interface GenerationSectionProps {
  title: string;
  members: FamilyMember[];
  onMemberClick: (member: FamilyMember) => void;
  getGenerationText: (generation: number) => string;
}

const GenerationSection = memo<GenerationSectionProps>(
  ({ title, members, onMemberClick, getGenerationText }) => {
    if (members.length === 0) {
      return null;
    }

    return (
      <div className="text-center">
        <h3 className="text-sm font-medium text-green-600 mb-4">{title}</h3>
        <div className="flex flex-wrap justify-center gap-4 max-w-full">
          {members.map((member) => (
            <FamilyMemberCard
              key={member.id}
              member={member}
              onClick={onMemberClick}
              getGenerationText={getGenerationText}
            />
          ))}
        </div>
      </div>
    );
  },
);

GenerationSection.displayName = "GenerationSection";

export default GenerationSection;
