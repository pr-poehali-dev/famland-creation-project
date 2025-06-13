import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import FamilyMemberCard from "@/components/FamilyMemberCard";
import GenerationSection from "@/components/GenerationSection";
import TreeConnector from "@/components/TreeConnector";
import TreeHeader from "@/components/TreeHeader";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { FamilyMember } from "@/types/family";
import { useFamilyData } from "@/hooks/useFamilyData";
import { getGenerationText, GENERATION_CONFIG } from "@/utils/generation";

const Tree = () => {
  const navigate = useNavigate();
  const { getGenerationMembers } = useFamilyData();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );

  const handleViewMember = useCallback(
    (member: FamilyMember) => {
      navigate(`/member/${member.id}`);
    },
    [navigate],
  );

  const handleAddMember = useCallback(() => {
    navigate("/edit-member");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="border-green-200">
          <TreeHeader onAddMember={handleAddMember} />
          <BreadcrumbNavigation />
          <CardContent>
            <div className="space-y-8">
              {GENERATION_CONFIG.map((config, index) => {
                const members = getGenerationMembers(config.generation);
                return (
                  <div key={config.generation}>
                    <GenerationSection
                      title={config.title}
                      members={members}
                      onMemberClick={handleViewMember}
                      getGenerationText={getGenerationText}
                    />
                    {index < GENERATION_CONFIG.length - 1 &&
                      members.length > 0 && <TreeConnector />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tree;
