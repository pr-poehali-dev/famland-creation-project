import { DeceasedStyle } from "@/types/family";
import Icon from "@/components/ui/icon";

const DECEASED_STYLES: Record<string, DeceasedStyle> = {
  "7": {
    overlay: (
      <div className="absolute top-2 right-2 bg-gray-600 text-white p-1 rounded-full">
        <Icon name="Heart" size={12} className="fill-current" />
      </div>
    ),
    textColor: "text-gray-600",
    subTextColor: "text-gray-500",
    nameSymbol: "✝",
  },
  "9": {
    overlay: (
      <div className="absolute inset-0 rounded-lg border-4 border-double border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 opacity-80">
        <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
          ★ Вечная память
        </div>
      </div>
    ),
    textColor: "text-amber-800 font-semibold",
    subTextColor: "text-amber-700",
    nameSymbol: "⭐",
  },
  "10": {
    overlay: (
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-100 via-purple-50 to-violet-100 border-2 border-purple-300 opacity-90">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
            <Icon name="Flower" size={12} />В наших сердцах
          </div>
        </div>
        <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">♡</span>
        </div>
      </div>
    ),
    textColor: "text-purple-800 font-semibold",
    subTextColor: "text-purple-700",
    nameSymbol: "🌸",
  },
  "11": {
    overlay: (
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 border border-yellow-600 opacity-95">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 rounded-lg"></div>
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 px-2 py-1 rounded-md text-xs font-bold shadow-lg border border-yellow-500">
          ◆ Светлая память
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-800/80 text-yellow-400 px-2 py-1 rounded-full text-xs border border-yellow-600/30">
          <Icon name="Crown" size={10} />
          <span>Наследие</span>
        </div>
        <div className="absolute top-1/2 right-2 w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border border-yellow-400">
          <span className="text-slate-900 text-sm font-bold">✦</span>
        </div>
      </div>
    ),
    textColor: "text-yellow-600 font-bold",
    subTextColor: "text-yellow-700",
    nameSymbol: "✦",
  },
  "12": {
    overlay: (
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-amber-500 opacity-95">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-amber-400/10 to-yellow-400/15 rounded-lg"></div>
        <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-gray-900 px-3 py-1 rounded-lg text-xs font-extrabold shadow-xl border border-amber-400">
          ♔ Вечная слава
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-gray-900/90 text-amber-400 px-2 py-1 rounded-md text-xs border border-amber-500/40">
          <Icon name="Star" size={10} />
          <span className="font-semibold">Легенда</span>
        </div>
        <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-300">
          <span className="text-gray-900 text-lg font-extrabold">♛</span>
        </div>
      </div>
    ),
    textColor: "text-amber-400 font-extrabold",
    subTextColor: "text-amber-500",
    nameSymbol: "♛",
  },
};

const DEFAULT_DECEASED_STYLE: DeceasedStyle = {
  overlay: (
    <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
      <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs text-gray-700 font-medium">
        ✞ Покоится с миром
      </div>
    </div>
  ),
  textColor: "text-gray-600",
  subTextColor: "text-gray-500",
};

export const getDeceasedStyle = (memberId: string): DeceasedStyle => {
  return DECEASED_STYLES[memberId] || DEFAULT_DECEASED_STYLE;
};
