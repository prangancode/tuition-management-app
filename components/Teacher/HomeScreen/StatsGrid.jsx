import React from "react";
import { View, Text, FlatList } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

// Define the icon to use for each stat, with unique solid background color for the icon
const stats = [
  {
    label: "Students",
    value: "48",
    icon: "users", // Feather
    iconLib: Feather,
    iconBg: "bg-blue-500",
    change: "+2",
    bg: "from-blue-50 to-purple-50",
    changeColor: "text-blue-600 bg-blue-50",
  },
  {
    label: "Revenue",
    value: "$9.2k",
    icon: "dollar-sign", // Feather
    iconLib: Feather,
    iconBg: "bg-emerald-500",
    change: "+12%",
    bg: "from-emerald-50 to-teal-50",
    changeColor: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Classes",
    value: "12",
    icon: "book-open", // Feather
    iconLib: Feather,
    iconBg: "bg-orange-500",
    change: "3 today",
    bg: "from-orange-50 to-red-50",
    changeColor: "text-orange-600 bg-orange-50",
  },
  {
    label: "Completion",
    value: "94%",
    icon: "trending-up", // Feather
    iconLib: Feather,
    iconBg: "bg-pink-500",
    change: "+8%",
    bg: "from-pink-50 to-rose-50",
    changeColor: "text-pink-600 bg-pink-50",
  },
];

const StatsGrid = () => {
  return (
    <FlatList
      data={stats}
      keyExtractor={(item) => item.label}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
      renderItem={({ item }) => {
        const Icon = item.iconLib;
        return (
          <View
            className="flex-1 bg-white rounded-2xl p-4 relative 
          shadow border border-gray-100 overflow-hidden mt-4"
          >
            {/* Background color layer */}
            <View
              className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-30 rounded-2xl`}
            />

            {/* Content */}
            <View className="relative">
              <View className="flex-row justify-between items-center mb-3">
                <View className={`p-2 rounded-xl ${item.iconBg} shadow`}>
                  <Icon name={item.icon} size={16} color="white" />
                </View>

                <Text
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${item.changeColor}`}
                >
                  {item.change}
                </Text>
              </View>

              <Text className="text-2xl font-bold text-gray-900">
                {item.value}
              </Text>
              <Text className="text-xs text-gray-600 mt-1">{item.label}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default StatsGrid;
