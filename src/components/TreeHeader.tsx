import { CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface TreeHeaderProps {
  onAddMember: () => void;
}

const TreeHeader = ({ onAddMember }: TreeHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between text-green-800">
        <span className="flex items-center gap-2">
          <Icon name="TreePine" size={24} />
          Семейное древо
        </span>
        <button
          onClick={onAddMember}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
          title="Добавить члена семьи"
        >
          <Icon name="UserPlus" size={16} />
          <span className="hidden sm:inline">Добавить члена</span>
        </button>
      </CardTitle>
    </CardHeader>
  );
};

export default TreeHeader;
