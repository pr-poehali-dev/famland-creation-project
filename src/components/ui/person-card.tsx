import Icon from "@/components/ui/icon";

interface PersonCardProps {
  name: string;
  years?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
  className?: string;
}

const PersonCard = ({
  name,
  years,
  isHighlighted = false,
  onClick,
  className = "",
}: PersonCardProps) => {
  const baseStyles =
    "p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[120px] md:min-w-0";
  const styles = isHighlighted
    ? "bg-green-200 hover:bg-green-300 border-green-400"
    : "bg-green-100 hover:bg-green-200 border-green-300";

  return (
    <div className={`${baseStyles} ${styles} ${className}`} onClick={onClick}>
      <div
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
          isHighlighted ? "bg-green-400" : "bg-green-300"
        }`}
      >
        <Icon
          name="User"
          size={20}
          className={isHighlighted ? "text-green-800" : "text-green-700"}
        />
      </div>
      <h4 className="font-semibold text-green-800 text-center text-sm md:text-base">
        {name}
      </h4>
      {years && (
        <p className="text-xs md:text-sm text-green-600 text-center">{years}</p>
      )}
    </div>
  );
};

export default PersonCard;
