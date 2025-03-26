
import React, { useState } from "react";
import { useCycle } from "@/context/CycleContext";
import { 
  format, 
  subDays, 
  addDays,
  isSameDay
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Save, X } from "lucide-react";

const symptoms = [
  { id: "cramps", label: "Cramps", icon: "💫", category: "physical" },
  { id: "headache", label: "Headache", icon: "🤕", category: "physical" },
  { id: "tender_breasts", label: "Tender Breasts", icon: "💞", category: "physical" },
  { id: "bloating", label: "Bloating", icon: "🫨", category: "physical" },
  { id: "backache", label: "Backache", icon: "⚡", category: "physical" },
  { id: "acne", label: "Acne", icon: "👩‍🦱", category: "physical" },
  { id: "nausea", label: "Nausea", icon: "🤢", category: "physical" },
  { id: "fatigue", label: "Fatigue", icon: "😴", category: "physical" },
  { id: "happy", label: "Happy", icon: "😊", category: "mood" },
  { id: "sad", label: "Sad", icon: "😢", category: "mood" },
  { id: "anxious", label: "Anxious", icon: "😰", category: "mood" },
  { id: "irritable", label: "Irritable", icon: "😤", category: "mood" },
  { id: "mood_swings", label: "Mood Swings", icon: "🎭", category: "mood" },
  { id: "low_libido", label: "Low Libido", icon: "💙", category: "mood" },
  { id: "high_libido", label: "High Libido", icon: "❤️", category: "mood" },
  { id: "spotting", label: "Spotting", icon: "🩸", category: "flow" },
  { id: "light_flow", label: "Light Flow", icon: "💧", category: "flow" },
  { id: "medium_flow", label: "Medium Flow", icon: "💦", category: "flow" },
  { id: "heavy_flow", label: "Heavy Flow", icon: "🌊", category: "flow" },
  { id: "insomnia", label: "Insomnia", icon: "🌜", category: "sleep" },
  { id: "good_sleep", label: "Good Sleep", icon: "🌛", category: "sleep" }
];

const SymptomTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("physical");
  
  const { getDayInfo, addSymptom, removeSymptom, addNote } = useCycle();
  
  const dayInfo = getDayInfo(selectedDate);
  
  React.useEffect(() => {
    if (dayInfo) {
      setSelectedSymptoms(dayInfo.symptoms || []);
      setNotes(dayInfo.notes || "");
    } else {
      setSelectedSymptoms([]);
      setNotes("");
    }
  }, [selectedDate, dayInfo]);
  
  const goToPreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };
  
  const goToNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };
  
  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(prev => prev.filter(id => id !== symptomId));
      removeSymptom(selectedDate, symptomId);
    } else {
      setSelectedSymptoms(prev => [...prev, symptomId]);
      addSymptom(selectedDate, symptomId);
    }
  };
  
  const saveNotes = () => {
    addNote(selectedDate, notes);
  };
  
  const getPhaseColor = (phase: string | null) => {
    switch (phase) {
      case "menstruation":
        return "text-cycle-pink-600 bg-cycle-pink-50";
      case "follicular":
        return "text-cycle-lavender-600 bg-cycle-lavender-50";
      case "ovulation":
        return "text-cycle-purple-600 bg-cycle-purple-50";
      case "luteal":
        return "text-cycle-blue-600 bg-cycle-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  
  const filteredSymptoms = symptoms.filter(
    symptom => symptom.category === activeCategory
  );
  
  return (
    <div className="glass-card">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Symptom Tracker</h2>
        
        {/* Date navigation */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={goToPreviousDay}
            className="p-2 rounded-full hover:bg-cycle-pink-50 transition-colors duration-200"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900">
              {format(selectedDate, "MMMM d, yyyy")}
            </div>
            {dayInfo?.phase && (
              <div className={`text-sm px-2 py-0.5 rounded inline-block mt-1 ${getPhaseColor(dayInfo.phase)}`}>
                {dayInfo.phase.charAt(0).toUpperCase() + dayInfo.phase.slice(1)} Phase
              </div>
            )}
          </div>
          
          <button 
            onClick={goToNextDay}
            className="p-2 rounded-full hover:bg-cycle-pink-50 transition-colors duration-200"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
        
        {/* Category tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
          {["physical", "mood", "flow", "sleep"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeCategory === category 
                  ? "text-cycle-pink-600 border-b-2 border-cycle-pink-500" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Symptoms grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {filteredSymptoms.map((symptom) => (
            <button
              key={symptom.id}
              className={`flex flex-col items-center px-2 py-3 rounded-lg border transition-all duration-200 ${
                selectedSymptoms.includes(symptom.id)
                  ? "border-cycle-pink-300 bg-cycle-pink-50 shadow-sm"
                  : "border-gray-200 hover:border-cycle-pink-200 hover:bg-gray-50"
              }`}
              onClick={() => toggleSymptom(symptom.id)}
            >
              <span className="text-lg mb-1">{symptom.icon}</span>
              <span className="text-xs text-center">{symptom.label}</span>
            </button>
          ))}
          
          <button
            className="flex flex-col items-center px-2 py-3 rounded-lg border border-dashed border-gray-300 hover:border-cycle-pink-300 hover:bg-gray-50 transition-all duration-200"
          >
            <Plus size={18} className="mb-1 text-gray-500" />
            <span className="text-xs text-center text-gray-500">Custom</span>
          </button>
        </div>
        
        {/* Notes section */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <div className="relative">
            <textarea
              id="notes"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-cycle-pink-500 focus:border-cycle-pink-500 focus:outline-none text-sm"
              placeholder="How are you feeling today?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button
              className="absolute bottom-2 right-2 p-1.5 rounded-full bg-cycle-pink-500 text-white hover:bg-cycle-pink-600 transition-colors duration-200"
              onClick={saveNotes}
            >
              <Save size={16} />
            </button>
          </div>
        </div>
        
        {/* Selected symptoms summary */}
        {selectedSymptoms.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(id => {
                const symptom = symptoms.find(s => s.id === id);
                return symptom ? (
                  <div
                    key={id}
                    className="flex items-center space-x-1 bg-white rounded-full px-2 py-1 text-xs border border-gray-200"
                  >
                    <span>{symptom.icon}</span>
                    <span>{symptom.label}</span>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => toggleSymptom(id)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomTracker;
