import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const QuickSummary = () => {
  return (
    <View className="mt-6 bg-white/10 border border-white/20 rounded-2xl p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-white/80 text-xs">Today’s Overview</Text>
          <Text className="text-white font-semibold text-lg mt-1">
            3 Classes • 16 Students
          </Text>

          {/* mini chips */}
          <View className="flex-row mt-2">
            <View className="px-2 py-1 rounded-full bg-emerald-400/20 mr-2">
              <Text className="text-[11px] font-semibold text-emerald-50">
                Attendance 96%
              </Text>
            </View>
            <View className="px-2 py-1 rounded-full bg-amber-400/20">
              <Text className="text-[11px] font-semibold text-amber-50">
                2 Assignments due
              </Text>
            </View>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-white/80 text-xs">Next class</Text>
          <View className="mt-1 px-2 py-1 rounded-lg bg-white/15 flex-row items-center">
            <Ionicons name="time-outline" size={12} color="#fff" />
            <Text className="ml-1 text-white text-xs font-semibold">
              in 45 mins
            </Text>
          </View>

          <TouchableOpacity className="mt-3 px-3 py-2 rounded-xl bg-white/90 flex-row items-center">
            <Ionicons name="play-circle" size={16} color="#111827" />
            <Text className="ml-1 font-semibold text-gray-900 text-xs">
              Start early
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuickSummary;
