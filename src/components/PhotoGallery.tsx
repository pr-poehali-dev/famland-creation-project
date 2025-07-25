import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import useEmblaCarousel from "embla-carousel-react";
import PhotoUploadDialog from "@/components/PhotoUploadDialog";

interface Photo {
  id: string;
  url: string;
  title?: string;
  date?: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  onAddPhoto?: (photo: Photo) => void;
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
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Заглушечные фотографии для демонстрации
  const defaultPhotos: Photo[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      title: "Семейный праздник",
      date: "2023-12-25",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop",
      title: "День рождения",
      date: "2023-07-15",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&h=400&fit=crop",
      title: "Отпуск на даче",
      date: "2023-08-20",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
      title: "Рабочие моменты",
      date: "2023-05-10",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=600&h=400&fit=crop",
      title: "Выходные дома",
      date: "2023-09-03",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop",
      title: "С друзьями",
      date: "2023-06-12",
    },
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedSlide(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Автопрокрутка
  useEffect(() => {
    if (!emblaApi || displayPhotos.length <= 1) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi, displayPhotos.length]);

  return (
    <>
      <Card className="border-green-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6">
          <CardTitle className="flex items-center justify-between text-green-800">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                <Icon name="Camera" size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">
                  Галерея воспоминаний
                </h3>
                <p className="text-xs sm:text-sm text-green-600 font-normal">
                  {displayPhotos.length} фотографий
                </p>
              </div>
            </div>
            {allowEdit && onAddPhoto && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
                onClick={() => setUploadDialogOpen(true)}
              >
                <Icon name="Plus" size={14} className="mr-1 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Добавить</span>
                <span className="xs:hidden">+</span>
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
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
                  onClick={() => setUploadDialogOpen(true)}
                >
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить фото
                </Button>
              )}
            </div>
          ) : (
            <div className="relative">
              {/* Карусель */}
              <div
                className="overflow-hidden rounded-lg sm:rounded-xl"
                ref={emblaRef}
              >
                <div className="flex">
                  {displayPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="flex-[0_0_100%] min-w-0 px-1 sm:px-0"
                    >
                      <div className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 bg-white mx-1 sm:mx-0">
                        <div
                          className="relative cursor-pointer overflow-hidden aspect-[4/3] touch-manipulation"
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          <img
                            src={photo.url}
                            alt={photo.title || "Фотография"}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          />

                          {/* Градиентный оверлей */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Информация о фото */}
                          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            {photo.title && (
                              <h4 className="text-xs sm:text-sm font-semibold mb-1 drop-shadow-lg">
                                {photo.title}
                              </h4>
                            )}
                            {photo.date && (
                              <p className="text-xs opacity-90 flex items-center gap-1 drop-shadow">
                                <Icon
                                  name="Calendar"
                                  size={10}
                                  className="sm:w-3 sm:h-3"
                                />
                                {new Date(photo.date).toLocaleDateString(
                                  "ru-RU",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                            )}
                          </div>

                          {/* Иконка увеличения */}
                          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                            <Icon
                              name="Expand"
                              size={14}
                              className="text-white sm:w-4 sm:h-4"
                            />
                          </div>
                        </div>

                        {/* Кнопка удаления */}
                        {allowEdit && onDeletePhoto && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 sm:top-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 p-1.5 sm:p-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full shadow-lg touch-manipulation"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeletePhoto(photo.id);
                            }}
                          >
                            <Icon
                              name="Trash2"
                              size={10}
                              className="sm:w-3 sm:h-3"
                            />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Навигационные кнопки */}
              {displayPhotos.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border-white/20 shadow-lg hover:bg-white transition-all duration-300 touch-manipulation ${!canScrollPrev ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                  >
                    <Icon
                      name="ChevronLeft"
                      size={14}
                      className="sm:w-4 sm:h-4"
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border-white/20 shadow-lg hover:bg-white transition-all duration-300 touch-manipulation ${!canScrollNext ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                  >
                    <Icon
                      name="ChevronRight"
                      size={14}
                      className="sm:w-4 sm:h-4"
                    />
                  </Button>
                </>
              )}

              {/* Индикаторы */}
              {displayPhotos.length > 1 && (
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                  {displayPhotos.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                        index === selectedSlide
                          ? "bg-green-600 scale-125"
                          : "bg-green-200 hover:bg-green-400"
                      }`}
                      onClick={() => scrollTo(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модальное окно для просмотра фото */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-4xl p-0 overflow-hidden m-2 sm:m-4">
          {selectedPhoto && (
            <div className="relative">
              <div className="aspect-auto max-h-[70vh] sm:max-h-[80vh] overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title || "Фотография"}
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              {/* Информационная панель */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 sm:p-6 text-white">
                <DialogHeader className="space-y-1 sm:space-y-2">
                  <DialogTitle className="text-lg sm:text-xl font-bold text-white">
                    {selectedPhoto?.title || "Фотография"}
                  </DialogTitle>
                  {selectedPhoto.date && (
                    <p className="text-white/80 flex items-center gap-1 sm:gap-2 text-sm">
                      <Icon
                        name="Calendar"
                        size={14}
                        className="sm:w-4 sm:h-4"
                      />
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
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:bg-white/20 rounded-full p-2 h-8 w-8 sm:h-10 sm:w-10 touch-manipulation"
                onClick={() => setSelectedPhoto(null)}
              >
                <Icon name="X" size={14} className="sm:w-4 sm:h-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог загрузки фото */}
      <PhotoUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onAddPhoto={(photo) => {
          onAddPhoto?.(photo);
        }}
      />
    </>
  );
};

export default PhotoGallery;
