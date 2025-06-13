interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader = ({
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) => {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      <h2 className="text-4xl font-bold text-green-800 mb-4 font-serif">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-green-600 max-w-3xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
