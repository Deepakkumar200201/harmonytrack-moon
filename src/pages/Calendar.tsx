
import React from "react";
import PeriodCalendar from "@/components/calendar/PeriodCalendar";

const Calendar = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Calendar</h1>
      
      <PeriodCalendar />
      
      <div className="mt-8 glass-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Understanding Your Calendar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 bg-cycle-pink-500 rounded-full"></div>
              <p className="text-gray-700">Period days</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 bg-cycle-purple-300 rounded-full"></div>
              <p className="text-gray-700">Fertile window</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 bg-cycle-purple-500 rounded-full"></div>
              <p className="text-gray-700">Ovulation day</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 bg-cycle-blue-400 rounded-full"></div>
              <p className="text-gray-700">Symptoms logged</p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-700 mb-4">
              Your calendar shows your cycle predictions based on your tracking history. Tap on any day to view or add details.
            </p>
            <p className="text-gray-700">
              The more consistently you track, the more accurate your predictions will become over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
