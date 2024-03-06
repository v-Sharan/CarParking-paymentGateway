import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useUser } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import "expo-dev-client";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);

  const { user } = useUser();

  const userLogin = async ({
    clerkId,
    username,
    email,
  }: {
    username: string | null | undefined;
    email: string | undefined;
    clerkId: string | undefined;
  }) => {
    try {
      const body = JSON.stringify({ username, email, clerkId });
      console.log(body);
      const res = await fetch("http://192.168.189.177:8000/auth/login", {
        method: "POST",
        body,
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) Alert.alert("Logged in Succesfully");
    } catch (e) {
      Alert.alert("Server Error pls try again");
      return;
    }
  };

  useEffect(() => {
    if (!isSignedIn) setLogin(false);
  }, [isSignedIn]);

  useEffect(() => {
    if (!isLoaded) return;
    console.log("User changed: ", isSignedIn);

    if (isSignedIn && !login) {
      if (
        !!user?.id &&
        !!user?.emailAddresses[0].emailAddress &&
        !!user?.username
      )
        return;
      let username = user?.emailAddresses[0].emailAddress?.split("@")[0];
      userLogin({
        clerkId: user?.id,
        username,
        email: user?.emailAddresses[0].emailAddress,
      }).then(() => setLogin(true));
      router.replace("/home");
    } else if (isSignedIn) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/register");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayout;
