import { useState, useEffect, useRef } from "react";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import CropDialog from "@/components/CropDialog";
import FamilyRelationsSection from "@/components/FamilyRelationsSection";

interface FamilyMember {
  id: string;
  name: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  generation: number;
  birthDate?: string;
  description?: string;
  children?: string[];
  photo?: string;
  gender?: string;
}

interface FamilyRelation {
  id: string;
  memberId: string;
  relationType: string;
}

const EditMember = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberId = searchParams.get("id");
  const isEditing = Boolean(memberId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropDialog, setCropDialog] = useState<{
    isOpen: boolean;
    imageUrl: string;
  }>({
    isOpen: false,
    imageUrl: "",
  });

  const [formData, setFormData] = useState<FamilyMember>({
    id: "",
    name: "",
    lastName: "",
    firstName: "",
    middleName: "",
    generation: 0,
    birthDate: "",
    description: "",
    photo: "",
    gender: "",
  });

  const [familyRelations, setFamilyRelations] = useState<FamilyRelation[]>([]);

  useEffect(() => {
    if (isEditing && memberId) {
      // В реальном приложении здесь будет загрузка данных из состояния/API
      // Пока что используем заглушку
      const mockMember: FamilyMember = {
        id: memberId,
        name: "Загружается...",
        generation: 0,
        birthDate: "",
        description: "",
        photo: "",
      };
      setFormData(mockMember);
    }
  }, [isEditing, memberId]);

  const handleSave = () => {
    const requiredFields = [
      formData.photo,
      formData.lastName?.trim(),
      formData.firstName?.trim(),
      formData.middleName?.trim(),
      formData.birthDate?.trim(),
      formData.gender?.trim(),
    ];

    const hasAllRequiredFields = requiredFields.every((field) => field);

    if (hasAllRequiredFields) {
      // Здесь будет логика сохранения данных
      console.log("Сохранение:", formData);
      navigate("/tree");
    } else {
      alert(
        "Пожалуйста, заполните все обязательные поля отмеченные звездочкой (*)",
      );
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8">
        <Card className="border-green-200">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-green-800 text-lg sm:text-xl">
              <Icon
                name={isEditing ? "Edit" : "Plus"}
                size={20}
                className="sm:block hidden"
              />
              <Icon
                name={isEditing ? "Edit" : "Plus"}
                size={18}
                className="sm:hidden"
              />
              {isEditing ? "Редактировать члена семьи" : "Добавить члена семьи"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-1"></Label>
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <Avatar
                    className={`w-32 h-32 sm:w-44 sm:h-44 cursor-pointer border-2 transition-colors rounded-lg ${
                      !formData.photo
                        ? "border-red-300 hover:border-red-400"
                        : "border-green-200 hover:border-green-400"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formData.photo ? (
                      <AvatarImage
                        src={formData.photo}
                        alt="Фото члена семьи"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-red-50 text-red-600 rounded-lg">
                        <Icon name="Camera" size={24} className="sm:hidden" />
                        <Icon
                          name="Camera"
                          size={32}
                          className="hidden sm:block"
                        />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {formData.photo && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, photo: "" }));
                        // Сбрасываем значение input'а для возможности повторного выбора того же файла
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  className="hidden"
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
                        const imageUrl = e.target?.result as string;
                        setCropDialog({ isOpen: true, imageUrl });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground text-center px-4">
                  Нажмите на аватарку для загрузки фото
                  <br />
                  Поддерживаются форматы: JPG, PNG, WEBP
                </p>
                {!formData.photo && (
                  <p className="text-xs text-red-500 text-center invisible"></p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="flex items-center gap-1 text-sm sm:text-base"
                >
                  Фамилия
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Введите фамилию"
                  className={`focus:outline-none focus:ring-0 h-12 sm:h-10 ${
                    !formData.lastName?.trim()
                      ? "border-red-300 focus:border-red-400"
                      : "border-green-200 focus:border-green-400"
                  }`}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="flex items-center gap-1 text-sm sm:text-base"
                >
                  Имя
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Введите имя"
                  className={`focus:outline-none focus:ring-0 h-12 sm:h-10 ${
                    !formData.firstName?.trim()
                      ? "border-red-300 focus:border-red-400"
                      : "border-green-200 focus:border-green-400"
                  }`}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="middleName"
                  className="flex items-center gap-1 text-sm sm:text-base"
                >
                  Отчество
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="middleName"
                  value={formData.middleName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, middleName: e.target.value })
                  }
                  placeholder="Введите отчество"
                  className={`focus:outline-none focus:ring-0 h-12 sm:h-10 ${
                    !formData.middleName?.trim()
                      ? "border-red-300 focus:border-red-400"
                      : "border-green-200 focus:border-green-400"
                  }`}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="birthDate"
                  className="flex items-center gap-1 text-sm sm:text-base"
                >
                  Дата рождения
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  placeholder="дд.мм.гггг"
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                  className={`focus:outline-none focus:ring-0 h-12 sm:h-10 ${
                    !formData.birthDate?.trim()
                      ? "border-red-300 focus:border-red-400"
                      : "border-green-200 focus:border-green-400"
                  }`}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="flex items-center gap-1 text-sm sm:text-base"
                >
                  Пол
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gender || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                  required
                >
                  <SelectTrigger
                    className={`focus:outline-none focus:ring-0 h-12 sm:h-10 ${
                      !formData.gender?.trim()
                        ? "border-red-300 focus:border-red-400"
                        : "border-green-200 focus:border-green-400"
                    }`}
                  >
                    <SelectValue placeholder="Выберите пол" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Мужской">Мужской</SelectItem>
                    <SelectItem value="Женский">Женский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm sm:text-base">
                Описание
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Добавьте заметки о члене семьи..."
                className="focus:outline-none focus:ring-0 border-green-200 focus:border-green-400 min-h-[80px] sm:min-h-[100px]"
              />
            </div>

            <FamilyRelationsSection
              relations={familyRelations}
              onRelationsChange={setFamilyRelations}
              currentMemberId={formData.id}
            />

            {/* <div className="space-y-2">
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
            </div> */}

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-green-300 text-green-700 hover:bg-green-50 h-12 sm:h-auto order-2 sm:order-1"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад к древу
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-700 hover:bg-green-800 h-12 sm:h-auto order-1 sm:order-2"
                disabled={
                  !formData.photo ||
                  !formData.lastName?.trim() ||
                  !formData.firstName?.trim() ||
                  !formData.middleName?.trim() ||
                  !formData.birthDate?.trim() ||
                  !formData.gender?.trim()
                }
              >
                <Icon name="Check" size={16} className="mr-2" />
                {isEditing ? "Сохранить изменения" : "Добавить члена"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <CropDialog
          isOpen={cropDialog.isOpen}
          onClose={() => setCropDialog({ isOpen: false, imageUrl: "" })}
          imageUrl={cropDialog.imageUrl}
          onCropSelect={(croppedImage) => {
            setFormData((prev) => ({ ...prev, photo: croppedImage }));
            setCropDialog({ isOpen: false, imageUrl: "" });
          }}
        />
      </div>
    </div>
  );
};

export default EditMember;
