import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface CropDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onCropSelect: (croppedImage: string) => void;
}

const CropDialog = ({
  isOpen,
  onClose,
  imageUrl,
  onCropSelect,
}: CropDialogProps) => {
  const [selectedCrop, setSelectedCrop] = useState<
    "portrait" | "square" | null
  >(null);

  const createCroppedImage = (cropType: "portrait" | "square") => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;

      // Определяем размеры обрезки
      let cropWidth, cropHeight, startX, startY;

      if (cropType === "square") {
        const size = Math.min(width, height);
        cropWidth = cropHeight = size;
        startX = (width - size) / 2;
        startY = (height - size) / 2;
        canvas.width = canvas.height = 200;
      } else {
        // portrait
        if (width > height) {
          cropWidth = height * 0.75;
          cropHeight = height;
          startX = (width - cropWidth) / 2;
          startY = 0;
        } else {
          cropWidth = width;
          cropHeight = width * 1.33;
          startX = 0;
          startY = (height - cropHeight) / 2;
        }
        canvas.width = 150;
        canvas.height = 200;
      }

      ctx?.drawImage(
        img,
        startX,
        startY,
        cropWidth,
        cropHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      );
      const croppedImageUrl = canvas.toDataURL("image/jpeg", 0.9);
      onCropSelect(croppedImageUrl);
      onClose();
    };

    img.src = imageUrl;
  };

  const getCropPreview = (cropType: "portrait" | "square") => {
    const img = new Image();
    img.src = imageUrl;

    const aspectRatio = cropType === "square" ? "1:1" : "3:4";
    const className =
      cropType === "square"
        ? "w-32 h-32 object-cover rounded-lg"
        : "w-24 h-32 object-cover rounded-lg";

    return { aspectRatio, className };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Crop" size={20} />
            Выберите обрезку фото
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Выберите подходящий вариант обрезки для аватарки:
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Квадратная обрезка */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedCrop === "square"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => setSelectedCrop("square")}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Квадратная обрезка"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center" }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Квадрат</p>
                  <p className="text-xs text-muted-foreground">1:1</p>
                </div>
              </div>
            </div>

            {/* Портретная обрезка */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedCrop === "portrait"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => setSelectedCrop("portrait")}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Портретная обрезка"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center" }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Портрет</p>
                  <p className="text-xs text-muted-foreground">3:4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              <Icon name="X" size={16} className="mr-2" />
              Отмена
            </Button>
            <Button
              onClick={() => selectedCrop && createCroppedImage(selectedCrop)}
              disabled={!selectedCrop}
              className="bg-green-700 hover:bg-green-800"
            >
              <Icon name="Check" size={16} className="mr-2" />
              Применить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CropDialog;
