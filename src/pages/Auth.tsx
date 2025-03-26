
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Redirect if already logged in
  if (user) {
    // Get the redirect path from location state or default to home
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} />;
  }
  
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
