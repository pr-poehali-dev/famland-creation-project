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
  photo?: string;
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
    photo: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        birthDate: member.birthDate || "",
        description: member.description || "",
        photo: member.photo || "",
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
        photo: member.photo || "",
      });
    }
    onClose();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, photo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
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
            <Label htmlFor="photo">Фотография</Label>
            <div className="flex flex-col items-center gap-3">
              {formData.photo && (
                <div className="relative">
                  <img
                    src={formData.photo}
                    alt="Предпросмотр"
                    className="w-20 h-20 object-cover rounded-full border-2 border-green-200"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => setFormData({ ...formData, photo: "" })}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
              <div className="flex gap-2 w-full">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="border-green-200 focus:border-green-400"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-50 px-3"
                >
                  <Icon name="Upload" size={16} />
                </Button>
              </div>
            </div>
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="photo-url">URL фото (опционально)</Label>
            <Input
              id="photo-url"
              value={formData.photo || ""}
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.value })
              }
              placeholder="https://example.com/photo.jpg"
              className="border-green-200 focus:border-green-400"
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
