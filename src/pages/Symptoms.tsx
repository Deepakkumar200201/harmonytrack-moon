
import React from "react";
import SymptomTracker from "@/components/symptoms/SymptomTracker";

const Symptoms = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Symptom Tracker</h1>
      
      <SymptomTracker />
      
      <div className="mt-8 glass-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Track Symptoms?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Identify Patterns</h3>
            <p className="text-sm text-gray-600">
              Regular tracking helps you recognize how your symptoms relate to different phases of your cycle.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Prepare & Manage</h3>
            <p className="text-sm text-gray-600">
              Knowing when certain symptoms are likely to occur allows you to prepare and manage them more effectively.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Health Insights</h3>
            <p className="text-sm text-gray-600">
              Unusual patterns or severe symptoms could indicate health issues that should be discussed with a healthcare provider.
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-cycle-pink-50 rounded-lg border border-cycle-pink-100">
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> Try to log your symptoms daily for the most accurate tracking. Even noting the absence of symptoms provides valuable data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
