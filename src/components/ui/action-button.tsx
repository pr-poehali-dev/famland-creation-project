import Icon from "@/components/ui/icon";

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: string;
  onClick?: () => void;
  className?: string;
}

const ActionButton = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  className = "",
}: ActionButtonProps) => {
  const baseStyles =
    "font-semibold transition-all duration-300 hover:scale-105 rounded-lg inline-flex items-center justify-center";

  const variantStyles = {
    primary: "bg-green-700 hover:bg-green-800 text-white shadow-lg",
    secondary:
      "bg-white text-green-700 hover:bg-green-50 border-2 border-green-200",
    outline: "border-2 border-green-200 text-green-100 hover:bg-green-600",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {icon && <Icon name={icon as any} size={20} className="mr-2" />}
      {children}
    </button>
  );
};

export default ActionButton;
