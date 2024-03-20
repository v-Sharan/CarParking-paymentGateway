import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

type SlotType = {
  _id: "string";
  pid: number;
  floor: number;
  updatedAt: string;
  createdAt: string;
  free: boolean;
};

const BookingComponent = ({
  _id,
  pid,
  floor,
  updatedAt,
  createdAt,
  free,
}: SlotType) => {
  const [select, setSelect] = useState<boolean>(false);
  return (
    <Pressable
      onPress={() => setSelect(true)}
      style={[
        {
          borderWidth: 1,
          margin: 10,
          padding: 10,
          height: 100,
          width: 100,
          borderColor: "green",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        { backgroundColor: select ? "lightblue" : "lightgreen" },
      ]}
    >
      <Text>Slot {pid}</Text>
    </Pressable>
  );
};

export default BookingComponent;

const styles = StyleSheet.create({});
