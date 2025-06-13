import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { FamilyRelation, RELATION_TYPES } from "@/types/family";
import { useFamilyData } from "@/hooks/useFamilyData";

interface FamilyRelationsSectionProps {
  relations: FamilyRelation[];
  onRelationsChange: (relations: FamilyRelation[]) => void;
  currentMemberId?: string;
}

const FamilyRelationsSection = ({
  relations,
  onRelationsChange,
  currentMemberId,
}: FamilyRelationsSectionProps) => {
  const { familyData } = useFamilyData();

  const addRelation = () => {
    const newRelation: FamilyRelation = {
      id: Date.now().toString(),
      memberId: "",
      relationType: "",
    };
    onRelationsChange([...relations, newRelation]);
  };

  const removeRelation = (relationId: string) => {
    onRelationsChange(relations.filter((r) => r.id !== relationId));
  };

  const updateRelation = (
    relationId: string,
    field: keyof FamilyRelation,
    value: string,
  ) => {
    onRelationsChange(
      relations.map((r) =>
        r.id === relationId ? { ...r, [field]: value } : r,
      ),
    );
  };

  // Фильтруем членов семьи, исключая текущего редактируемого
  const availableMembers = familyData.filter(
    (member) => member.id !== currentMemberId,
  );

  return (
    <Card className="border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-green-800">
          <div className="flex items-center gap-2">
            <Icon name="Users" size={20} />
            Отношения с членами семьи
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRelation}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
            <p>Пока нет добавленных отношений</p>
            <p className="text-sm">Нажмите "Добавить" чтобы создать связь</p>
          </div>
        ) : (
          relations.map((relation, index) => (
            <div
              key={relation.id}
              className="flex items-end gap-3 p-4 bg-green-50 rounded-lg"
            >
              <div className="flex-1 space-y-2">
                <Label className="text-sm font-medium">Член семьи</Label>
                <Select
                  value={relation.memberId}
                  onValueChange={(value) =>
                    updateRelation(relation.id, "memberId", value)
                  }
                >
                  <SelectTrigger className="focus:outline-none focus:ring-0 border-green-200 focus:border-green-400">
                    <SelectValue placeholder="Выберите члена семьи" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name ||
                          `${member.firstName} ${member.lastName}`.trim() ||
                          member.relation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 space-y-2">
                <Label className="text-sm font-medium">Тип отношения</Label>
                <Select
                  value={relation.relationType}
                  onValueChange={(value) =>
                    updateRelation(relation.id, "relationType", value)
                  }
                >
                  <SelectTrigger className="focus:outline-none focus:ring-0 border-green-200 focus:border-green-400">
                    <SelectValue placeholder="Выберите отношение" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeRelation(relation.id)}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyRelationsSection;
