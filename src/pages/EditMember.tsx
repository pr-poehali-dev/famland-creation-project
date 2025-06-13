import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface FamilyMember {
  id: string;
  name: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  relation: string;
  generation: number;
  birthDate?: string;
  description?: string;
  children?: string[];
  photo?: string;
}

const EditMember = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberId = searchParams.get("id");
  const isEditing = Boolean(memberId);

  const [formData, setFormData] = useState<FamilyMember>({
    id: "",
    name: "",
    lastName: "",
    firstName: "",
    middleName: "",
    relation: "",
    generation: 0,
    birthDate: "",
    description: "",
    photo: "",
  });

  useEffect(() => {
    if (isEditing && memberId) {
      // В реальном приложении здесь будет загрузка данных из состояния/API
      // Пока что используем заглушку
      const mockMember: FamilyMember = {
        id: memberId,
        name: "Загружается...",
        relation: "",
        generation: 0,
        birthDate: "",
        description: "",
        photo: "",
      };
      setFormData(mockMember);
    }
  }, [isEditing, memberId]);

  const handleSave = () => {
    if (formData.firstName?.trim() || formData.name.trim()) {
      // Здесь будет логика сохранения данных
      console.log("Сохранение:", formData);
      navigate("/tree");
    }
  };

  const handleCancel = () => {
    navigate("/tree");
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Icon name={isEditing ? "Edit" : "Plus"} size={24} />
              {isEditing ? "Редактировать члена семьи" : "Добавить члена семьи"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photo">Фотография</Label>
              <div className="flex flex-col items-center gap-3">
                {formData.photo && (
                  <div className="relative">
                    <img
                      src={formData.photo}
                      alt="Предпросмотр"
                      className="w-24 h-24 object-cover rounded-full border-2 border-green-200"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, photo: "" }))
                      }
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
                <Input
                  id="photo"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const validTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                      ];
                      if (!validTypes.includes(file.type)) {
                        alert("Поддерживаются только форматы JPG, PNG, WEBP");
                        e.target.value = "";
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setFormData((prev) => ({
                          ...prev,
                          photo: e.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <p className="text-xs text-muted-foreground">
                  Поддерживаются форматы: JPG, PNG, WEBP
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Введите фамилию"
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Введите имя"
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">Отчество</Label>
                <Input
                  id="middleName"
                  value={formData.middleName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, middleName: e.target.value })
                  }
                  placeholder="Введите отчество"
                  className="border-green-200 focus:border-green-400"
                />
              </div>
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
                className="border-green-200 focus:border-green-400 min-h-[100px]"
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

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад к древу
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-700 hover:bg-green-800"
                disabled={!formData.firstName?.trim() && !formData.name.trim()}
              >
                <Icon name="Check" size={16} className="mr-2" />
                {isEditing ? "Сохранить изменения" : "Добавить члена"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditMember;
