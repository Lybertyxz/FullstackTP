import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

const requiredEnvVars = [
  "EXPO_PUBLIC_API_KEY",
  "EXPO_PUBLIC_AUTH_DOMAIN",
  "EXPO_PUBLIC_PROJECT_ID",
  "EXPO_PUBLIC_STORAGE_BUCKET",
  "EXPO_PUBLIC_MESSAGING_SENDER_ID",
  "EXPO_PUBLIC_APP_ID",
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  console.error(`Missing environment variables: ${missingEnvVars.join(", ")}`);
  throw new Error(
    `Missing environment variables: ${missingEnvVars.join(", ")}`
  );
}

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
