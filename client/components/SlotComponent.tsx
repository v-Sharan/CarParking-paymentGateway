import { Text, TouchableOpacity } from "react-native";

type SlotType = {
  _id: "string";
  pid: number;
  floor: number;
  updatedAt: string;
  createdAt: string;
  free: boolean;
};

const Slot = ({ _id, pid, floor, updatedAt, createdAt, free }: SlotType) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        margin: 10,
        padding: 10,
        height: 100,
        width: 100,
        backgroundColor: free ? "lightgreen" : "red",
        borderColor: "green",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      disabled={free}
    >
      <Text>Slot {pid}</Text>
      <Text>Floor {floor}</Text>
    </TouchableOpacity>
  );
};

export default Slot;
