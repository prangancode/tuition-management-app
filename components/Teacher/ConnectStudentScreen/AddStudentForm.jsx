import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const AddStudentForm = () => {
  const [studentId, setStudentId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    if (!studentId.trim()) return;
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      alert("Request sent!");
    }, 1500);
  };

  return (
    <View className="bg-white  px-4 pt-6 pb-8 flex flex-col rounded-2xl">
      <View className="rounded-3xl mb-4 shadow-xl items-center">
        <Ionicons name="sparkles-outline" size={40} color="#800080" />
      </View>

      <View className="">
        <Text className="text-gray-900 font-semibold text-lg mb-2 text-center">
          Add New Student
        </Text>
        <Text className="text-gray-600 text-center">
          Enter the student's unique ID to send a connection request
        </Text>
      </View>

      <View className="mt-8">
        <Text className="font-bold">Student Id</Text>

        <TextInput
          style={styles.input}
          //   onChangeText={onChangeNumber}
          //   value={number}
          placeholder="017XXX"
        />

        <Text className="text-gray-600 text-center mt-5">
          Ask your student for their unique 12-digit ID
        </Text>
      </View>

      <Pressable onPress={handleConnect} style={styles.button}>
        <Text style={styles.buttonText}>
          {isConnecting ? "Connecting..." : "Send Connection Request"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    fontSize: 20, // text-xl (approx 20px)
    letterSpacing: 2, // tracking-widest
    fontFamily: "monospace", // font-mono
    backgroundColor: "#f9fafb", // bg-gray-50
    borderWidth: 0, // border-0
    shadowColor: "#000", // shadow-lg
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // for Android shadow
    paddingHorizontal: 16, // some horizontal padding
    paddingVertical: 12, // vertical padding to match Tailwind input sizes
    borderRadius: 12, // optional: round input corners
    marginTop: 12,
  },

  button: {
    backgroundColor: "#8b5cf6", // Tailwind's bg-purple-500
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // Android shadow
    paddingVertical: 12, // py-3
    borderRadius: 12, // rounded-xl
    marginTop: 16, // mt-4
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff", // text-white
    fontWeight: "500", // font-semibold
    fontSize: 14, // text-base
  },
});

export default AddStudentForm;
