// hooks/useGoogleAuth.ts
import { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
});

const useGoogleAuth = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    });
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      setUserInfo(userCredential.user);
      setError(null);
    } catch (err) {
      setError((err as any).message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth.signOut();
      setUserInfo(null);
    } catch (err) {
      setError((err as any).message);
    }
  };

  return { userInfo, error, loading, signInWithGoogle, signOut };
};

export default useGoogleAuth;
