import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "react-query";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const History = () => {
  const { user } = useUser();
  const { data, refetch, isLoading, isRefetching } = useQuery("blogs", () => {
    // return axios.get("http://192.168.1.28:8000/slot", {});
    return axios.get(`http://192.168.192.177:8000/his/${user?.id}`);
  });

  const router = useRouter();

  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );

  console.log(data?.data?.history);

  return (
    <React.Fragment>
      <Spinner visible={isLoading || isRefetching} />
      <FlatList
        data={data?.data?.history}
        contentContainerStyle={{ marginVertical: 15 }}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 2,
              height: 140,
              width: Dimensions.get("screen").width - 50,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "red",
                marginHorizontal: 10,
                borderRadius: 10,
              }}
              onPress={() => router.push(`/${item?._id}`)}
            >
              <Image
                source={{ uri: `http://192.168.192.177:8000${item.qrCode}` }}
                style={{ height: 100, width: 100 }}
              />
              <Text>Show QrCode to scan</Text>
            </Pressable>
          </View>
        )}
      />
    </React.Fragment>
  );
};

export default History;

const styles = StyleSheet.create({});
