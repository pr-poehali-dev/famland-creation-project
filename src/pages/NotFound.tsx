import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <div className="flex items-center justify-center flex-1 py-16">
        <div className="text-center">
          <Icon
            name="TreePine"
            size={64}
            className="text-green-300 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-green-800 mb-4">404</h1>
          <p className="text-xl text-green-600 mb-8">
            Упс! Страница не найдена
          </p>
          <Button className="bg-green-700 hover:bg-green-800">
            <Icon name="Home" size={16} className="mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
