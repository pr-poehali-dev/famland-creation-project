import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Logo from "@/components/Logo";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
    // Здесь будет логика авторизации
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    console.log("Register:", data);
    // Здесь будет логика регистрации
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <Logo />
            </Link>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              {isLogin ? "Вход в аккаунт" : "Создание аккаунта"}
            </h2>
            <p className="text-green-600">
              {isLogin
                ? "Добро пожаловать обратно в ваше семейное древо"
                : "Начните создавать историю вашей семьи"}
            </p>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Icon
                            name="Mail"
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                          />
                          <Input
                            {...field}
                            type="email"
                            className="pl-10 border-green-200 focus:border-green-500"
                            placeholder="your@email.com"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800">Пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Icon
                            name="Lock"
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                          />
                          <Input
                            {...field}
                            type="password"
                            className="pl-10 border-green-200 focus:border-green-500"
                            placeholder="••••••••"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-3"
                >
                  <Icon name="LogIn" size={20} />
                  Войти в аккаунт
                </Button>
              </form>
            </Form>
          ) : (
            /* Register Form */
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800">Имя</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Icon
                            name="User"
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                          />
                          <Input
                            {...field}
                            className="pl-10 border-green-200 focus:border-green-500"
                            placeholder="Ваше имя"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Icon
                            name="Mail"
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                          />
                          <Input
                            {...field}
                            type="email"
                            className="pl-10 border-green-200 focus:border-green-500"
                            placeholder="your@email.com"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800">Пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Icon
                            name="Lock"
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                          />
                          <Input
                            {...field}
                            type="password"
                            className="pl-10 border-green-200 focus:border-green-500"
                            placeholder="••••••••"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800">
                        Подтвердите пароль
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Icon
                            name="Lock"
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                          />
                          <Input
                            {...field}
                            type="password"
                            className="pl-10 border-green-200 focus:border-green-500"
                            placeholder="••••••••"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-3"
                >
                  <Icon name="UserPlus" size={20} />
                  Создать аккаунт
                </Button>
              </form>
            </Form>
          )}

          {/* Toggle Form */}
          <div className="mt-6 text-center">
            <p className="text-green-600 mb-2">
              {isLogin ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
            </p>
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-700 hover:text-green-800 hover:bg-green-50"
            >
              {isLogin ? "Создать аккаунт" : "Войти в систему"}
            </Button>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center border-t border-green-100 pt-6">
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 transition-colors inline-flex items-center gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
