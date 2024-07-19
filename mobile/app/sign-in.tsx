import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      router.replace("/");
    } catch (err) {
      console.error(err);
      setError(
        "Failed to sign in. Please check your credentials and try again."
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

export default SignIn;
