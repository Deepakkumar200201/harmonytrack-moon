
import React from "react";
import CycleInsights from "@/components/insights/CycleInsights";

const Insights = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Insights & Analysis</h1>
      
      <CycleInsights />
      
      <div className="mt-8 glass-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Interpreting Your Data</h2>
        
        <p className="text-gray-700 mb-6">
          The more you track, the more accurate your insights become. Here's how to make the most of your data:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-2">Cycle Variations</h3>
            <p className="text-sm text-gray-600">
              Variations of a few days between cycles are completely normal. However, consistent 
              irregularity beyond 7-10 days might warrant a conversation with your healthcare provider.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-2">Symptom Patterns</h3>
            <p className="text-sm text-gray-600">
              Notice which symptoms occur at specific phases of your cycle. Many women experience 
              mood changes, energy fluctuations, and physical symptoms at predictable times.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-2">Lifestyle Impact</h3>
            <p className="text-sm text-gray-600">
              Consider how your lifestyle choices (sleep, exercise, diet, stress) might affect your cycle. 
              Tracking allows you to identify these connections and make informed adjustments.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-2">Health Changes</h3>
            <p className="text-sm text-gray-600">
              Significant changes in cycle length, flow, or symptoms could indicate health changes. 
              Your tracking history provides valuable information for healthcare conversations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
