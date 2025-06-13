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

interface PhotoGalleryCarouselProps {
  photos?: Photo[];
  onAddPhoto?: () => void;
  onDeletePhoto?: (photoId: string) => void;
  allowEdit?: boolean;
}

const PhotoGalleryCarousel = ({
  photos = [],
  onAddPhoto,
  onDeletePhoto,
  allowEdit = false,
}: PhotoGalleryCarouselProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Заглушечные фотографии для демонстрации
  const defaultPhotos: Photo[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      title: "Семейный праздник",
      date: "2023-12-25",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=300&fit=crop",
      title: "День рождения",
      date: "2023-07-15",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=300&h=300&fit=crop",
      title: "Отпуск на даче",
      date: "2023-08-20",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=300&fit=crop",
      title: "Рабочие моменты",
      date: "2023-05-10",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=300&h=300&fit=crop",
      title: "Выходные дома",
      date: "2023-09-03",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=300&fit=crop",
      title: "С друзьями",
      date: "2023-06-12",
    },
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;
  const photosPerPage = 4;
  const totalPages = Math.ceil(displayPhotos.length / photosPerPage);

  const getCurrentPhotos = () => {
    const start = currentIndex * photosPerPage;
    const end = start + photosPerPage;
    return displayPhotos.slice(start, end);
  };

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <>
      <Card className="border-purple-200 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
          <CardTitle className="flex items-center justify-between text-purple-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-200 rounded-xl">
                <Icon name="Images" size={20} />
              </div>
              <div>
                <h3 className="font-bold">Коллекция моментов</h3>
                <p className="text-sm text-purple-600 font-normal">
                  {displayPhotos.length} воспоминаний
                </p>
              </div>
            </div>
            {allowEdit && onAddPhoto && (
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ImageOff" size={32} className="text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Пока нет фотографий
              </h4>
              <p className="text-gray-500 mb-6">
                Создайте свою коллекцию воспоминаний
              </p>
              {allowEdit && onAddPhoto && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onAddPhoto}
                >
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить фото
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Карусель с фотографиями */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {getCurrentPhotos().map((photo, index) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title || "Фотография"}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />

                      {/* Цветной градиентный оверлей */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Декоративная рамка */}
                      <div className="absolute inset-2 border-2 border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100" />

                      {/* Информация о фото */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-400">
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
                            })}
                          </p>
                        )}
                      </div>

                      {/* Иконка просмотра */}
                      <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 scale-50 group-hover:scale-100">
                        <Icon name="Eye" size={20} className="text-white" />
                      </div>
                    </div>

                    {/* Кнопка удаления */}
                    {allowEdit && onDeletePhoto && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 p-1.5 h-7 w-7 rounded-full shadow-lg"
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

              {/* Навигация карусели */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    className="border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                  >
                    <Icon name="ChevronLeft" size={16} />
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === currentIndex
                            ? "bg-purple-600 w-8"
                            : "bg-purple-300 hover:bg-purple-400"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    className="border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                  >
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              )}

              {/* Счетчик страниц */}
              <div className="text-center mt-4">
                <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  {currentIndex + 1} из {totalPages}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Модальное окно для просмотра фото */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
          {selectedPhoto && (
            <div className="relative">
              <div className="aspect-auto max-h-[80vh] overflow-hidden rounded-t-lg">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title || "Фотография"}
                  className="w-full h-full object-contain bg-gradient-to-br from-purple-900 to-pink-900"
                />
              </div>

              {/* Информационная панель */}
              <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100">
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl font-bold text-purple-800 flex items-center gap-2">
                    <Icon name="Sparkles" size={20} />
                    {selectedPhoto?.title || "Фотография"}
                  </DialogTitle>
                  {selectedPhoto.date && (
                    <p className="text-purple-600 flex items-center gap-2">
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
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 h-10 w-10 backdrop-blur-sm"
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

export default PhotoGalleryCarousel;
