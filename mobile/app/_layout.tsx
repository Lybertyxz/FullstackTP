import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

const RootLayout: React.FC = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
