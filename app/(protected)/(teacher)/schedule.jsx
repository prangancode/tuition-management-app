import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const events = [
  {
    id: 1,
    title: "Advanced Calculus",
    subject: "Mathematics",
    time: "10:30 - 12:30",
    location: "Room A1",
    students: 5,
    status: "Starting Soon",
  },
  {
    id: 2,
    title: "Physics Lab Session",
    subject: "Physics",
    time: "14:00 - 15:30",
    location: "Physics Lab",
    students: 8,
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Chemistry Review",
    subject: "Chemistry",
    time: "16:00 - 17:00",
    location: "Online",
    students: 3,
    status: "Upcoming",
  },
];

const statusClass = (s) => {
  switch (s) {
    case "Starting Soon":
      return "bg-rose-100 text-rose-700";
    case "Scheduled":
      return "bg-blue-100 text-blue-700";
    case "Upcoming":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const ScheduleScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="pb-8">
        {/* Header */}
        <View className="bg-indigo-600 p-4 rounded-b-2xl">
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-lg font-bold">Schedule</Text>
            <TouchableOpacity className="bg-white px-3 py-1 rounded-lg flex-row items-center">
              <AntDesign name="plus" size={16} color="black" />
              <Text className="text-black font-semibold ml-1">Add Event</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-white mt-1">Monday, August 4</Text>

          <View className="flex-row mt-3">
            <TouchableOpacity className="bg-white/20 px-4 py-2 rounded-full mr-2">
              <Text className="text-white">Day View</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
              <Text className="text-black">Week View</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-4 p-3 bg-white/20 rounded-lg flex-row justify-between">
            <Text className="text-white font-semibold">
              3 Classes · 4.5 Hours
            </Text>
            <Text className="text-white">Next Class in 45 mins</Text>
          </View>
        </View>

        {/* Events */}
        <View className="p-4">
          {events.map((event) => (
            <View
              key={event.id}
              className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-100"
            >
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-lg font-semibold">{event.title}</Text>
                  <Text className="text-gray-500">{event.subject}</Text>

                  <View className="flex-row items-center mt-1">
                    <Feather name="clock" size={14} color="gray" />
                    <Text className="text-gray-600 ml-1">{event.time}</Text>
                  </View>

                  <View className="flex-row items-center mt-1">
                    <Ionicons name="location-outline" size={14} color="gray" />
                    <Text className="text-gray-600 ml-1">{event.location}</Text>
                  </View>

                  <View className="flex-row items-center mt-1">
                    <Feather name="users" size={14} color="gray" />
                    <Text className="text-gray-600 ml-1">
                      {event.students} students
                    </Text>
                  </View>
                </View>

                <View>
                  <Text
                    className={`px-2 py-1 rounded-lg text-xs ${statusClass(event.status)}`}
                  >
                    {event.status}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                className="mt-3 px-4 py-2 rounded-lg flex-row items-center justify-center"
                style={{ backgroundColor: "#8b5cf6" }} // purple-500
              >
                <MaterialIcons name="play-arrow" size={18} color="white" />
                <Text className="text-white text-center ml-1">
                  Join / Start
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View className="flex-row justify-around p-4">
          <View className="items-center bg-blue-50 px-6 py-4 rounded-xl">
            <Text className="text-lg font-bold">3</Text>
            <Text className="text-gray-500 text-sm">Today's Classes</Text>
          </View>
          <View className="items-center bg-green-50 px-6 py-4 rounded-xl">
            <Text className="text-lg font-bold">16</Text>
            <Text className="text-gray-500 text-sm">Total Students</Text>
          </View>
          <View className="items-center bg-pink-50 px-6 py-4 rounded-xl">
            <Text className="text-lg font-bold">4.5h</Text>
            <Text className="text-gray-500 text-sm">Teaching Time</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
