import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { postLogin } from "../services/authService";
import type { ILoginData } from "../types/auth";
type User = { username: string };
type AuthState = {
  user: User | null;
  token: string | null;
};

type AuthContextType = AuthState & {
  login: (loginData: ILoginData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("username");
    if (t && u) {
      setToken(t);
      setUser({ username: u });
    }
  }, []);

  const login = async ({ username, password }: ILoginData) => {
    const res = await postLogin({ username, password });
    if (!res.success) throw new Error("Login failed");
    const token = res.data ? res.data : "null";
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setToken(token);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};