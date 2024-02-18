import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";

enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
}
const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { signIn, setActive, isLoaded } = useSignIn();

  const [user, setUser] = useState({ email: "", password: "" });
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: user.email,
        password: user.password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          fontWeight: "400",
          marginVertical: 5,
          borderColor: "#6c47ff",
        }}
        value={user.email}
        onChangeText={(text) =>
          setUser((prev) => {
            return { email: text, password: prev.password };
          })
        }
      />
      <View
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          flexDirection: "row",
          borderColor: "#6c47ff",
        }}
      >
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          style={{
            fontWeight: "400",
            flex: 1,
          }}
          secureTextEntry={secureText}
          value={user.password}
          onChangeText={(text) =>
            setUser((prev) => {
              return { email: prev.email, password: text };
            })
          }
        />
        <Entypo
          name={secureText ? "eye" : "eye-with-line"}
          size={24}
          color="black"
          onPress={() => setSecureText((prev) => !prev)}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#6c47ff",
          padding: 10,
          marginVertical: 4,
          borderRadius: 5,
          borderColor: "#fff",
        }}
        onPress={onSignInPress}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 15 }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#6c47ff",
          padding: 10,
          marginVertical: 4,
          borderRadius: 5,
          borderColor: "#fff",
        }}
        onPress={() => router.replace("/register")}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 15 }}>
          Go to Sign up
        </Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <AntDesign name="google" size={24} color="#6c47ff" />

          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Entypo name="facebook" size={24} color="#6c47ff" />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },

  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: "#778899",
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6c47ff",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});
