import React from "react";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "../../context/AuthContext";

const AppLayout: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
};

export default AppLayout;
