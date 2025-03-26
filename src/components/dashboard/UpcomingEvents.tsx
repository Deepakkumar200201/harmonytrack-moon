
import React from "react";
import { useCycle } from "@/context/CycleContext";
import { formatShortDate, getRelativeDateDescription } from "@/utils/dateUtils";
import { CalendarDays, Droplet, Heart, Moon } from "lucide-react";

const UpcomingEvents = () => {
  const { 
    nextPeriodDate, 
    ovulationDate, 
    currentCycle,
    dayData
  } = useCycle();
  
  if (!currentCycle || !nextPeriodDate || !ovulationDate) {
    return null;
  }
  
  // Create events list
  const events = [
    {
      date: nextPeriodDate,
      title: "Next Period",
      description: "Your next period is expected to start",
      icon: <Droplet size={18} className="text-cycle-pink-500" />,
      badge: "cycle-badge-pink"
    },
    {
      date: ovulationDate,
      title: "Ovulation Day",
      description: "Peak fertility day",
      icon: <Heart size={18} className="text-cycle-purple-500" />,
      badge: "cycle-badge-purple"
    }
  ];
  
  // Sort events by date
  const sortedEvents = events.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Get only upcoming events (today or later)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = sortedEvents.filter(event => event.date >= today);
  
  if (upcomingEvents.length === 0) {
    return null;
  }
  
  return (
    <div className="glass-card">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-5">
          <CalendarDays size={20} className="text-cycle-pink-500" />
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
        </div>
        
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow duration-300"
            >
              <div className="cycle-icon-bg mt-0.5">
                {event.icon}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-800">{event.title}</h3>
                  <div className={event.badge}>
                    {getRelativeDateDescription(event.date)}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-xs text-gray-500 mt-1">{formatShortDate(event.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
