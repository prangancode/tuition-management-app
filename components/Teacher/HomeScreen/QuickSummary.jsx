import { View, Text } from "react-native";

const QuickSummary = () => {
  return (
    <View className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mt-8">
      <View className="flex-row justify-between items-center">
        {/* Left side */}
        <View>
          <Text className="text-white/80 text-sm">Today's Overview</Text>
          <Text className="text-white font-semibold text-lg">
            3 Classes • 16 Students
          </Text>
        </View>

        {/* Right side */}
        <View className="items-end">
          <Text className="text-white/80 text-sm">Next Class</Text>
          <Text className="text-white font-semibold">in 45 mins</Text>
        </View>
      </View>
    </View>
  );
};

export default QuickSummary;
