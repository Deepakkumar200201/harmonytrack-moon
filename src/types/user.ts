
export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
}

export interface UserSettings {
  userId: string;
  theme: "light" | "dark" | "system";
  notifications: boolean;
  dataSharing: boolean;
}

export interface CycleData {
  id: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  periodLength?: number;
  cycleLength?: number;
  symptoms: Symptom[];
  notes?: string;
}

export interface Symptom {
  id: string;
  type: SymptomType;
  intensity: 1 | 2 | 3 | 4 | 5;  // 1-5 scale
  date: Date;
  notes?: string;
}

export type SymptomType = 
  | "cramps" 
  | "headache" 
  | "bloating" 
  | "fatigue" 
  | "breastTenderness"
  | "acne"
  | "mood"
  | "appetite"
  | "discharge"
  | "spotting"
  | "other";
