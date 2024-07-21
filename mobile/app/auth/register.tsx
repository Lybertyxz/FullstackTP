import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Register" onPress={handleRegister} disabled={loading} />
      <Button title="Sign In" onPress={() => router.push("/auth/sign-in")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default Register;
