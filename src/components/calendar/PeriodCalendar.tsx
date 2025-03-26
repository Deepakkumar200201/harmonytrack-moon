
import React, { useState } from "react";
import { useCycle } from "@/context/CycleContext";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  getDay 
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PeriodCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const { 
    getDayInfo, 
    addSymptom, 
    removeSymptom, 
    addNote
  } = useCycle();
  
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={prevMonth} 
          className="p-2 rounded-full hover:bg-cycle-pink-50 transition-colors duration-200"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button 
          onClick={nextMonth} 
          className="p-2 rounded-full hover:bg-cycle-pink-50 transition-colors duration-200"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    );
  };
  
  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day, index) => (
          <div 
            key={index} 
            className="text-center text-sm font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = monthStart;
    const endDate = monthEnd;
    
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
    
    // Calculate empty cells at the beginning
    const startWeekday = getDay(startDate);
    const emptyStartCells = Array.from({ length: startWeekday }, (_, i) => i);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells at the beginning */}
        {emptyStartCells.map((_, index) => (
          <div key={`empty-start-${index}`} className="h-14 md:h-20"></div>
        ))}
        
        {/* Days in month */}
        {daysInMonth.map((day) => {
          const dayInfo = getDayInfo(day);
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          
          let cellClasses = "relative h-14 md:h-20 rounded-lg flex flex-col justify-start items-center p-1 transition-all duration-200";
          let dateClasses = "h-6 w-6 md:h-8 md:w-8 flex items-center justify-center text-sm";
          
          if (isSelected) {
            cellClasses += " border-2 border-cycle-pink-400 bg-cycle-pink-50";
            dateClasses += " font-medium";
          } else if (isToday) {
            cellClasses += " border border-cycle-pink-300";
          } else {
            cellClasses += " hover:bg-cycle-pink-50";
          }
          
          return (
            <div 
              key={day.toString()} 
              className={cellClasses}
              onClick={() => onDateClick(day)}
            >
              <div className={dateClasses}>
                {format(day, "d")}
              </div>
              
              {/* Day indicators */}
              {dayInfo && (
                <div className="flex space-x-0.5 mt-1">
                  {dayInfo.isPeriod && (
                    <div className="h-2 w-2 bg-cycle-pink-500 rounded-full"></div>
                  )}
                  {dayInfo.isFertile && !dayInfo.isOvulation && (
                    <div className="h-2 w-2 bg-cycle-purple-300 rounded-full"></div>
                  )}
                  {dayInfo.isOvulation && (
                    <div className="h-2 w-2 bg-cycle-purple-500 rounded-full"></div>
                  )}
                  {dayInfo.symptoms.length > 0 && (
                    <div className="h-2 w-2 bg-cycle-blue-400 rounded-full"></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderSelectedDateInfo = () => {
    const dayInfo = getDayInfo(selectedDate);
    
    if (!dayInfo) return null;
    
    return (
      <div className="mt-6 bg-white rounded-xl border border-cycle-pink-100 p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </h3>
        
        <div className="space-y-3">
          {/* Cycle phase */}
          {dayInfo.phase && (
            <div>
              <span className="text-sm text-gray-600 block mb-1">Cycle phase:</span>
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${
                  dayInfo.phase === "menstruation" ? "bg-cycle-pink-500" :
                  dayInfo.phase === "follicular" ? "bg-cycle-lavender-400" :
                  dayInfo.phase === "ovulation" ? "bg-cycle-purple-500" :
                  "bg-cycle-blue-400"
                }`}></div>
                <span className="text-gray-800">
                  {dayInfo.phase === "menstruation" ? "Menstruation" :
                   dayInfo.phase === "follicular" ? "Follicular" :
                   dayInfo.phase === "ovulation" ? "Ovulation" :
                   dayInfo.phase === "luteal" ? "Luteal" : "Unknown"}
                </span>
              </div>
            </div>
          )}
          
          {/* Fertility */}
          <div>
            <span className="text-sm text-gray-600 block mb-1">Fertility:</span>
            <span className="text-gray-800">
              {dayInfo.isOvulation ? "Peak fertility" :
               dayInfo.isFertile ? "Fertile window" : "Low fertility"}
            </span>
          </div>
          
          {/* Symptoms */}
          <div>
            <span className="text-sm text-gray-600 block mb-1">Symptoms:</span>
            {dayInfo.symptoms.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {dayInfo.symptoms.map((symptom, index) => (
                  <div 
                    key={index} 
                    className="bg-cycle-blue-50 text-cycle-blue-700 rounded-full px-2 py-0.5 text-xs"
                  >
                    {symptom}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 text-sm">No symptoms recorded</span>
            )}
          </div>
          
          {/* Notes */}
          <div>
            <span className="text-sm text-gray-600 block mb-1">Notes:</span>
            {dayInfo.notes ? (
              <p className="text-gray-800 text-sm">{dayInfo.notes}</p>
            ) : (
              <span className="text-gray-500 text-sm">No notes recorded</span>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="btn-cycle-outline text-sm py-1.5">
            Log Symptoms
          </button>
          <button className="btn-cycle text-sm py-1.5">
            Add Note
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="glass-card p-6">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderSelectedDateInfo()}
    </div>
  );
};

export default PeriodCalendar;
