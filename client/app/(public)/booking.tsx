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
  status: string;
};

const booking = () => {
  const [slot, setSlot] = useState<SlotType[] | []>([]);
  const { user } = useUser();

  const [select, setSelect] = useState<number>(-1);

  const { data, refetch, isLoading, isRefetching } = useQuery("slots", () => {
    return axios.get("http://192.168.192.177:8000/slot", {});
    // return axios.get("http://192.168.1.28:8000/slot", {});
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
      "http://192.168.192.177:8000/payment/createOrder",
      // "http://192.168.1.28:8000/payment/createOrder",
      {
        amount: 100,
      }
    );
    await onBook({
      order_id: data.order.id,
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
      key: "rzp_test_Y93gae5wcNwuzP",
      amount,
      name: "sharan",
      order_id: order_id, //Replace this with an order_id created using Orders API.
      theme: { color: "#6c47ff" },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        const body = { ...data, userId: user?.id, pid: select };
        axios
          .post("http://192.168.192.177:8000/payment/verify", body)
          // .post("http://192.168.1.28:8000/payment/verify", body)
          .then((res) => Alert.alert(res.data.message))
          .catch((e) => console.log(e));
      })
      .catch((error: any) => {
        // handle failure
        console.warn(error);
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
              disabled={select == -1}
              title="Book now"
              onPress={CreateOrderID}
            />
          )}
          renderItem={({ item }) => {
            let color = "white";
            if (item.status == "free") {
              color = "lightgreen";
            } else if (item.status == "booked") {
              color = "lightblue";
              // setSelect(-1);
            } else {
              color = "red";
              // setSelect(-1);
            }
            return (
              <Pressable
                onPress={() => {
                  if (item.status == "booked" || item.status == "parked") {
                    Alert.alert("Already booked or parked");
                    return;
                  }
                  setSelect(item.pid);
                }}
                style={[
                  {
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  select == item.pid
                    ? { borderColor: "royalblue", backgroundColor: "royalblue" }
                    : {
                        borderColor: color,
                        backgroundColor: color,
                      },
                ]}
                disabled={color == ("booked" || "parked")}
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
