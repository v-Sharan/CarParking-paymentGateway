import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
const HistroyById = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <StatusBar backgroundColor="black" />
      <Text>HistroyById {id}</Text>
    </View>
  );
};

export default HistroyById;

const styles = StyleSheet.create({});
