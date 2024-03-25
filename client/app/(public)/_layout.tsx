import { Tabs, Stack } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  return (
    <Pressable onPress={() => signOut()} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#6c47ff",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Homes",
          headerRight: () => <LogoutButton />,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              size={size}
              color={color}
              name={focused ? "home" : "home-outline"}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="booking"
        options={{
          headerTitle: "Booking",
          headerRight: () => <LogoutButton />,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons size={size} color={color} name="book-online" />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerTitle: "History",
          headerRight: () => <LogoutButton />,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons size={size} color={color} name="history" />
          ),
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
