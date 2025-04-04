import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URLS } from "../api";
import { AuthContextType, AuthUser } from "./types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token");
    const storedUser = sessionStorage.getItem("user");
    const storedRole = sessionStorage.getItem("role");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch(API_URLS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    const { access, user } = data;

    setToken(access);
    setUser(user);
    setRole(user.role);

    sessionStorage.setItem("access_token", access);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("role", user.role);

    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
