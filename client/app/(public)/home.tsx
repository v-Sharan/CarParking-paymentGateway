import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

type SlotType = {
  _id: "string";
  pid: number;
  floor: number;
  updatedAt: string;
  createdAt: string;
};

const Home = () => {
  const { user } = useUser();
  const [slot, setSlot] = useState<SlotType[] | []>([]);
  const isFouse = useIsFocused();
  const [slected, setSelected] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (!isFouse) return;
      const res = await axios.get("http://192.168.189.177:8000/slot");
      const data = await res.data;
      console.log(data);
      setSlot(data?.slot);
    })();
  }, [isFouse]);

  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
      {slot.length != 0 && (
        <FlatList
          data={slot}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelected(item.pid)}></Pressable>
          )}
        />
      )}
    </View>
  );
};

export default Home;
