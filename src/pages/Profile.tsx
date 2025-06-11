import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="ArrowLeft" size={20} className="text-green-600" />
            <span className="text-green-800 font-medium">Семейное Древо</span>
          </Link>
          <h1 className="text-xl font-semibold text-green-800">Профиль</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="flex items-center justify-between">
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

                <div className="flex items-center justify-between">
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

                <div className="flex items-center justify-between">
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

                <div className="flex items-center justify-between">
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
                <Avatar className="w-32 h-32 mx-auto mb-4">
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
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Key" size={16} className="mr-2" />
                  Сменить пароль
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт данных
                </Button>
                <Button variant="destructive" className="w-full justify-start">
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
