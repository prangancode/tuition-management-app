import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Header = ({
  query,
  onChangeQuery,
  onClearQuery,
  isSearching,
  STUDENTS,
}) => {
  return (
    <>
      {/* Hero header */}
      <View className="bg-indigo-600 px-4 pt-5 pb-6 rounded-b-2xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-extrabold">Schedule</Text>
          <TouchableOpacity
            className="bg-white/90 px-3 py-2 rounded-xl flex-row items-center"
            onPress={() => {}}
          >
            <Ionicons name="person-add-outline" size={18} color="#111827" />
            <Text className="ml-1 font-semibold text-gray-900">
              Add Student
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white mt-1 opacity-90">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>

        {/* Search */}
        <View
          className="mt-4 rounded-xl px-3 py-2 flex-row items-center border"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          <Ionicons name="search" size={16} color="white" />
          <TextInput
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Search students, subjects, phone…"
            placeholderTextColor="rgba(255,255,255,0.85)"
            className="ml-2 text-white flex-1"
            returnKeyType="search"
          />
          {/* Right adornment: spinner or clear */}
          {isSearching ? (
            <ActivityIndicator size="small" />
          ) : !!query ? (
            <TouchableOpacity
              onPress={onClearQuery}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={18} color="white" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Small stats strip */}
        <View className="mt-4 flex-row gap-2">
          <View className="flex-1 bg-white/15 rounded-xl p-3">
            <Text className="text-white/90 text-xs">Active Students</Text>
            <Text className="text-white font-bold text-lg">
              {STUDENTS?.length}
            </Text>
          </View>
          <View className="flex-1 bg-white/15 rounded-xl p-3">
            <Text className="text-white/90 text-xs">Today</Text>
            <Text className="text-white font-bold text-lg">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
      </View>

      {/* Section title */}
      <View className="px-4 mt-4 flex-row items-center gap-2">
        <View
          className="w-8 h-8 rounded-xl items-center justify-center"
          style={{ backgroundColor: "#EEF2FF" }}
        >
          <Ionicons name="people-outline" size={18} color="#4F46E5" />
        </View>
        <Text className="text-sm font-semibold text-gray-900">
          Active Students
        </Text>
      </View>
    </>
  );
};

export default Header;
