import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const todaysEvents = [
  {
    subject: "Advanced Calculus",
    time: "10:30 AM",
    students: 5,
    duration: "2 hours",
    status: "starting-soon",
    studentAvatars: ["JD", "SM", "AL", "RK", "PT"],
    color: "from-indigo-500 to-purple-600",
  },
  {
    subject: "Quantum Physics",
    time: "2:00 PM",
    students: 8,
    duration: "1.5 hours",
    status: "upcoming",
    studentAvatars: ["MJ", "KL", "DN", "SB", "RF", "TG", "HY", "QW"],
    color: "from-cyan-500 to-blue-600",
  },
];

const TodaysSchedule = () => {
  return (
    <View className="px-4 mt-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-900 font-semibold text-base">
          Today's Schedule
        </Text>
        <TouchableOpacity className="border border-gray-300 px-3 py-1 rounded-md">
          <Text className="text-xs text-gray-700">View All</Text>
        </TouchableOpacity>
      </View>

      {/* List of Events */}
      <View className="gap-4">
        {todaysEvents.map((item, index) => (
          <View
            key={index}
            className="bg-white p-4 rounded-xl shadow border border-gray-100"
          >
            <View className="flex-row gap-3">
              {/* Vertical Color Bar */}
              <View
                className={`w-1 h-16 rounded-full bg-gradient-to-b ${item.color}`}
              />

              {/* Event Content */}
              <View className="flex-1">
                {/* Top Row */}
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="font-semibold text-gray-900">
                      {item.subject}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {item.students} students • {item.duration}
                    </Text>
                  </View>

                  {item.status === "starting-soon" && (
                    <View className="bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 rounded-full">
                      <Text className="text-white text-xs font-semibold">
                        Starting Soon
                      </Text>
                    </View>
                  )}
                </View>

                {/* Bottom Row */}
                <View className="flex-row justify-between items-center">
                  {/* Time & Avatars */}
                  <View className="flex-row items-center gap-3">
                    <View className="flex-row items-center gap-1">
                      <Feather name="clock" size={12} color="#4B5563" />
                      <Text className="text-sm font-medium text-gray-600">
                        {item.time}
                      </Text>
                    </View>

                    {/* Avatars */}
                    <View className="flex-row -space-x-2">
                      {item.studentAvatars.slice(0, 4).map((avatar, idx) => (
                        <View
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-white bg-blue-50 items-center justify-center"
                        >
                          <Text className="text-blue-500 text-[10px] font-semibold">
                            {avatar}
                          </Text>
                        </View>
                      ))}
                      {item.studentAvatars.length > 4 && (
                        <View className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 items-center justify-center">
                          <Text className="text-[10px] text-gray-600">
                            +{item.studentAvatars.length - 4}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Action Button */}
                  <TouchableOpacity
                    className={`px-3 py-1 rounded-md bg-indigo-50 ${item.color} shadow`}
                  >
                    <Text className="text-xs text-indigo-500 font-semibold">
                      {item.status === "starting-soon" ? "Join Now" : "View"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TodaysSchedule;
