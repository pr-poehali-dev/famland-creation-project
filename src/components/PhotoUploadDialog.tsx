import { useState } from "react";
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
import Icon from "@/components/ui/icon";

interface PhotoUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPhoto: (photo: {
    id: string;
    url: string;
    title?: string;
    date?: string;
  }) => void;
}

const PhotoUploadDialog = ({
  open,
  onOpenChange,
  onAddPhoto,
}: PhotoUploadDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resolution, setResolution] = useState<string>("medium");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const resolutionOptions = [
    { value: "low", label: "Низкое (400x300)", size: "400x300" },
    { value: "medium", label: "Среднее (800x600)", size: "800x600" },
    { value: "high", label: "Высокое (1200x900)", size: "1200x900" },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAddPhoto = () => {
    if (!selectedFile) return;

    // Генерируем URL на основе выбранного разрешения
    const resolutionMap = {
      low: "w=400&h=300",
      medium: "w=800&h=600",
      high: "w=1200&h=900",
    };

    // Используем Unsplash как заглушку с нужным разрешением
    const photoUrl = `https://images.unsplash.com/photo-${Date.now()}?${resolutionMap[resolution as keyof typeof resolutionMap]}&fit=crop`;

    const newPhoto = {
      id: `photo-${Date.now()}`,
      url: photoUrl,
      title: title || "Новое фото",
      date: date || new Date().toISOString().split("T")[0],
    };

    onAddPhoto(newPhoto);

    // Сброс формы
    setSelectedFile(null);
    setPreviewUrl("");
    setTitle("");
    setDate("");
    setResolution("medium");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-800">
            <Icon name="Upload" size={20} />
            Добавить фото
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Выбор файла */}
          <div className="space-y-2">
            <Label htmlFor="photo">Выберите фото</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
          </div>

          {/* Превью фото */}
          {previewUrl && (
            <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Превью"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Выбор разрешения */}
          <div className="space-y-2">
            <Label>Качество фото</Label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите разрешение" />
              </SelectTrigger>
              <SelectContent>
                {resolutionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{option.label}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {option.size}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Название фото */}
          <div className="space-y-2">
            <Label htmlFor="title">Название фото</Label>
            <Input
              id="title"
              placeholder="Введите название..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Дата */}
          <div className="space-y-2">
            <Label htmlFor="date">Дата съемки</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleAddPhoto}
              disabled={!selectedFile}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoUploadDialog;
