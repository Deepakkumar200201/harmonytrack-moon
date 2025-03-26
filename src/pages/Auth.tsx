
import React from "react";
import AuthForm from "@/components/auth/AuthForm";

const Auth = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-8 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Welcome to HarmonyTrack
        </h1>
        
        <div className="glass-card p-6">
          <AuthForm />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Your health data is private and secure.</p>
          <p className="mt-2">We use encryption to protect your sensitive information.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
