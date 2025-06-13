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
  width: number;
  height: number;
}

interface ImageDimensions {
  displayWidth: number;
  displayHeight: number;
  displayX: number;
  displayY: number;
  naturalWidth: number;
  naturalHeight: number;
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
    width: 150,
    height: 150,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialCropArea, setInitialCropArea] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Вычисляем размеры и позицию изображения с учетом object-contain
  const calculateImageDimensions = useCallback(() => {
    if (!imageRef.current || !containerRef.current) return null;

    const img = imageRef.current;
    const container = containerRef.current;

    // Получаем естественные размеры изображения
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (naturalWidth === 0 || naturalHeight === 0) return null;

    const naturalAspect = naturalWidth / naturalHeight;

    // Получаем размеры контейнера
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const containerAspect = containerWidth / containerHeight;

    let displayWidth: number;
    let displayHeight: number;
    let displayX: number;
    let displayY: number;

    // Рассчитываем реальные размеры изображения с object-contain
    if (naturalAspect > containerAspect) {
      // Изображение ограничено по ширине
      displayWidth = containerWidth;
      displayHeight = containerWidth / naturalAspect;
      displayX = 0;
      displayY = (containerHeight - displayHeight) / 2;
    } else {
      // Изображение ограничено по высоте
      displayHeight = containerHeight;
      displayWidth = containerHeight * naturalAspect;
      displayX = (containerWidth - displayWidth) / 2;
      displayY = 0;
    }

    return {
      displayWidth,
      displayHeight,
      displayX,
      displayY,
      naturalWidth,
      naturalHeight,
    };
  }, []);

  // Инициализация области кропа
  useEffect(() => {
    if (isOpen && imageRef.current?.complete) {
      const dims = calculateImageDimensions();
      if (dims) {
        setImageDimensions(dims);

        // Устанавливаем квадратную область кропа в центре изображения
        const cropSize = Math.min(dims.displayWidth, dims.displayHeight) * 0.6;
        const cropX = dims.displayX + (dims.displayWidth - cropSize) / 2;
        const cropY = dims.displayY + (dims.displayHeight - cropSize) / 2;

        setCropArea({
          x: cropX,
          y: cropY,
          width: cropSize,
          height: cropSize,
        });
      }
    }
  }, [isOpen, imageUrl, calculateImageDimensions]);

  // Обработчик загрузки изображения
  const handleImageLoad = useCallback(() => {
    const dims = calculateImageDimensions();
    if (dims) {
      setImageDimensions(dims);

      // Устанавливаем область кропа только если еще не установлена
      if (cropArea.width === 150 && cropArea.height === 150) {
        const cropSize = Math.min(dims.displayWidth, dims.displayHeight) * 0.6;
        const cropX = dims.displayX + (dims.displayWidth - cropSize) / 2;
        const cropY = dims.displayY + (dims.displayHeight - cropSize) / 2;

        setCropArea({
          x: cropX,
          y: cropY,
          width: cropSize,
          height: cropSize,
        });
      }
    }
  }, [calculateImageDimensions, cropArea.width, cropArea.height]);

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

  const constrainCropArea = useCallback(
    (area: CropArea): CropArea => {
      if (!imageDimensions) return area;

      const { displayX, displayY, displayWidth, displayHeight } =
        imageDimensions;

      // Ограничиваем область кропа границами изображения
      const minX = displayX;
      const minY = displayY;
      const maxX = displayX + displayWidth;
      const maxY = displayY + displayHeight;

      let { x, y, width, height } = area;

      // Минимальный размер
      const minSize = 50;
      width = Math.max(minSize, width);
      height = Math.max(minSize, height);

      // Максимальный размер не больше изображения
      width = Math.min(width, displayWidth);
      height = Math.min(height, displayHeight);

      // Держим квадратную форму
      const size = Math.min(width, height);
      width = size;
      height = size;

      // Ограничиваем позицию
      x = Math.max(minX, Math.min(x, maxX - width));
      y = Math.max(minY, Math.min(y, maxY - height));

      return { x, y, width, height };
    },
    [imageDimensions],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !imageDimensions) return;

      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (isResizing) {
        const deltaX = currentX - dragStart.x;
        const deltaY = currentY - dragStart.y;

        let newArea = { ...initialCropArea };

        // Определяем новый размер в зависимости от ручки
        if (resizeHandle.includes("right")) {
          newArea.width = initialCropArea.width + deltaX;
        } else if (resizeHandle.includes("left")) {
          newArea.width = initialCropArea.width - deltaX;
          newArea.x = initialCropArea.x + deltaX;
        }

        if (resizeHandle.includes("bottom")) {
          newArea.height = initialCropArea.height + deltaY;
        } else if (resizeHandle.includes("top")) {
          newArea.height = initialCropArea.height - deltaY;
          newArea.y = initialCropArea.y + deltaY;
        }

        // Для угловых ручек используем максимальное изменение для сохранения квадрата
        if (resizeHandle.includes("-")) {
          const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
          if (
            resizeHandle.includes("right") ||
            resizeHandle.includes("bottom")
          ) {
            newArea.width = initialCropArea.width + maxDelta;
            newArea.height = initialCropArea.height + maxDelta;
          } else {
            newArea.width = initialCropArea.width + maxDelta;
            newArea.height = initialCropArea.height + maxDelta;
            if (resizeHandle.includes("left")) {
              newArea.x = initialCropArea.x - maxDelta;
            }
            if (resizeHandle.includes("top")) {
              newArea.y = initialCropArea.y - maxDelta;
            }
          }
        }

        setCropArea(constrainCropArea(newArea));
      } else if (isDragging) {
        const newX = currentX - dragStart.x;
        const newY = currentY - dragStart.y;

        setCropArea(
          constrainCropArea({
            ...cropArea,
            x: newX,
            y: newY,
          }),
        );
      }
    },
    [
      isDragging,
      isResizing,
      dragStart,
      resizeHandle,
      initialCropArea,
      cropArea,
      imageDimensions,
      constrainCropArea,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle("");
  }, []);

  const createCroppedImage = () => {
    if (!imageDimensions) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const {
        displayX,
        displayY,
        displayWidth,
        displayHeight,
        naturalWidth,
        naturalHeight,
      } = imageDimensions;

      // Рассчитываем координаты обрезки относительно изображения
      const cropRelativeX = cropArea.x - displayX;
      const cropRelativeY = cropArea.y - displayY;

      // Рассчитываем масштаб между отображаемым и исходным изображением
      const scaleX = naturalWidth / displayWidth;
      const scaleY = naturalHeight / displayHeight;

      // Переводим координаты в координаты исходного изображения
      const sourceX = cropRelativeX * scaleX;
      const sourceY = cropRelativeY * scaleY;
      const sourceWidth = cropArea.width * scaleX;
      const sourceHeight = cropArea.height * scaleY;

      // Устанавливаем размер канваса для квадратного результата 300x300
      const outputSize = 300;
      canvas.width = outputSize;
      canvas.height = outputSize;

      // Заливаем канвас белым цветом
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, outputSize, outputSize);

      // Обрезаем и рисуем изображение
      ctx.drawImage(
        img,
        Math.max(0, sourceX),
        Math.max(0, sourceY),
        Math.min(sourceWidth, naturalWidth - Math.max(0, sourceX)),
        Math.min(sourceHeight, naturalHeight - Math.max(0, sourceY)),
        0,
        0,
        outputSize,
        outputSize,
      );

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
            Перетащите и измените размер квадрата для обрезки фото
          </p>

          <div
            ref={containerRef}
            className="relative bg-gray-100 rounded-lg overflow-hidden select-none flex items-center justify-center"
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
              onLoad={handleImageLoad}
            />

            {/* Затемнение вокруг области кропа */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
              style={{
                clipPath: `polygon(
                  0% 0%, 
                  ${cropArea.x}px 0%, 
                  ${cropArea.x}px ${cropArea.y}px, 
                  ${cropArea.x + cropArea.width}px ${cropArea.y}px, 
                  ${cropArea.x + cropArea.width}px ${cropArea.y + cropArea.height}px, 
                  ${cropArea.x}px ${cropArea.y + cropArea.height}px, 
                  ${cropArea.x}px 100%, 
                  0% 100%,
                  0% 0%,
                  100% 0%,
                  100% ${cropArea.y}px,
                  ${cropArea.x + cropArea.width}px ${cropArea.y}px,
                  ${cropArea.x + cropArea.width}px 0%,
                  100% 0%,
                  100% 100%,
                  ${cropArea.x + cropArea.width}px 100%,
                  ${cropArea.x + cropArea.width}px ${cropArea.y + cropArea.height}px,
                  100% ${cropArea.y + cropArea.height}px,
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
                width: cropArea.width,
                height: cropArea.height,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Ручки для изменения размера по углам */}
              <div
                className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nw-resize hover:bg-blue-50"
                onMouseDown={(e) => handleResizeStart(e, "top-left")}
              />
              <div
                className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-ne-resize hover:bg-blue-50"
                onMouseDown={(e) => handleResizeStart(e, "top-right")}
              />
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-sw-resize hover:bg-blue-50"
                onMouseDown={(e) => handleResizeStart(e, "bottom-left")}
              />
              <div
                className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-se-resize hover:bg-blue-50"
                onMouseDown={(e) => handleResizeStart(e, "bottom-right")}
              />

              {/* Центральная иконка */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-sm">
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
              disabled={!imageDimensions}
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
