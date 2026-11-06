import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest, clearToken, getStoredToken, storeToken } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      if (!getStoredToken()) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await apiRequest("/auth/me");
        setUser(data.user);
      } catch {
        clearToken();
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login(email, password) {
    const data = await apiRequest("/auth/login", { method: "POST", body: { email, password } });
    storeToken(data.token);
    setUser(data.user);
    return data.user;
  }

  async function signup(details) {
    const data = await apiRequest("/auth/signup", { method: "POST", body: details });
    storeToken(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
