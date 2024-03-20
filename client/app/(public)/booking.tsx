import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Alert,
  Button,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useFocusEffect } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import Spinner from "react-native-loading-spinner-overlay";
import { useUser } from "@clerk/clerk-expo";

type SlotType = {
  _id: "string";
  pid: number;
  floor: number;
  updatedAt: string;
  createdAt: string;
  free: boolean;
};

const booking = () => {
  const [slot, setSlot] = useState<SlotType[] | []>([]);
  const { user } = useUser();

  const [select, setSelect] = useState<number>(0);

  const { data, refetch, isLoading, isRefetching } = useQuery("slots", () => {
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

  const CreateOrderID = async () => {
    const { data } = await axios.post(
      "http://192.168.8.177:8000/payment/createOrder",
      {
        amount: 100,
      }
    );
    await onBook({
      order_id: data.order.order_id,
      amount: data?.order?.amount,
    });
  };

  const onBook = async ({
    order_id,
    amount,
  }: {
    order_id: string;
    amount: number;
  }) => {
    var options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: process.env.EXPO_PUBLIC_RAZOPAY_KEYID!,
      amount,
      name: "sharan",
      order_id: order_id, //Replace this with an order_id created using Orders API.
      theme: { color: "#6c47ff" },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        axios
          .post("http://192.168.8.177:8000/payment/verify", data)
          .then((res) => console.log(res.data))
          .catch((e) => console.log(e));
      })
      .catch((error: any) => {
        // handle failure
        console.log(error);
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View>
      <Spinner visible={isLoading} />
      {slot?.length != 0 && (
        <FlatList
          data={slot}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
          ListFooterComponent={() => (
            <Button
              disabled={!!!select}
              title="Book now"
              onPress={CreateOrderID}
            />
          )}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => setSelect(item.pid)}
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
                  item.free
                    ? {
                        backgroundColor:
                          select == item.pid ? "lightblue" : "lightgreen",
                      }
                    : {
                        backgroundColor: !item.free ? "grey" : "lightgreen",
                      },
                ]}
                disabled={!item.free}
              >
                <Text>Slot {item.pid}</Text>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
};

export default booking;
