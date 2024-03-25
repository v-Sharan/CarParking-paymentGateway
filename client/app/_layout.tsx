import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useUser } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import "expo-dev-client";
import { QueryClient, QueryClientProvider, onlineManager } from "react-query";
import NetInfo from "@react-native-community/netinfo";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const queryClient = new QueryClient();

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const { user } = useUser();

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

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
      const res = await fetch("http://192.168.192.177:8000/auth/login", {
        // const res = await fetch("http://192.168.1.28:8000/auth/login", {
        method: "POST",
        body,
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) Alert.alert("Login Failed");
    } catch (e) {
      console.log(e);
      Alert.alert("Server Error pls try again");
      return;
    }
  };

  useEffect(() => {
    if (!isSignedIn) setLogin(false);
  }, [isSignedIn]);

  useEffect(() => {
    console.log(isLoaded);
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
  }, [isSignedIn, isLoaded]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: true, title: "" }} />
    </Stack>
  );
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
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <InitialLayout />
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
