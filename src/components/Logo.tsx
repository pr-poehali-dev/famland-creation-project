import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center justify-center gap-3 mb-8 hover:opacity-80 transition-opacity"
    >
      <div className="relative">
        <Icon name="TreePine" size={40} className="text-green-700" />
      </div>
      <div className="text-2xl font-bold text-green-800 font-serif">
        Семейное Древо
      </div>
    </Link>
  );
};

export default Logo;
