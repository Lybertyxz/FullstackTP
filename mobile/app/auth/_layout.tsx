import React from "react";
import { View, Text } from "react-native";
import { Slot } from "expo-router";

const AuthLayout = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text style={{ textAlign: "center", padding: 16 }}>Auth Header</Text>
      <Slot />
      <Text style={{ textAlign: "center", padding: 16 }}>Auth Footer</Text>
    </View>
  );
};

export default AuthLayout;
