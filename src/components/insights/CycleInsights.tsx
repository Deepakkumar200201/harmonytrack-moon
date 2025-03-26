
import React from "react";
import { useCycle } from "@/context/CycleContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatShortDate } from "@/utils/dateUtils";
import { differenceInDays } from "date-fns";
import { BarChart3, TrendingUp, Calendar, Clock, Droplet } from "lucide-react";

const CycleInsights = () => {
  const { 
    cycles, 
    currentCycle, 
    cycleLength, 
    periodLength,
    nextPeriodDate
  } = useCycle();
  
  // Generate mock data for the charts
  const generateCycleLengthData = () => {
    // Start with actual cycle lengths if available
    const cycleLengthData = cycles
      .filter(cycle => cycle.length !== null)
      .map(cycle => ({
        name: formatShortDate(cycle.startDate),
        length: cycle.length
      }));
    
    // If we have fewer than 6 cycles, add mock data
    if (cycleLengthData.length < 6) {
      const mockLengths = [28, 29, 27, 28, 30, 28];
      const additionalCycles = 6 - cycleLengthData.length;
      
      for (let i = 0; i < additionalCycles; i++) {
        cycleLengthData.push({
          name: `Cycle ${i + 1}`,
          length: mockLengths[i]
        });
      }
    }
    
    return cycleLengthData;
  };
  
  const generatePeriodLengthData = () => {
    // Mock period length data
    return [
      { name: "Jan", length: 5 },
      { name: "Feb", length: 6 },
      { name: "Mar", length: 5 },
      { name: "Apr", length: 5 },
      { name: "May", length: 4 },
      { name: "Jun", length: 5 }
    ];
  };
  
  const cycleLengthData = generateCycleLengthData();
  const periodLengthData = generatePeriodLengthData();
  
  // Calculate cycle regularity (simplified)
  const calculateRegularity = () => {
    // Compare the variance in cycle lengths
    // For demo, we'll just return a mock value
    return 85; // 85% regular
  };
  
  const calculateDaysUntilPeriod = () => {
    if (!nextPeriodDate) return null;
    
    const today = new Date();
    const days = differenceInDays(nextPeriodDate, today);
    
    return days >= 0 ? days : null;
  };
  
  const daysUntilPeriod = calculateDaysUntilPeriod();
  const cycleRegularity = calculateRegularity();
  
  const getTooltipContent = (payload: any, label: string, key: string) => {
    if (payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow-md border border-gray-200">
          <p className="text-xs text-gray-600">{`${label}`}</p>
          <p className="text-sm font-medium">{`${payload[0].value} days`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Calendar size={16} className="text-cycle-pink-500" />
            <span className="text-sm text-gray-600">Average Cycle</span>
          </div>
          <p className="text-2xl font-medium text-gray-900">{cycleLength} days</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Droplet size={16} className="text-cycle-pink-500" />
            <span className="text-sm text-gray-600">Average Period</span>
          </div>
          <p className="text-2xl font-medium text-gray-900">{periodLength} days</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp size={16} className="text-cycle-pink-500" />
            <span className="text-sm text-gray-600">Regularity</span>
          </div>
          <p className="text-2xl font-medium text-gray-900">{cycleRegularity}%</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Clock size={16} className="text-cycle-pink-500" />
            <span className="text-sm text-gray-600">Next Period In</span>
          </div>
          <p className="text-2xl font-medium text-gray-900">
            {daysUntilPeriod !== null ? `${daysUntilPeriod} days` : "—"}
          </p>
        </div>
      </div>
      
      {/* Cycle length chart */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 size={20} className="text-cycle-pink-500" />
          <h2 className="text-xl font-semibold text-gray-900">Cycle Length History</h2>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={cycleLengthData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis 
                domain={[20, 35]}
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <Tooltip 
                content={({ payload, label }) => getTooltipContent(payload, label, "length")} 
              />
              <Bar dataKey="length" fill="#ff357c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          Your cycles have been relatively consistent over the past 6 months, 
          with an average length of {cycleLength} days.
        </p>
      </div>
      
      {/* Period length chart */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 size={20} className="text-cycle-pink-500" />
          <h2 className="text-xl font-semibold text-gray-900">Period Length History</h2>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={periodLengthData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 10]}
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <Tooltip 
                content={({ payload, label }) => getTooltipContent(payload, label, "length")} 
              />
              <Bar dataKey="length" fill="#a978fc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          Your periods typically last {periodLength} days, which is within the normal range.
        </p>
      </div>
      
      {/* Insight cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 border-l-4 border-cycle-pink-400">
          <h3 className="font-medium text-gray-900 mb-2">Cycle Regularity</h3>
          <p className="text-sm text-gray-600">
            Your cycles are {cycleRegularity >= 80 ? "very regular" : "somewhat regular"}. 
            Regular cycles indicate healthy hormone balance and make predictions more accurate.
          </p>
        </div>
        
        <div className="glass-card p-6 border-l-4 border-cycle-purple-400">
          <h3 className="font-medium text-gray-900 mb-2">Symptom Pattern</h3>
          <p className="text-sm text-gray-600">
            You commonly experience headaches during the luteal phase. 
            This is common and related to progesterone levels after ovulation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CycleInsights;
