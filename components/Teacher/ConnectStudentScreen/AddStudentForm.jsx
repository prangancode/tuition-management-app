import React, { useMemo, useState } from "react";
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

const formatId = (raw) => {
  const digits = (raw || "").replace(/\D/g, "").slice(0, 12);
  const parts = [
    digits.slice(0, 4),
    digits.slice(4, 8),
    digits.slice(8, 12),
  ].filter(Boolean);
  return { digits, display: parts.join("-") };
};

const AddStudentForm = () => {
  const [studentDigits, setStudentDigits] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [touched, setTouched] = useState(false);

  const { display } = useMemo(() => formatId(studentDigits), [studentDigits]);
  const isValid = studentDigits.length === 12;

  const onChange = (text) => {
    const { digits } = formatId(text);
    setStudentDigits(digits);
    if (!touched) setTouched(true);
  };

  const handleClear = () => setStudentDigits("");

  const handleConnect = () => {
    if (!isValid || isConnecting) return;
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      alert(`Request sent to ID: ${studentDigits}`);
    }, 1200);
  };

  const showError = touched && !isValid && studentDigits.length > 0;

  return (
    <View className="bg-white px-4 pt-6 pb-6 rounded-2xl ">
      {/* Top icon + title */}
      <View className="items-center mb-4">
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center"
          style={styles.badge}
        >
          <Ionicons name="sparkles-outline" size={24} color="#6D28D9" />
        </View>
      </View>

      <Text className="text-gray-900 font-semibold text-lg text-center">
        Add New Student
      </Text>
      <Text className="text-gray-600 text-center mt-1">
        Enter the student's unique 12-digit ID to send a connection request
      </Text>

      {/* Input */}
      <View className="mt-6">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="font-semibold text-gray-900">Student ID</Text>
          <Text
            className={`text-xs ${isValid ? "text-emerald-600" : "text-gray-400"}`}
          >
            {studentDigits.length}/12
          </Text>
        </View>

        <View style={styles.inputWrap}>
          <Ionicons name="id-card-outline" size={18} color="#6B7280" />
          <TextInput
            value={display}
            onChangeText={onChange}
            placeholder="0000-0000-0000"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            returnKeyType="done"
            maxLength={14} // includes hyphens visually
            style={styles.input}
            onBlur={() => setTouched(true)}
          />
          {studentDigits.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <Feather name="x-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {showError && (
          <Text className="text-rose-600 text-xs mt-1">
            ID must be exactly 12 digits.
          </Text>
        )}

        <Text className="text-gray-500 text-xs mt-3">
          Tip: Students can find their ID in{" "}
          <Text className="font-semibold">Profile → Student ID</Text>.
        </Text>
      </View>

      {/* Action */}
      <Pressable
        onPress={handleConnect}
        disabled={!isValid || isConnecting}
        style={[
          styles.button,
          {
            backgroundColor: !isValid || isConnecting ? "#A78BFA66" : "#8B5CF6",
          },
        ]}
      >
        {isConnecting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="send-outline" size={16} color="#fff" />
            <Text style={styles.buttonText}>Send Connection Request</Text>
          </>
        )}
      </Pressable>

      {/* optional sample chips (keep/remove as you like) */}
      <View className="flex-row flex-wrap mt-4">
        {["123456789012", "987654321000"].map((id) => (
          <TouchableOpacity
            key={id}
            onPress={() => onChange(id)}
            className="px-3 py-1.5 mr-2 mb-2 rounded-full bg-gray-100"
          >
            <Text className="text-gray-700 text-xs tracking-wider">
              {formatId(id).display}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#F5F3FF",
    shadowColor: "#6D28D9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    fontSize: 18,
    letterSpacing: 2,
    paddingVertical: 0,
    color: "#111827",
  },
  button: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default AddStudentForm;
