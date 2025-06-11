import Icon from "@/components/ui/icon";

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="relative">
        <Icon name="TreePine" size={40} className="text-green-700" />
      </div>
      <div className="text-2xl font-bold text-green-800 font-serif">
        Семейное Древо
      </div>
    </div>
  );
};

export default Logo;
