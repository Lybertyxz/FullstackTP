import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import AuthInput from "../../components/AuthInput";
import useEmailPasswordAuth from "../../hooks/useEmailPasswordAuth";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {
    signIn,
    loading: emailLoading,
    error: emailError,
  } = useEmailPasswordAuth();
  const {
    signInWithGoogle,
    loading: googleLoading,
    error: googleError,
  } = useGoogleAuth();

  const handleSignIn = async () => {
    await signIn(email, password);
    router.replace("/(app)");
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    router.replace("/(app)");
  };

  return (
    <View className="flex-1 justify-center p-4">
      <Text className="text-2xl mb-4 text-center">Sign In</Text>
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
      {emailError && (
        <Text className="text-red-500 text-center mb-4">{emailError}</Text>
      )}
      {googleError && (
        <Text className="text-red-500 text-center mb-4">{googleError}</Text>
      )}
      <Button title="Sign In" onPress={handleSignIn} disabled={emailLoading} />
      <Button
        title="Sign In with Google"
        onPress={handleGoogleSignIn}
        disabled={googleLoading}
      />
      <Button title="Register" onPress={() => router.push("/auth/register")} />
    </View>
  );
};

export default SignIn;
