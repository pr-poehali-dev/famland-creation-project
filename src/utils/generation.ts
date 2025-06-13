import { GenerationLevel } from "@/types/family";

export const getGenerationText = (generation: number): string => {
  const ordinals = ["1-е", "2-е", "3-е", "4-е", "5-е"];
  if (generation < 0) {
    return `Прошлое поколение: ${Math.abs(generation)}`;
  }
  return `Поколение: ${ordinals[generation] || `${generation + 1}-е`}`;
};

export const GENERATION_CONFIG: Array<{
  generation: GenerationLevel;
  title: string;
}> = [
  { generation: -2, title: "Далекие предки" },
  { generation: -1, title: "Предки" },
  { generation: 0, title: "Старшее поколение" },
  { generation: 1, title: "Родители" },
  { generation: 2, title: "Наше поколение" },
];
