import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "Анна",
    lastName: "Петрова",
    email: "anna.petrova@email.com",
    phone: "+7 (999) 123-45-67",
    birthDate: "1985-03-15",
    location: "Москва, Россия",
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showBirthDate: false,
    allowFamilyInvites: true,
    emailNotifications: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} className="text-green-600" />
                  Личная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Имя</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Дата рождения</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={profile.birthDate}
                      onChange={(e) =>
                        setProfile({ ...profile, birthDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Местоположение</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                </div>

                <Button className="bg-green-700 hover:bg-green-800">
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Shield" size={20} className="text-green-600" />
                  Настройки приватности
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <Label>Публичный профиль</Label>
                    <p className="text-sm text-gray-600">
                      Позволить другим найти ваш профиль
                    </p>
                  </div>
                  <Switch
                    checked={privacy.publicProfile}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, publicProfile: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <Label>Показывать дату рождения</Label>
                    <p className="text-sm text-gray-600">
                      Дата рождения будет видна в древе
                    </p>
                  </div>
                  <Switch
                    checked={privacy.showBirthDate}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, showBirthDate: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <Label>Приглашения от родственников</Label>
                    <p className="text-sm text-gray-600">
                      Разрешить отправку приглашений
                    </p>
                  </div>
                  <Switch
                    checked={privacy.allowFamilyInvites}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, allowFamilyInvites: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <Label>Email уведомления</Label>
                    <p className="text-sm text-gray-600">
                      Получать уведомления на почту
                    </p>
                  </div>
                  <Switch
                    checked={privacy.emailNotifications}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, emailNotifications: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Avatar */}
            <Card>
              <CardContent className="pt-6 text-center">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-green-600 text-sm mb-4">
                  {profile.location}
                </p>
                <Button variant="outline" className="w-full">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить фото
                </Button>
              </CardContent>
            </Card>

            {/* Family Tree Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="TreePine" size={20} className="text-green-600" />
                  Моё древо
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Родственников:</span>
                    <span className="font-semibold text-green-800">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Поколений:</span>
                    <span className="font-semibold text-green-800">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Фотографий:</span>
                    <span className="font-semibold text-green-800">156</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button className="w-full bg-green-700 hover:bg-green-800">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Посмотреть древо
                </Button>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Аккаунт</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full justify-start bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    >
                      <Icon name="LogOut" className="mr-2 h-4 w-4" />
                      Выйти
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Подтверждение выхода</AlertDialogTitle>
                      <AlertDialogDescription>
                        Вы уверены, что хотите выйти?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                        Выйти
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Key" size={16} className="mr-2" />
                  Сменить пароль
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт данных
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="TreePine" size={16} className="mr-2" />
                  Скачать древо
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Удалить аккаунт
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
