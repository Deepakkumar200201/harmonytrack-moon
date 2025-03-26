
import React from "react";
import HealthArticles from "@/components/education/HealthArticles";

const Education = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Health Education</h1>
      
      <HealthArticles />
      
      <div className="mt-8 glass-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Recommended Books</h3>
            <ul className="space-y-3">
              <li className="flex space-x-3">
                <div className="h-6 w-6 rounded-full bg-cycle-pink-100 text-cycle-pink-600 flex items-center justify-center flex-shrink-0 text-sm">1</div>
                <div>
                  <p className="text-gray-800 font-medium">Period Power</p>
                  <p className="text-sm text-gray-600">by Maisie Hill</p>
                </div>
              </li>
              <li className="flex space-x-3">
                <div className="h-6 w-6 rounded-full bg-cycle-pink-100 text-cycle-pink-600 flex items-center justify-center flex-shrink-0 text-sm">2</div>
                <div>
                  <p className="text-gray-800 font-medium">Taking Charge of Your Fertility</p>
                  <p className="text-sm text-gray-600">by Toni Weschler</p>
                </div>
              </li>
              <li className="flex space-x-3">
                <div className="h-6 w-6 rounded-full bg-cycle-pink-100 text-cycle-pink-600 flex items-center justify-center flex-shrink-0 text-sm">3</div>
                <div>
                  <p className="text-gray-800 font-medium">WomanCode</p>
                  <p className="text-sm text-gray-600">by Alisa Vitti</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Trusted Websites</h3>
            <ul className="space-y-3">
              <li className="flex space-x-3">
                <div className="h-6 w-6 rounded-full bg-cycle-purple-100 text-cycle-purple-600 flex items-center justify-center flex-shrink-0 text-sm">1</div>
                <div>
                  <p className="text-gray-800 font-medium">The American College of Obstetricians and Gynecologists</p>
                  <p className="text-sm text-gray-600">acog.org</p>
                </div>
              </li>
              <li className="flex space-x-3">
                <div className="h-6 w-6 rounded-full bg-cycle-purple-100 text-cycle-purple-600 flex items-center justify-center flex-shrink-0 text-sm">2</div>
                <div>
                  <p className="text-gray-800 font-medium">Office on Women's Health</p>
                  <p className="text-sm text-gray-600">womenshealth.gov</p>
                </div>
              </li>
              <li className="flex space-x-3">
                <div className="h-6 w-6 rounded-full bg-cycle-purple-100 text-cycle-purple-600 flex items-center justify-center flex-shrink-0 text-sm">3</div>
                <div>
                  <p className="text-gray-800 font-medium">Mayo Clinic</p>
                  <p className="text-sm text-gray-600">mayoclinic.org</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-cycle-pink-50 to-cycle-lavender-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> While we provide educational resources, this app is not a substitute for 
            professional medical advice. Always consult with a healthcare provider for medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
