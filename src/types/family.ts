export interface FamilyMember {
  id: string;
  name: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  fullName?: string;
  relation: string;
  generation: number;
  age?: number;
  birthDate?: string;
  description?: string;
  children?: string[];
  photo?: string;
  gender?: string;
  deceased?: boolean;
}

export interface DeceasedStyle {
  overlay: JSX.Element;
  textColor: string;
  subTextColor: string;
  nameSymbol?: string;
}

export type GenerationLevel = -2 | -1 | 0 | 1 | 2;
