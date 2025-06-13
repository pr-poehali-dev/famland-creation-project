import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  // Заглушечные фотографии для демонстрации
  const defaultPhotos: Photo[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
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
      url: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&h=500&fit=crop",
      title: "Отпуск на даче",
      date: "2023-08-20",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=350&fit=crop",
      title: "Рабочие моменты",
      date: "2023-05-10",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&h=450&fit=crop",
      title: "Выходные дома",
      date: "2023-09-03",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=320&fit=crop",
      title: "С друзьями",
      date: "2023-06-12",
    },
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;

  return (
    <>
      <Card className="border-green-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center justify-between text-green-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon name="Camera" size={20} />
              </div>
              <div>
                <h3 className="font-bold">Галерея воспоминаний</h3>
                <p className="text-sm text-green-600 font-normal">
                  {displayPhotos.length} фотографий
                </p>
              </div>
            </div>
            {allowEdit && onAddPhoto && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={onAddPhoto}
              >
                <Icon name="Plus" size={16} className="mr-1" />
                Добавить
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {displayPhotos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ImageOff" size={32} className="text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Пока нет фотографий
              </h4>
              <p className="text-gray-500 mb-6">
                Загрузите первые воспоминания в галерею
              </p>
              {allowEdit && onAddPhoto && (
                <Button
                  className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onAddPhoto}
                >
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить фото
                </Button>
              )}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {displayPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="break-inside-avoid group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  onMouseEnter={() => setHoveredPhoto(photo.id)}
                  onMouseLeave={() => setHoveredPhoto(null)}
                >
                  <div
                    className="relative cursor-pointer overflow-hidden"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title || "Фотография"}
                      className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Градиентный оверлей */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Информация о фото */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {photo.title && (
                        <h4 className="text-sm font-semibold mb-1 drop-shadow-lg">
                          {photo.title}
                        </h4>
                      )}
                      {photo.date && (
                        <p className="text-xs opacity-90 flex items-center gap-1 drop-shadow">
                          <Icon name="Calendar" size={12} />
                          {new Date(photo.date).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>

                    {/* Иконка увеличения */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                      <Icon name="Expand" size={16} className="text-white" />
                    </div>
                  </div>

                  {/* Кнопка удаления */}
                  {allowEdit && onDeletePhoto && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 p-2 h-8 w-8 rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(photo.id);
                      }}
                    >
                      <Icon name="Trash2" size={12} />
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
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedPhoto && (
            <div className="relative">
              <div className="aspect-auto max-h-[80vh] overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title || "Фотография"}
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              {/* Информационная панель */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-white">
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-bold text-white">
                    {selectedPhoto?.title || "Фотография"}
                  </DialogTitle>
                  {selectedPhoto.date && (
                    <p className="text-white/80 flex items-center gap-2">
                      <Icon name="Calendar" size={16} />
                      {new Date(selectedPhoto.date).toLocaleDateString(
                        "ru-RU",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  )}
                </DialogHeader>
              </div>

              {/* Кнопка закрытия */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 h-10 w-10"
                onClick={() => setSelectedPhoto(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallery;
