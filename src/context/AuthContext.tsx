
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulating an API call
      // In a real app, this would be a call to your authentication service
      if (email && password) {
        // Check if user exists in localStorage
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const foundUser = users.find((u: any) => u.email === email && u.password === password);
          
          if (foundUser) {
            const authenticatedUser = {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email
            };
            setUser(authenticatedUser);
            localStorage.setItem("user", JSON.stringify(authenticatedUser));
            toast.success("Logged in successfully!");
            return;
          }
        }
        throw new Error("Invalid email or password");
      }
      throw new Error("Email and password are required");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred during login");
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulating an API call
      // In a real app, this would be a call to your authentication service
      if (name && email && password) {
        // Check if user already exists
        const storedUsers = localStorage.getItem("users");
        let users = [];
        if (storedUsers) {
          users = JSON.parse(storedUsers);
          if (users.some((u: any) => u.email === email)) {
            throw new Error("Email already in use");
          }
        }
        
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password, // In a real app, never store raw passwords
          bookings: []
        };
        
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        
        const authenticatedUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        };
        
        setUser(authenticatedUser);
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
        toast.success("Account created successfully!");
      } else {
        throw new Error("All fields are required");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred during signup");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
