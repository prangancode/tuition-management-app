import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const todaysEvents = [
  {
    subject: "Advanced Calculus",
    time: "10:30 AM",
    students: 5,
    duration: "2h",
    status: "starting-soon",
    color: "#8B5CF6", // indigo
  },
  {
    subject: "Quantum Physics",
    time: "2:00 PM",
    students: 8,
    duration: "1.5h",
    status: "upcoming",
    color: "#06B6D4", // cyan
  },
];

const StatusPill = ({ status }) => {
  const map = {
    "starting-soon": {
      bg: "#FEE2E2",
      color: "#991B1B",
      label: "Starting soon",
    },
    upcoming: { bg: "#E0F2FE", color: "#075985", label: "Upcoming" },
  }[status] || { bg: "#E5E7EB", color: "#374151", label: "Scheduled" };

  return (
    <View
      className="px-2 py-1 rounded-full"
      style={{ backgroundColor: map.bg }}
    >
      <Text className="text-[11px] font-semibold" style={{ color: map.color }}>
        {map.label}
      </Text>
    </View>
  );
};

const EventCard = ({ item }) => {
  return (
    <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <View className="flex-row">
        {/* accent bar */}
        <View
          className="w-1.5 rounded-full mr-3"
          style={{ backgroundColor: item.color }}
        />

        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="font-semibold text-gray-900">
                {item.subject}
              </Text>
              <Text className="text-xs text-gray-600 mt-0.5">
                {item.students} students • {item.duration}
              </Text>
            </View>
            <StatusPill status={item.status} />
          </View>

          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Feather name="clock" size={12} color="#4B5563" />
              <Text className="text-sm font-medium text-gray-700 ml-1">
                {item.time}
              </Text>
            </View>

            <TouchableOpacity
              className="px-3 py-2 rounded-xl flex-row items-center"
              style={{ backgroundColor: item.color + "22" }}
            >
              <Ionicons
                name={item.status === "starting-soon" ? "play" : "eye-outline"}
                size={14}
                color={item.color}
              />
              <Text
                className="ml-1 text-xs font-semibold"
                style={{ color: item.color }}
              >
                {item.status === "starting-soon" ? "Join now" : "View"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const TodaysSchedule = () => {
  return (
    <View>
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-xl items-center justify-center bg-indigo-50 mr-2">
            <Ionicons name="calendar-outline" size={16} color="#4F46E5" />
          </View>
          <Text className="text-gray-900 font-semibold text-base">
            Today’s Schedule
          </Text>
        </View>

        <TouchableOpacity className="px-3 py-1.5 rounded-xl border border-gray-200">
          <Text className="text-xs text-gray-700">View all</Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {todaysEvents.map((ev, idx) => (
          <EventCard key={idx} item={ev} />
        ))}
      </View>
    </View>
  );
};

export default TodaysSchedule;
