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
    size: 176,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialCropArea, setInitialCropArea] = useState<CropArea>({
    x: 0,
    y: 0,
    size: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Инициализация области кропа при загрузке изображения
  useEffect(() => {
    if (isOpen && imageRef.current && containerRef.current) {
      const timer = setTimeout(() => {
        const imageElement = imageRef.current!;
        const containerElement = containerRef.current!;
        const imageRect = imageElement.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();

        // Вычисляем позицию изображения внутри контейнера
        const imageOffsetX = imageRect.left - containerRect.left;
        const imageOffsetY = imageRect.top - containerRect.top;

        // Размер области кропа (квадрат)
        const cropSize = Math.min(
          176,
          imageRect.width * 0.6,
          imageRect.height * 0.6,
        );

        // Центрируем область кропа на изображении
        const cropX = imageOffsetX + (imageRect.width - cropSize) / 2;
        const cropY = imageOffsetY + (imageRect.height - cropSize) / 2;

        setCropArea({
          x: cropX,
          y: cropY,
          size: cropSize,
        });
      }, 100); // Небольшая задержка для корректного расчета размеров

      return () => clearTimeout(timer);
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

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, handle: string) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      setResizeHandle(handle);
      setInitialCropArea({ ...cropArea });
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setDragStart({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [cropArea],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (isResizing) {
        const deltaX = currentX - dragStart.x;
        const deltaY = currentY - dragStart.y;

        let newSize = initialCropArea.size;
        let newX = initialCropArea.x;
        let newY = initialCropArea.y;

        // Определяем новый размер в зависимости от ручки
        if (resizeHandle.includes("right") || resizeHandle.includes("bottom")) {
          newSize = initialCropArea.size + Math.max(deltaX, deltaY);
        } else if (
          resizeHandle.includes("left") ||
          resizeHandle.includes("top")
        ) {
          const sizeDelta = Math.max(-deltaX, -deltaY);
          newSize = initialCropArea.size + sizeDelta;
          newX = initialCropArea.x - sizeDelta;
          newY = initialCropArea.y - sizeDelta;
        }

        // Ограничиваем минимальный и максимальный размер
        const minSize = 50;
        const maxSize = Math.min(rect.width, rect.height) - 20;
        newSize = Math.max(minSize, Math.min(newSize, maxSize));

        // Корректируем позицию при изменении размера от левого/верхнего края
        if (resizeHandle.includes("left") || resizeHandle.includes("top")) {
          const sizeDiff = newSize - initialCropArea.size;
          newX = initialCropArea.x - sizeDiff;
          newY = initialCropArea.y - sizeDiff;
        }

        // Ограничиваем область границами контейнера
        const maxX = rect.width - newSize;
        const maxY = rect.height - newSize;
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        setCropArea({
          x: newX,
          y: newY,
          size: newSize,
        });
      } else if (isDragging) {
        const newX = currentX - dragStart.x;
        const newY = currentY - dragStart.y;

        // Ограничиваем область кропа границами изображения
        const maxX = rect.width - cropArea.size;
        const maxY = rect.height - cropArea.size;

        setCropArea((prev) => ({
          ...prev,
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        }));
      }
    },
    [
      isDragging,
      isResizing,
      dragStart,
      resizeHandle,
      initialCropArea,
      cropArea.size,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle("");
  }, []);

  const createCroppedImage = () => {
    if (!imageRef.current || !containerRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const imageElement = imageRef.current!;
      const imageRect = imageElement.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();

      // Вычисляем позицию изображения внутри контейнера
      const imageOffsetX = imageRect.left - containerRect.left;
      const imageOffsetY = imageRect.top - containerRect.top;

      // Корректируем координаты кропа относительно изображения
      const cropRelativeX = cropArea.x - imageOffsetX;
      const cropRelativeY = cropArea.y - imageOffsetY;

      // Проверяем, что область кропа находится внутри изображения
      if (
        cropRelativeX < 0 ||
        cropRelativeY < 0 ||
        cropRelativeX + cropArea.size > imageRect.width ||
        cropRelativeY + cropArea.size > imageRect.height
      ) {
        console.warn("Область кропа выходит за границы изображения");
        return;
      }

      // Вычисляем масштаб между отображаемым и оригинальным изображением
      const scaleX = img.naturalWidth / imageRect.width;
      const scaleY = img.naturalHeight / imageRect.height;

      // Переводим координаты в координаты оригинального изображения
      const cropX = cropRelativeX * scaleX;
      const cropY = cropRelativeY * scaleY;
      const cropWidth = cropArea.size * scaleX;
      const cropHeight = cropArea.size * scaleY;

      // Устанавливаем размер канваса 300x300 для квадратного результата
      canvas.width = 300;
      canvas.height = 300;

      // Заливаем канвас белым цветом для прозрачных областей
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 300, 300);
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, 300, 300);
      }

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
            className="relative bg-gray-100 rounded-lg overflow-hidden cursor-move select-none flex items-center justify-center"
            style={{ width: "100%", height: "400px" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Изображение для обрезки"
              className="max-w-full max-h-full object-contain"
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
              {/* Ручки для изменения размера по углам */}
              <div
                className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-nw-resize"
                onMouseDown={(e) => handleResizeStart(e, "top-left")}
              ></div>
              <div
                className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-ne-resize"
                onMouseDown={(e) => handleResizeStart(e, "top-right")}
              ></div>
              <div
                className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-sw-resize"
                onMouseDown={(e) => handleResizeStart(e, "bottom-left")}
              ></div>
              <div
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-se-resize"
                onMouseDown={(e) => handleResizeStart(e, "bottom-right")}
              ></div>

              {/* Ручки для изменения размера по краям */}
              <div
                className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-n-resize"
                onMouseDown={(e) => handleResizeStart(e, "top")}
              ></div>
              <div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-s-resize"
                onMouseDown={(e) => handleResizeStart(e, "bottom")}
              ></div>
              <div
                className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-w-resize"
                onMouseDown={(e) => handleResizeStart(e, "left")}
              ></div>
              <div
                className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-e-resize"
                onMouseDown={(e) => handleResizeStart(e, "right")}
              ></div>

              {/* Центральная иконка */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
