import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: number;
  birthDate?: string;
  description?: string;
  children?: string[];
}

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FamilyMember | null;
  onSave: (updatedMember: FamilyMember) => void;
}

const EditMemberModal = ({
  isOpen,
  onClose,
  member,
  onSave,
}: EditMemberModalProps) => {
  const [formData, setFormData] = useState<FamilyMember>({
    id: "",
    name: "",
    relation: "",
    generation: 0,
    birthDate: "",
    description: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        birthDate: member.birthDate || "",
        description: member.description || "",
      });
    }
  }, [member]);

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    if (member) {
      setFormData({
        ...member,
        birthDate: member.birthDate || "",
        description: member.description || "",
      });
    }
    onClose();
  };

  const relations = [
    "Дедушка",
    "Бабушка",
    "Отец",
    "Мать",
    "Сын",
    "Дочь",
    "Брат",
    "Сестра",
    "Дядя",
    "Тётя",
    "Племянник",
    "Племянница",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-800">
            <Icon name="Edit" size={20} />
            Редактировать члена семьи
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Введите имя"
              className="border-green-200 focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relation">Отношение</Label>
            <Select
              value={formData.relation}
              onValueChange={(value) =>
                setFormData({ ...formData, relation: value })
              }
            >
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="Выберите отношение" />
              </SelectTrigger>
              <SelectContent>
                {relations.map((relation) => (
                  <SelectItem key={relation} value={relation}>
                    {relation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Дата рождения</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              className="border-green-200 focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Добавьте заметки о члене семьи..."
              className="border-green-200 focus:border-green-400 min-h-[80px]"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Icon name="X" size={16} className="mr-2" />
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-700 hover:bg-green-800"
            disabled={!formData.name.trim()}
          >
            <Icon name="Check" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberModal;
