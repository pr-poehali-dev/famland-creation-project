import Icon from "@/components/ui/icon";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
        <Icon name={icon as any} size={32} className="text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
        {title}
      </h3>
      <p className="text-green-600 text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
