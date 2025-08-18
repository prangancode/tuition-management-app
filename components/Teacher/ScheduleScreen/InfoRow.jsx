import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InfoRow = ({ icon, color, label, value }) => {
  return (
    <View className="flex-row items-start gap-2 flex-1">
      <View
        className="w-8 h-8 rounded-xl items-center justify-center"
        style={{ backgroundColor: `${color}22` }}
      >
        <Ionicons name={icon} size={16} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-[11px] text-gray-500">{label}</Text>
        <Text
          className="text-[13px] font-semibold text-gray-900 mt-0.5"
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default InfoRow;
