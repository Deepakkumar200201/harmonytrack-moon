
import { format, addDays, subDays, differenceInDays, isWithinInterval, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

// Format date as "MMM dd" (e.g., "Jan 01")
export const formatShortDate = (date: Date): string => {
  return format(date, "MMM dd");
};

// Format date as "MMMM d, yyyy" (e.g., "January 1, 2023")
export const formatLongDate = (date: Date): string => {
  return format(date, "MMMM d, yyyy");
};

// Format date as "EEE" (e.g., "Mon")
export const formatDayName = (date: Date): string => {
  return format(date, "EEE");
};

// Format date as "MMMM yyyy" (e.g., "January 2023")
export const formatMonthYear = (date: Date): string => {
  return format(date, "MMMM yyyy");
};

// Check if a date falls within a range
export const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return isWithinInterval(date, { start: startDate, end: endDate });
};

// Check if a date is today
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

// Get all days of a month
export const getDaysInMonth = (date: Date): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
};

// Get days around a specific date (for creating weekly views)
export const getDaysAroundDate = (date: Date, daysBefore: number, daysAfter: number): Date[] => {
  const start = subDays(date, daysBefore);
  const end = addDays(date, daysAfter);
  return eachDayOfInterval({ start, end });
};

// Get days of the current week
export const getCurrentWeekDays = (): Date[] => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = subDays(today, dayOfWeek);
  return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));
};

// Get relative date description
export const getRelativeDateDescription = (date: Date): string => {
  const today = new Date();
  const days = differenceInDays(date, today);
  
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  
  if (days > 1 && days < 7) return `In ${days} days`;
  if (days < 0 && days > -7) return `${Math.abs(days)} days ago`;
  
  return formatShortDate(date);
};

// Get a range of dates
export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  return eachDayOfInterval({ start: startDate, end: endDate });
};

// Group dates by month for calendar view
export const groupDatesByMonth = (dates: Date[]): Record<string, Date[]> => {
  return dates.reduce((acc, date) => {
    const monthKey = format(date, "yyyy-MM");
    
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    
    acc[monthKey].push(date);
    return acc;
  }, {} as Record<string, Date[]>);
};
