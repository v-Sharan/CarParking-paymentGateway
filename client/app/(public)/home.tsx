import { View, FlatList } from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Slot from "@/components/SlotComponent";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "react-query";
import Spinner from "react-native-loading-spinner-overlay";

type SlotType = {
  _id: "string";
  pid: number;
  floor: number;
  updatedAt: string;
  createdAt: string;
  free: boolean;
};

const Home = () => {
  const [slot, setSlot] = useState<SlotType[] | []>([]);

  const { data, refetch, isLoading, isRefetching } = useQuery("blogs", () => {
    return axios.get("http://192.168.8.177:8000/slot", {});
  });

  const firstTimeRef = useRef(true);

  useEffect(() => {
    setSlot(data?.data?.slot);
  }, [data?.data?.slot]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={isLoading || isRefetching} />
      {slot?.length != 0 && (
        <FlatList
          data={slot}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
          renderItem={({ item }) => <Slot {...item} />}
        />
      )}
    </View>
  );
};

export default Home;
