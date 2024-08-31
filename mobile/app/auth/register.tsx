// app/(auth)/register.tsx
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import AuthInput from "../../components/AuthInput";
import useEmailPasswordAuth from "../../hooks/useEmailPasswordAuth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { register, loading, error } = useEmailPasswordAuth();

  const handleRegister = async () => {
    await register(email, password);
    router.replace("/(app)");
  };

  return (
    <View className="flex-1 justify-center p-4">
      <Text className="text-2xl mb-4 text-center">Register</Text>
      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}
      <Button title="Register" onPress={handleRegister} disabled={loading} />
      <Button title="Sign In" onPress={() => router.push("/auth/sign-in")} />
    </View>
  );
};

export default Register;
