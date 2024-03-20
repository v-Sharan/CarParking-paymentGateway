import React, { useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext({
  userId: "",
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function Provider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
