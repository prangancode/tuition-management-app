import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InfoRow from "./InfoRow";
import SubjectChip from "./SubjectChip";

const StudentRow = ({ item, onViewCalendar }) => {
  return (
    <View className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Accent top bar */}
      <View className="h-1.5" style={{ backgroundColor: item.avatarColor }} />

      <View className="p-4">
        {/* Top row */}
        <View className="flex-row justify-between items-start">
          <View className="flex-row items-center">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: item.avatarColor }}
            >
              <Text className="text-white font-bold">
                {(item.name.match(/\b\w/g) || [])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </Text>
            </View>

            <View className="max-w-[70%]">
              <Text className="text-[16px] font-semibold text-gray-900">
                {item.name}
              </Text>
              <Text className="text-[12px] text-gray-500">{item.email}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={onViewCalendar}
            className="px-3 py-1.5 rounded-xl flex-row items-center"
            style={{ backgroundColor: "#EDE9FE" }}
          >
            <Ionicons name="calendar-outline" size={14} color="#4338CA" />
            <Text
              className="ml-1 text-[12px] font-semibold"
              style={{ color: "#4338CA" }}
            >
              View Calendar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View className="mt-3 flex-row gap-3">
          <InfoRow
            icon="call-outline"
            color="#0EA5E9"
            label="Phone"
            value={item.phone}
          />
        </View>

        {/* Subjects */}
        {!!item.subjects?.length && (
          <View className="mt-3">
            <Text className="text-[11px] text-gray-500 mb-1">Subjects</Text>
            <View className="flex-row flex-wrap">
              {item.subjects.map((s) => (
                <SubjectChip key={s} label={s} />
              ))}
            </View>
          </View>
        )}

        {/* Quick actions */}
        <View className="mt-3 flex-row gap-2">
          <TouchableOpacity
            className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1 border border-gray-200"
            onPress={onViewCalendar}
          >
            <Ionicons name="time-outline" size={16} color="#4F46E5" />
            <Text
              className="text-[12px] font-semibold"
              style={{ color: "#4F46E5" }}
            >
              Schedule
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-10 h-10 rounded-xl items-center justify-center border border-gray-200"
            onPress={() => {}}
          >
            <Ionicons name="call-outline" size={16} color="#0EA5E9" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-10 h-10 rounded-xl items-center justify-center border border-gray-200"
            onPress={() => {}}
          >
            <Ionicons name="mail-outline" size={16} color="#16A34A" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StudentRow;
