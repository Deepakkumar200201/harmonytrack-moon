
import React from "react";
import { useCycle } from "@/context/CycleContext";
import CycleVisualizer from "@/components/dashboard/CycleVisualizer";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { Link } from "react-router-dom";
import { BarChart3, Calendar, Droplet, BookOpen } from "lucide-react";

const Dashboard = () => {
  const { currentCycle } = useCycle();
  
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CycleVisualizer />
        </div>
        
        <div>
          <UpcomingEvents />
        </div>
      </div>
      
      {/* Quick access cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Link to="/calendar" className="glass-card p-5 hover:shadow-md transition-shadow duration-300 hover-scale">
          <div className="cycle-icon-bg w-10 h-10 flex items-center justify-center mb-3">
            <Calendar size={20} />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Calendar</h3>
          <p className="text-sm text-gray-600">View and log your cycle data</p>
        </Link>
        
        <Link to="/symptoms" className="glass-card p-5 hover:shadow-md transition-shadow duration-300 hover-scale">
          <div className="cycle-icon-bg w-10 h-10 flex items-center justify-center mb-3">
            <Droplet size={20} />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Symptoms</h3>
          <p className="text-sm text-gray-600">Track symptoms and mood changes</p>
        </Link>
        
        <Link to="/insights" className="glass-card p-5 hover:shadow-md transition-shadow duration-300 hover-scale">
          <div className="cycle-icon-bg w-10 h-10 flex items-center justify-center mb-3">
            <BarChart3 size={20} />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Insights</h3>
          <p className="text-sm text-gray-600">Discover patterns and trends</p>
        </Link>
        
        <Link to="/education" className="glass-card p-5 hover:shadow-md transition-shadow duration-300 hover-scale">
          <div className="cycle-icon-bg w-10 h-10 flex items-center justify-center mb-3">
            <BookOpen size={20} />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Education</h3>
          <p className="text-sm text-gray-600">Learn about menstrual health</p>
        </Link>
      </div>
      
      {/* Tips and info section */}
      <div className="mt-8 glass-card p-6 bg-gradient-to-r from-white to-cycle-pink-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Did You Know?</h2>
        <p className="text-gray-700 mb-6">
          Tracking your cycle can help predict not just your period and fertility, but also energy levels, 
          mood changes, and even the best times for different types of exercise.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-cycle-pink-100">
            <h3 className="font-medium text-gray-900 mb-2">Follicular Phase</h3>
            <p className="text-sm text-gray-600">
              Rising estrogen increases energy levels. Great time for trying new workouts or high-intensity activities.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-cycle-pink-100">
            <h3 className="font-medium text-gray-900 mb-2">Ovulation</h3>
            <p className="text-sm text-gray-600">
              Peak energy and confidence. Ideal for challenging activities, social events, and important presentations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-cycle-pink-100">
            <h3 className="font-medium text-gray-900 mb-2">Luteal Phase</h3>
            <p className="text-sm text-gray-600">
              Energy decreases as progesterone rises. Focus on yoga, stretching, and relaxing activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
