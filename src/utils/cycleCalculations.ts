
import { addDays, subDays, differenceInDays } from "date-fns";

// Calculate the next period date based on cycle length
export const calculateNextPeriodDate = (lastPeriodStartDate: Date, cycleLength: number): Date => {
  return addDays(lastPeriodStartDate, cycleLength);
};

// Calculate the ovulation date (typically cycle length - 14 days from the start of the period)
export const calculateOvulationDate = (lastPeriodStartDate: Date, cycleLength: number): Date => {
  return addDays(lastPeriodStartDate, cycleLength - 14);
};

// Calculate the fertile window (typically 5 days before ovulation and the day of ovulation)
export const calculateFertileWindow = (ovulationDate: Date): Date[] => {
  return [
    subDays(ovulationDate, 5),
    subDays(ovulationDate, 4),
    subDays(ovulationDate, 3),
    subDays(ovulationDate, 2),
    subDays(ovulationDate, 1),
    ovulationDate,
  ];
};

// Calculate the menstruation phase dates
export const calculateMenstruationDays = (
  lastPeriodStartDate: Date,
  periodLength: number
): Date[] => {
  return Array.from({ length: periodLength }, (_, i) => addDays(lastPeriodStartDate, i));
};

// Calculate the follicular phase dates (from end of period to ovulation)
export const calculateFollicularDays = (
  lastPeriodStartDate: Date,
  periodLength: number,
  ovulationDate: Date
): Date[] => {
  const startDate = addDays(lastPeriodStartDate, periodLength);
  const endDate = subDays(ovulationDate, 1);
  const dayCount = differenceInDays(endDate, startDate) + 1;
  
  return Array.from({ length: dayCount }, (_, i) => addDays(startDate, i));
};

// Calculate the luteal phase dates (from after ovulation to next period)
export const calculateLutealDays = (
  ovulationDate: Date,
  nextPeriodDate: Date
): Date[] => {
  const startDate = addDays(ovulationDate, 1);
  const endDate = subDays(nextPeriodDate, 1);
  const dayCount = differenceInDays(endDate, startDate) + 1;
  
  return Array.from({ length: dayCount }, (_, i) => addDays(startDate, i));
};

// Calculate cycle phase for a given date
export const getCyclePhaseForDate = (
  date: Date,
  lastPeriodStartDate: Date,
  cycleLength: number,
  periodLength: number
): "menstruation" | "follicular" | "ovulation" | "luteal" | "unknown" => {
  // Calculate key dates
  const nextPeriodDate = calculateNextPeriodDate(lastPeriodStartDate, cycleLength);
  const ovulationDate = calculateOvulationDate(lastPeriodStartDate, cycleLength);
  const periodEndDate = addDays(lastPeriodStartDate, periodLength - 1);
  
  // Check if the date is outside the current cycle
  if (
    date < lastPeriodStartDate ||
    date >= nextPeriodDate
  ) {
    return "unknown";
  }
  
  // Check menstruation phase
  if (date >= lastPeriodStartDate && date <= periodEndDate) {
    return "menstruation";
  }
  
  // Check ovulation day
  if (differenceInDays(date, ovulationDate) === 0) {
    return "ovulation";
  }
  
  // Check follicular phase (after period, before ovulation)
  if (date > periodEndDate && date < ovulationDate) {
    return "follicular";
  }
  
  // Check luteal phase (after ovulation, before next period)
  if (date > ovulationDate && date < nextPeriodDate) {
    return "luteal";
  }
  
  return "unknown";
};

// Calculate average cycle length from historical data
export const calculateAverageCycleLength = (cycleLengths: number[]): number => {
  if (cycleLengths.length === 0) return 28; // Default value
  
  const sum = cycleLengths.reduce((acc, length) => acc + length, 0);
  return Math.round(sum / cycleLengths.length);
};

// Calculate average period length from historical data
export const calculateAveragePeriodLength = (periodLengths: number[]): number => {
  if (periodLengths.length === 0) return 5; // Default value
  
  const sum = periodLengths.reduce((acc, length) => acc + length, 0);
  return Math.round(sum / periodLengths.length);
};

// Calculate cycle regularity score (0-100)
export const calculateCycleRegularityScore = (cycleLengths: number[]): number => {
  if (cycleLengths.length < 3) return 100; // Not enough data
  
  const average = calculateAverageCycleLength(cycleLengths);
  const deviations = cycleLengths.map(length => Math.abs(length - average));
  const averageDeviation = deviations.reduce((acc, dev) => acc + dev, 0) / deviations.length;
  
  // A lower deviation means more regular cycles
  // Scale to 0-100 where 0 is very irregular and 100 is perfectly regular
  const score = Math.max(0, 100 - (averageDeviation * 10));
  
  return Math.round(score);
};

// Convert cycle regularity score to a descriptive string
export const getCycleRegularityDescription = (score: number): string => {
  if (score >= 90) return "Very Regular";
  if (score >= 75) return "Regular";
  if (score >= 60) return "Slightly Irregular";
  if (score >= 40) return "Moderately Irregular";
  return "Irregular";
};

// Calculate days until next period
export const getDaysUntilNextPeriod = (nextPeriodDate: Date): number => {
  return differenceInDays(nextPeriodDate, new Date());
};

// Get descriptive text for days until next period
export const getNextPeriodDescription = (daysUntil: number): string => {
  if (daysUntil === 0) return "Your period is expected today";
  if (daysUntil === 1) return "Your period is expected tomorrow";
  if (daysUntil > 1) return `Your period is expected in ${daysUntil} days`;
  if (daysUntil === -1) return "Your period started yesterday";
  if (daysUntil < -1) return `Your period started ${Math.abs(daysUntil)} days ago`;
  
  return "";
};
