
import React from "react";
import { useCycle } from "@/context/CycleContext";
import { addDays, format, isSameDay } from "date-fns";
import { getRelativeDateDescription } from "@/utils/dateUtils";

const CycleVisualizer = () => {
  const { 
    currentCycle, 
    cycleLength, 
    periodLength, 
    nextPeriodDate, 
    ovulationDate,
    getCurrentPhase
  } = useCycle();
  
  const today = new Date();
  const currentPhase = getCurrentPhase();
  
  // Calculate progress in current cycle
  const calculateProgress = () => {
    if (!currentCycle) return 0;
    
    const daysPassed = Math.min(
      Math.max(0, Math.floor((today.getTime() - currentCycle.startDate.getTime()) / (1000 * 60 * 60 * 24))),
      cycleLength
    );
    
    return (daysPassed / cycleLength) * 100;
  };
  
  const cycleProgress = calculateProgress();
  
  const getPhaseColor = (phase: string | null) => {
    switch (phase) {
      case "menstruation":
        return "bg-cycle-pink-500";
      case "follicular":
        return "bg-cycle-lavender-400";
      case "ovulation":
        return "bg-cycle-purple-500";
      case "luteal":
        return "bg-cycle-blue-400";
      default:
        return "bg-gray-300";
    }
  };
  
  const getPhaseTitle = (phase: string | null) => {
    switch (phase) {
      case "menstruation":
        return "Menstrual Phase";
      case "follicular":
        return "Follicular Phase";
      case "ovulation":
        return "Ovulation Phase";
      case "luteal":
        return "Luteal Phase";
      default:
        return "Unknown Phase";
    }
  };
  
  const getPhaseDescription = (phase: string | null) => {
    switch (phase) {
      case "menstruation":
        return "Period time. Your body is shedding the uterine lining.";
      case "follicular":
        return "Your body is preparing to release an egg. Energy levels typically rise.";
      case "ovulation":
        return "Egg release day. This is your most fertile time.";
      case "luteal":
        return "Post-ovulation phase. Your body prepares for potential pregnancy.";
      default:
        return "Tracking will help predict your cycle phases.";
    }
  };
  
  if (!currentCycle) {
    return (
      <div className="cycle-card bg-gradient-to-r from-white to-cycle-pink-50 text-center p-8">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Start Tracking Your Cycle</h3>
        <p className="text-gray-600 mb-6">
          Record your period start date to see your cycle visualization and predictions.
        </p>
        <button className="btn-cycle">
          Record Period
        </button>
      </div>
    );
  }
  
  // Generate phase sections for the cycle timeline
  const generatePhaseSections = () => {
    if (!currentCycle) return [];
    
    const totalDays = cycleLength;
    const sections = [
      { 
        phase: "menstruation", 
        width: (periodLength / totalDays) * 100,
        start: currentCycle.startDate,
        end: addDays(currentCycle.startDate, periodLength - 1)
      },
      { 
        phase: "follicular", 
        width: ((cycleLength - periodLength - 17) / totalDays) * 100,
        start: addDays(currentCycle.startDate, periodLength),
        end: addDays(currentCycle.startDate, cycleLength - 15)
      },
      { 
        phase: "ovulation", 
        width: (3 / totalDays) * 100,
        start: addDays(currentCycle.startDate, cycleLength - 14),
        end: addDays(currentCycle.startDate, cycleLength - 12)
      },
      { 
        phase: "luteal", 
        width: (14 / totalDays) * 100,
        start: addDays(currentCycle.startDate, cycleLength - 11),
        end: addDays(currentCycle.startDate, cycleLength - 1)
      }
    ];
    
    return sections;
  };
  
  const phaseSections = generatePhaseSections();
  
  return (
    <div className="glass-card overflow-hidden transition-all duration-500 hover:shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Cycle</h2>
        
        {/* Current phase info */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`h-3 w-3 rounded-full ${getPhaseColor(currentPhase)}`}></div>
            <h3 className="font-medium text-gray-800">{getPhaseTitle(currentPhase)}</h3>
          </div>
          <p className="text-sm text-gray-600 ml-6">
            {getPhaseDescription(currentPhase)}
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="h-5 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-cycle-pink-400 to-cycle-pink-500 rounded-full"
            style={{ width: `${cycleProgress}%` }}
          ></div>
        </div>
        
        {/* Phase timeline */}
        <div className="flex w-full h-3 rounded-full overflow-hidden mb-4">
          {phaseSections.map((section, index) => (
            <div 
              key={index}
              className={`${getPhaseColor(section.phase)}`}
              style={{ width: `${section.width}%` }}
            ></div>
          ))}
        </div>
        
        {/* Phase labels */}
        <div className="flex text-xs text-gray-500 mb-6">
          <div style={{ width: `${phaseSections[0].width}%` }}>
            Period
          </div>
          <div style={{ width: `${phaseSections[1].width}%` }}>
            Follicular
          </div>
          <div style={{ width: `${phaseSections[2].width}%` }} className="text-center">
            Ovulation
          </div>
          <div style={{ width: `${phaseSections[3].width}%` }} className="text-right">
            Luteal
          </div>
        </div>
        
        {/* Key dates */}
        <div className="grid grid-cols-2 gap-4">
          {ovulationDate && (
            <div className="bg-cycle-purple-50 rounded-lg p-3">
              <span className="text-xs font-medium text-cycle-purple-600 block mb-1">Ovulation Day</span>
              <div className="flex justify-between">
                <span className="text-sm text-gray-800">
                  {format(ovulationDate, "MMM d")}
                </span>
                <span className="text-xs text-gray-500">
                  {getRelativeDateDescription(ovulationDate)}
                </span>
              </div>
            </div>
          )}
          
          {nextPeriodDate && (
            <div className="bg-cycle-pink-50 rounded-lg p-3">
              <span className="text-xs font-medium text-cycle-pink-600 block mb-1">Next Period</span>
              <div className="flex justify-between">
                <span className="text-sm text-gray-800">
                  {format(nextPeriodDate, "MMM d")}
                </span>
                <span className="text-xs text-gray-500">
                  {getRelativeDateDescription(nextPeriodDate)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Cycle stats */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 mb-1">Cycle Length</div>
            <div className="text-lg font-medium text-gray-800">{cycleLength} days</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Period Length</div>
            <div className="text-lg font-medium text-gray-800">{periodLength} days</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Luteal Phase</div>
            <div className="text-lg font-medium text-gray-800">14 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleVisualizer;
