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
import { useDispatch, useSelector } from "react-redux";
import { clearFoundStudent } from "../../../slices/Teacher/ConnectStudents/connectStudentSlice";

const onlyDigits = (s = "") => s.replace(/\D/g, "").slice(0, 11); // max 11 digits

const AddStudentForm = ({ studentDigits, setStudentDigits }) => {
  const { loading } = useSelector((state) => state.connectStudents);
  const dispatch = useDispatch();
  const [touched, setTouched] = useState(false);

  const display = useMemo(() => `S${studentDigits}`, [studentDigits]);
  const charCount = 1 + studentDigits.length; // S + digits
  const isValid = studentDigits.length === 11;

  const onChange = (text) => {
    setStudentDigits(onlyDigits(text));
    if (!touched) setTouched(true);
  };

  const handleClear = () => {
    setStudentDigits("");
    dispatch(clearFoundStudent());
  };

  const handleConnect = () => {
    if (!isValid || loading) return;
    // console.log("display", display);

    dispatch({ type: "FIND_STUDENT", payload: { custom_id: display } });
  };

  const showError = touched && !isValid && studentDigits.length > 0;

  return (
    <View className="bg-white px-4 pt-6 pb-6 rounded-2xl">
      {/* Top icon + title */}
      <View className="items-center mb-4">
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center"
          style={styles.badge}
        >
          <Ionicons name="person-add-outline" size={24} color="#3B82F6" />
        </View>
      </View>

      <Text className="text-gray-900 font-semibold text-lg text-center">
        Add New Student
      </Text>
      <Text className="text-gray-600 text-center mt-1">
        Enter the student's unique ID (S + 11 digits) to send a connection
        request
      </Text>

      {/* Input */}
      <View className="mt-6">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="font-semibold text-gray-900">Student ID</Text>
          <Text
            className={`text-xs ${isValid ? "text-emerald-600" : "text-gray-400"}`}
          >
            {charCount}/12
          </Text>
        </View>

        <View style={styles.inputWrap}>
          {/* search icon (changed from id-card) */}
          <Feather name="search" size={18} color="#6B7280" />

          {/* fixed prefix S */}
          <Text style={styles.prefix}>S</Text>

          {/* numeric input for the 11 digits */}
          <TextInput
            value={studentDigits}
            onChangeText={onChange}
            placeholder="00000000000"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            returnKeyType="done"
            maxLength={11}
            style={styles.input}
            onBlur={() => setTouched(true)}
            // Optional: submit from keyboard
            onSubmitEditing={handleConnect}
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
            ID must be exactly: S + 11 digits (e.g., S01734627514).
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
        disabled={!isValid || loading}
        style={[
          styles.button,
          {
            backgroundColor: !isValid || loading ? "#A78BFA66" : "#8B5CF6",
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="send-outline" size={16} color="#fff" />
            <Text style={styles.buttonText}>Search student</Text>
          </>
        )}
      </Pressable>

      {/* sample chips */}
      <View className="flex-row flex-wrap mt-4">
        {["S01734627514", "S98765432100"].map((id) => (
          <TouchableOpacity
            key={id}
            onPress={() => onChange(id)}
            className="px-3 py-1.5 mr-2 mb-2 rounded-full bg-gray-100"
          >
            <Text className="text-gray-700 text-xs tracking-wider">{id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#EFF6FF",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 6 },
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
  prefix: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
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
