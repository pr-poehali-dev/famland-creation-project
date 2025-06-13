import FamilyMemberCard, { FamilyMember } from "./FamilyMemberCard";

interface GenerationSectionProps {
  title: string;
  members: FamilyMember[];
  onMemberClick: (member: FamilyMember) => void;
  getGenerationText: (generation: number) => string;
}

const GenerationSection = ({
  title,
  members,
  onMemberClick,
  getGenerationText,
}: GenerationSectionProps) => {
  return (
    <div className="text-center">
      <h3 className="text-sm font-medium text-green-600 mb-4">{title}</h3>
      <div className="flex justify-center gap-8">
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
};

export default GenerationSection;
