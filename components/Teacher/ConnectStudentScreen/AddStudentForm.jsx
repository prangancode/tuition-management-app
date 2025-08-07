import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";

const AddStudentForm = () => {
  const [studentId, setStudentId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    if (!studentId.trim()) return;
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      console.log("Connection request sent to:", studentId);
    }, 2000);
  };

  return (
    <View className="px-4 mt-6 pb-6">
      {/* Card */}
      <View className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        {/* Header Icon + Text */}
        <View className="text-center mb-6">
          <View className="w-20 h-20 bg-purple-600 rounded-3xl items-center justify-center mx-auto mb-4 shadow-xl">
            <Ionicons name="sparkles-outline" size={40} color="" />
          </View>
          <Text className="text-gray-900 font-semibold text-lg mb-2">
            Add New Student
          </Text>
          <Text className="text-gray-600">
            Enter the student's unique ID to send a connection request
          </Text>
        </View>

        {/* Input */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-medium mb-3">Student ID</Text>
            <TextInput
              placeholder="000000"
              maxLength={6}
              keyboardType="numeric"
              value={studentId}
              onChangeText={setStudentId}
              className="text-center text-xl tracking-widest font-mono bg-gray-50 border border-gray-200 rounded-lg py-3 shadow-lg"
            />
            <Text className="text-gray-500 text-sm mt-2 text-center">
              Ask your student for their unique 6-digit ID
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handleConnect}
            disabled={!studentId.trim() || isConnecting}
            className={`w-full flex-row items-center justify-center gap-2 py-3 rounded-xl shadow-lg ${
              !studentId.trim() || isConnecting
                ? "bg-purple-300"
                : "bg-violet-500"
            }`}
          >
            {isConnecting ? (
              <>
                <ActivityIndicator size="small" color="#fff" />
                <Text className="text-white ml-2">Connecting...</Text>
              </>
            ) : (
              <>
                <FontAwesome6 name="user-plus" size={18} color="#fff" />
                <Text className="text-white font-semibold">
                  Send Connection Request
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddStudentForm;
