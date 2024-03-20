import { Text, TouchableOpacity } from "react-native";

type SlotType = {
  _id: "string";
  pid: number;
  floor: number;
  updatedAt: string;
  createdAt: string;
  status: string;
};

const Slot = ({ _id, pid, floor, updatedAt, createdAt, status }: SlotType) => {
  let color = "white";
  if (status == "free") {
    color = "lightgreen";
  } else if (status == "booked") {
    color = "lightblue";
  } else {
    color = "red";
  }
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        margin: 10,
        padding: 10,
        height: 100,
        width: 100,
        backgroundColor: color,
        borderColor: color,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      disabled={color == ("booked" || "parked")}
    >
      <Text>Slot {pid}</Text>
      <Text>Floor {floor}</Text>
    </TouchableOpacity>
  );
};

export default Slot;
