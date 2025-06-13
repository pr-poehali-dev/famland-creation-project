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
import FamilyMemberCombobox from "@/components/FamilyMemberCombobox";

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
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between text-green-800 gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <Icon name="Users" size={18} className="sm:hidden" />
            <Icon name="Users" size={20} className="hidden sm:block" />
            <span className="text-base sm:text-lg">
              Отношения с членами семьи
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRelation}
            className="border-green-300 text-green-700 hover:bg-green-50 h-10 sm:h-auto w-full sm:w-auto"
          >
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить отношение
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {relations.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-muted-foreground">
            <Icon
              name="Users"
              size={40}
              className="sm:hidden mx-auto mb-2 opacity-50"
            />
            <Icon
              name="Users"
              size={48}
              className="hidden sm:block mx-auto mb-2 opacity-50"
            />
            <p className="text-sm sm:text-base">
              Пока нет добавленных отношений
            </p>
            <p className="text-xs sm:text-sm">
              Нажмите "Добавить отношение" чтобы создать связь
            </p>
          </div>
        ) : (
          relations.map((relation, index) => (
            <div
              key={relation.id}
              className="flex flex-col sm:flex-row sm:items-end gap-3 p-3 sm:p-4 bg-green-50 rounded-lg"
            >
              <div className="flex-1 space-y-2">
                <Label className="text-xs sm:text-sm font-medium">
                  Член семьи
                </Label>
                <FamilyMemberCombobox
                  value={relation.memberId}
                  onValueChange={(value) =>
                    updateRelation(relation.id, "memberId", value)
                  }
                  members={availableMembers}
                  placeholder="Найти члена семьи..."
                />
              </div>

              <div className="flex-1 space-y-2">
                <Label className="text-xs sm:text-sm font-medium">
                  Тип отношения
                </Label>
                <Select
                  value={relation.relationType}
                  onValueChange={(value) =>
                    updateRelation(relation.id, "relationType", value)
                  }
                >
                  <SelectTrigger className="focus:outline-none focus:ring-0 border-green-200 focus:border-green-400 h-11 sm:h-10">
                    <SelectValue placeholder="Выберите отношение" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATION_TYPES.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="py-3 sm:py-2"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex sm:block">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRelation(relation.id)}
                  className="h-11 sm:h-10 w-full sm:w-auto border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Icon name="Trash2" size={16} className="mr-2 sm:mr-0" />
                  <span className="sm:hidden">Удалить</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyRelationsSection;
