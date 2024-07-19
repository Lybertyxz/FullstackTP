import React from "react";
import { Text, View, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";

const Home: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Page</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default Home;
