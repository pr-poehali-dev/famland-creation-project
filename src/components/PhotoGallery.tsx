import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface Photo {
  id: string;
  url: string;
  title?: string;
  date?: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  onAddPhoto?: () => void;
  onDeletePhoto?: (photoId: string) => void;
  allowEdit?: boolean;
}

const PhotoGallery = ({
  photos = [],
  onAddPhoto,
  onDeletePhoto,
  allowEdit = false,
}: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Заглушечные фотографии для демонстрации
  const defaultPhotos: Photo[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      title: "Семейный праздник",
      date: "2023-12-25",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
      title: "День рождения",
      date: "2023-07-15",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&h=300&fit=crop",
      title: "Отпуск на даче",
      date: "2023-08-20",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
      title: "Рабочие моменты",
      date: "2023-05-10",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&h=300&fit=crop",
      title: "Выходные дома",
      date: "2023-09-03",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop",
      title: "С друзьями",
      date: "2023-06-12",
    },
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;

  return (
    <>
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-green-800">
            <div className="flex items-center gap-2">
              <Icon name="Images" size={20} />
              Галерея фотографий
            </div>
            {allowEdit && onAddPhoto && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={onAddPhoto}
              >
                <Icon name="Plus" size={16} className="mr-1" />
                Добавить
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {displayPhotos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Icon
                name="ImageOff"
                size={48}
                className="mx-auto mb-3 text-gray-300"
              />
              <p>Пока нет фотографий</p>
              {allowEdit && onAddPhoto && (
                <Button
                  className="mt-3 bg-green-600 hover:bg-green-700"
                  onClick={onAddPhoto}
                >
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить первое фото
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {displayPhotos.map((photo) => (
                <div key={photo.id} className="group relative">
                  <div
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title || "Фотография"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {allowEdit && onDeletePhoto && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(photo.id);
                      }}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модальное окно для просмотра фото */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-green-800">
              {selectedPhoto?.title || "Фотография"}
            </DialogTitle>
          </DialogHeader>
          {selectedPhoto && (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title || "Фотография"}
                  className="w-full h-full object-contain bg-gray-50"
                />
              </div>
              {selectedPhoto.date && (
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  {new Date(selectedPhoto.date).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallery;
