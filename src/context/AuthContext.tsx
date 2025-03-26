
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (temporary solution)
    const storedUser = localStorage.getItem("harmonytrack_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simplified mock login - in a real app, this would call an API
      const mockUser = { id: crypto.randomUUID(), email };
      setUser(mockUser);
      localStorage.setItem("harmonytrack_user", JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simplified mock registration - in a real app, this would call an API
      const mockUser = { id: crypto.randomUUID(), email };
      setUser(mockUser);
      localStorage.setItem("harmonytrack_user", JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("harmonytrack_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
