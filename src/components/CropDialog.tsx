import { useState, useRef, useCallback, useEffect } from "react";
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

interface CropArea {
  x: number;
  y: number;
  size: number;
}

const CropDialog = ({
  isOpen,
  onClose,
  imageUrl,
  onCropSelect,
}: CropDialogProps) => {
  const [cropArea, setCropArea] = useState<CropArea>({
    x: 50,
    y: 50,
    size: 150,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Инициализация области кропа при загрузке изображения
  useEffect(() => {
    if (isOpen && imageRef.current) {
      const img = imageRef.current;
      const containerRect = img.getBoundingClientRect();
      const size = Math.min(containerRect.width, containerRect.height) * 0.4;
      setCropArea({
        x: (containerRect.width - size) / 2,
        y: (containerRect.height - size) / 2,
        size: size,
      });
    }
  }, [isOpen, imageUrl]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setDragStart({
          x: e.clientX - rect.left - cropArea.x,
          y: e.clientY - rect.top - cropArea.y,
        });
      }
    },
    [cropArea],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragStart.x;
      const newY = e.clientY - rect.top - dragStart.y;

      // Ограничиваем область кропа границами изображения
      const maxX = rect.width - cropArea.size;
      const maxY = rect.height - cropArea.size;

      setCropArea((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      }));
    },
    [isDragging, dragStart, cropArea.size],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const createCroppedImage = () => {
    if (!imageRef.current || !containerRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const imageRect = imageRef.current!.getBoundingClientRect();

      // Вычисляем масштаб между отображаемым изображением и оригинальным
      const scaleX = img.naturalWidth / imageRect.width;
      const scaleY = img.naturalHeight / imageRect.height;

      // Переводим координаты области кропа в координаты оригинального изображения
      const cropX = cropArea.x * scaleX;
      const cropY = cropArea.y * scaleY;
      const cropSize = cropArea.size * Math.min(scaleX, scaleY);

      // Устанавливаем размер канваса 300x300 для квадратного результата
      canvas.width = 300;
      canvas.height = 300;

      ctx?.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, 300, 300);

      const croppedImageUrl = canvas.toDataURL("image/jpeg", 0.9);
      onCropSelect(croppedImageUrl);
      onClose();
    };

    img.src = imageUrl;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Crop" size={20} />
            Обрезка фото
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Перетащите квадрат на нужную область фото для обрезки
          </p>

          <div
            ref={containerRef}
            className="relative bg-gray-100 rounded-lg overflow-hidden cursor-move select-none"
            style={{ aspectRatio: "1/1", width: "100%", height: "400px" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Изображение для обрезки"
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Затемнение вокруг области кропа */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              style={{
                clipPath: `polygon(
                  0% 0%, 
                  ${cropArea.x}px 0%, 
                  ${cropArea.x}px ${cropArea.y}px, 
                  ${cropArea.x + cropArea.size}px ${cropArea.y}px, 
                  ${cropArea.x + cropArea.size}px ${cropArea.y + cropArea.size}px, 
                  ${cropArea.x}px ${cropArea.y + cropArea.size}px, 
                  ${cropArea.x}px 100%, 
                  0% 100%,
                  0% 0%,
                  100% 0%,
                  100% ${cropArea.y}px,
                  ${cropArea.x + cropArea.size}px ${cropArea.y}px,
                  ${cropArea.x + cropArea.size}px 0%,
                  100% 0%,
                  100% 100%,
                  ${cropArea.x + cropArea.size}px 100%,
                  ${cropArea.x + cropArea.size}px ${cropArea.y + cropArea.size}px,
                  100% ${cropArea.y + cropArea.size}px,
                  100% 100%,
                  0% 100%
                )`,
              }}
            />

            {/* Область кропа */}
            <div
              className="absolute border-2 border-white border-dashed cursor-move"
              style={{
                left: cropArea.x,
                top: cropArea.y,
                width: cropArea.size,
                height: cropArea.size,
                boxShadow: "0 0 0 2px rgba(0,0,0,0.3)",
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Углы для визуального указания */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-gray-400 rounded-sm"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-400 rounded-sm"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-gray-400 rounded-sm"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-gray-400 rounded-sm"></div>

              {/* Центральная иконка */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-80 rounded-full p-1">
                  <Icon name="Move" size={16} className="text-gray-600" />
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
              onClick={createCroppedImage}
              className="bg-green-700 hover:bg-green-800"
            >
              <Icon name="Check" size={16} className="mr-2" />
              Применить обрезку
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CropDialog;
