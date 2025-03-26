
import React, { createContext, useContext, useState, useEffect } from "react";
import { addDays, format, differenceInDays, subDays } from "date-fns";

// Define types
type CyclePhase = "menstruation" | "follicular" | "ovulation" | "luteal";

type DayData = {
  date: Date;
  phase: CyclePhase | null;
  isPeriod: boolean;
  isFertile: boolean;
  isOvulation: boolean;
  symptoms: string[];
  notes: string;
};

type Cycle = {
  startDate: Date;
  endDate: Date | null;
  length: number | null;
};

interface CycleContextType {
  cycles: Cycle[];
  currentCycle: Cycle | null;
  cycleLength: number;
  periodLength: number;
  lutealPhaseLength: number;
  nextPeriodDate: Date | null;
  ovulationDate: Date | null;
  dayData: Record<string, DayData>;
  fertileWindow: Date[] | null;
  
  // Methods
  addCycle: (startDate: Date) => void;
  endCurrentCycle: (endDate: Date) => void;
  setCycleLength: (length: number) => void;
  setPeriodLength: (length: number) => void;
  addSymptom: (date: Date, symptom: string) => void;
  removeSymptom: (date: Date, symptom: string) => void;
  addNote: (date: Date, note: string) => void;
  getDayInfo: (date: Date) => DayData | null;
  getCurrentPhase: () => CyclePhase | null;
}

// Create the context with default values
const CycleContext = createContext<CycleContextType | undefined>(undefined);

export const CycleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State variables
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [currentCycle, setCurrentCycle] = useState<Cycle | null>(null);
  const [cycleLength, setCycleLengthState] = useState<number>(28);
  const [periodLength, setPeriodLengthState] = useState<number>(5);
  const [lutealPhaseLength, setLutealPhaseLength] = useState<number>(14);
  const [dayData, setDayData] = useState<Record<string, DayData>>({});
  
  // Computed values
  const nextPeriodDate = currentCycle ? addDays(currentCycle.startDate, cycleLength) : null;
  const ovulationDate = currentCycle 
    ? addDays(currentCycle.startDate, cycleLength - lutealPhaseLength) 
    : null;
  
  const fertileWindow = ovulationDate 
    ? [
        subDays(ovulationDate, 5),
        subDays(ovulationDate, 4),
        subDays(ovulationDate, 3),
        subDays(ovulationDate, 2),
        subDays(ovulationDate, 1),
        ovulationDate,
        addDays(ovulationDate, 1),
      ] 
    : null;

  // Initialize with mock data for demo
  useEffect(() => {
    // Add a sample cycle starting 15 days ago
    const mockStartDate = subDays(new Date(), 15);
    addCycle(mockStartDate);
  }, []);

  // Calculate phase for a given date
  const calculatePhase = (date: Date): CyclePhase | null => {
    if (!currentCycle) return null;
    
    const dayInCycle = differenceInDays(date, currentCycle.startDate);
    
    if (dayInCycle >= 0 && dayInCycle < periodLength) {
      return "menstruation";
    } else if (dayInCycle >= periodLength && dayInCycle < cycleLength - lutealPhaseLength) {
      return "follicular";
    } else if (dayInCycle === cycleLength - lutealPhaseLength) {
      return "ovulation";
    } else if (dayInCycle > cycleLength - lutealPhaseLength && dayInCycle < cycleLength) {
      return "luteal";
    }
    
    return null;
  };

  // Get information about a specific day
  const getDayInfo = (date: Date): DayData | null => {
    const dateStr = format(date, "yyyy-MM-dd");
    
    if (dayData[dateStr]) {
      return dayData[dateStr];
    }
    
    if (!currentCycle) return null;
    
    const phase = calculatePhase(date);
    const isPeriod = phase === "menstruation";
    const isOvulation = phase === "ovulation";
    const isFertile = fertileWindow?.some(d => format(d, "yyyy-MM-dd") === dateStr) || false;
    
    const newDayData: DayData = {
      date,
      phase,
      isPeriod,
      isFertile,
      isOvulation,
      symptoms: [],
      notes: ""
    };
    
    return newDayData;
  };

  // Get the current phase of the cycle
  const getCurrentPhase = (): CyclePhase | null => {
    return calculatePhase(new Date());
  };

  // Add a new cycle
  const addCycle = (startDate: Date) => {
    const newCycle = {
      startDate,
      endDate: null,
      length: null
    };
    
    setCycles([...cycles, newCycle]);
    setCurrentCycle(newCycle);
    
    // Initialize days for the period
    const newDayData = { ...dayData };
    for (let i = 0; i < periodLength; i++) {
      const date = addDays(startDate, i);
      const dateStr = format(date, "yyyy-MM-dd");
      newDayData[dateStr] = {
        date,
        phase: "menstruation",
        isPeriod: true,
        isFertile: false,
        isOvulation: false,
        symptoms: [],
        notes: ""
      };
    }
    
    // Add ovulation day
    const ovulationDay = addDays(startDate, cycleLength - lutealPhaseLength);
    const ovulationDateStr = format(ovulationDay, "yyyy-MM-dd");
    newDayData[ovulationDateStr] = {
      date: ovulationDay,
      phase: "ovulation",
      isPeriod: false,
      isFertile: true,
      isOvulation: true,
      symptoms: [],
      notes: ""
    };
    
    // Add fertile window
    if (fertileWindow) {
      fertileWindow.forEach(date => {
        const dateStr = format(date, "yyyy-MM-dd");
        if (!newDayData[dateStr]) {
          newDayData[dateStr] = {
            date,
            phase: date.getTime() === ovulationDay.getTime() ? "ovulation" : "follicular",
            isPeriod: false,
            isFertile: true,
            isOvulation: date.getTime() === ovulationDay.getTime(),
            symptoms: [],
            notes: ""
          };
        } else {
          newDayData[dateStr].isFertile = true;
        }
      });
    }
    
    setDayData(newDayData);
  };

  // End the current cycle
  const endCurrentCycle = (endDate: Date) => {
    if (!currentCycle) return;
    
    const length = differenceInDays(endDate, currentCycle.startDate) + 1;
    
    const updatedCycle = {
      ...currentCycle,
      endDate,
      length
    };
    
    const updatedCycles = cycles.map(cycle => 
      cycle.startDate.getTime() === currentCycle.startDate.getTime() ? updatedCycle : cycle
    );
    
    setCycles(updatedCycles);
    setCurrentCycle(null);
    
    // If the cycle length has changed from the expected, update it
    if (Math.abs(length - cycleLength) <= 7) {
      setCycleLengthState(length);
    }
  };

  // Set cycle length
  const setCycleLength = (length: number) => {
    setCycleLengthState(length);
  };

  // Set period length
  const setPeriodLength = (length: number) => {
    setPeriodLengthState(length);
  };

  // Add a symptom to a specific date
  const addSymptom = (date: Date, symptom: string) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const existingData = dayData[dateStr] || getDayInfo(date);
    
    if (!existingData) return;
    
    if (!existingData.symptoms.includes(symptom)) {
      const updatedData = {
        ...existingData,
        symptoms: [...existingData.symptoms, symptom]
      };
      
      setDayData({
        ...dayData,
        [dateStr]: updatedData
      });
    }
  };

  // Remove a symptom from a specific date
  const removeSymptom = (date: Date, symptom: string) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const existingData = dayData[dateStr];
    
    if (!existingData) return;
    
    const updatedData = {
      ...existingData,
      symptoms: existingData.symptoms.filter(s => s !== symptom)
    };
    
    setDayData({
      ...dayData,
      [dateStr]: updatedData
    });
  };

  // Add a note to a specific date
  const addNote = (date: Date, note: string) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const existingData = dayData[dateStr] || getDayInfo(date);
    
    if (!existingData) return;
    
    const updatedData = {
      ...existingData,
      notes: note
    };
    
    setDayData({
      ...dayData,
      [dateStr]: updatedData
    });
  };

  // Context value
  const value: CycleContextType = {
    cycles,
    currentCycle,
    cycleLength,
    periodLength,
    lutealPhaseLength,
    nextPeriodDate,
    ovulationDate,
    dayData,
    fertileWindow,
    
    // Methods
    addCycle,
    endCurrentCycle,
    setCycleLength,
    setPeriodLength,
    addSymptom,
    removeSymptom,
    addNote,
    getDayInfo,
    getCurrentPhase
  };

  return <CycleContext.Provider value={value}>{children}</CycleContext.Provider>;
};

// Custom hook to use the context
export const useCycle = () => {
  const context = useContext(CycleContext);
  if (context === undefined) {
    throw new Error("useCycle must be used within a CycleProvider");
  }
  return context;
};
