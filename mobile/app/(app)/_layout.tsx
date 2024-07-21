import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Slot, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const AppLayout = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/sign-in");
    }
  }, [user, loading]);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: "center", padding: 16 }}>Header</Text>
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Slot />
      </View>
      <Text style={{ textAlign: "center", padding: 16 }}>Footer</Text>
    </View>
  );
};

export default AppLayout;
