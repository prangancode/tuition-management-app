import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InfoRow from "./InfoRow";
import SubjectChip from "./SubjectChip";
/** Utilities */
const initialsFrom = (name = "") =>
  (name.match(/\b\w/g) || []).slice(0, 2).join("").toUpperCase() || "ST";

const stringToColor = (str = "") => {
  const colors = [
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
    "#6366F1",
    "#14B8A6",
    "#F43F5E",
    "#84CC16",
    "#D946EF",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const StudentRow = ({ item, onViewCalendar }) => {
  const student = item?.student || {};
  const td = item?.tuition_details || {};

  const name = student?.name || "—";
  const email = student?.email || "—";
  const phone = student?.phone || "—";
  const customId = student?.custom_id || "—";

  const subjects = Array.isArray(td?.subject_list) ? td.subject_list : [];
  const classLevel = td?.class_level || "—";
  const medium = td?.medium || "—";
  const area = td?.address_line || td?.thana || td?.district || "—";

  const avatarColor = stringToColor(
    student?.name || student?.custom_id || String(item?.student_id || "")
  );

  const handleCall = () => {
    if (phone && phone !== "—") Linking.openURL(`tel:${phone}`);
  };
  const handleMail = () => {
    if (email && email !== "—") Linking.openURL(`mailto:${email}`);
  };

  const handleCalendar = () => {
    // console.log('item:\n' + JSON.stringify(item, null, 2));

    // Pass what your calendar screen needs:
    onViewCalendar?.({
      // teacherId: item?.teacher_id,
      studentId: item?.student_id,
      // tuitionDetailsId: item?.tuition_details_id,
      studentName: item?.student?.name,
      customId: item?.student?.custom_id,
    });
  };

  return (
    <View className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Accent top bar */}
      <View className="h-1.5" style={{ backgroundColor: avatarColor }} />

      <View className="p-4">
        {/* Top row */}
        <View className="flex-row justify-between items-start">
          <View className="flex-row items-center">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: avatarColor }}
            >
              <Text className="text-white font-bold">{initialsFrom(name)}</Text>
            </View>

            <View className="max-w-[70%]">
              <Text className="text-[16px] font-semibold text-gray-900">
                {name}
              </Text>
              <Text className="text-[12px] text-gray-500">{email}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleCalendar}
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
        <View className="mt-3 flex-row gap-3 flex-wrap">
          <InfoRow
            icon="call-outline"
            color="#0EA5E9"
            label="Phone"
            value={phone}
          />
          <InfoRow
            icon="id-card-outline"
            color="#8B5CF6"
            label="ID"
            value={customId}
          />
        </View>

        <View className="mt-2 flex-row gap-3 flex-wrap">
          <InfoRow
            icon="school-outline"
            color="#10B981"
            label="Class"
            value={classLevel}
          />
          <InfoRow
            icon="book-outline"
            color="#F59E0B"
            label="Medium"
            value={medium}
          />
        </View>

        <View className="mt-2 flex-row gap-3 flex-wrap">
          <InfoRow
            icon="location-outline"
            color="#EF4444"
            label="Area"
            value={area}
          />
        </View>

        {/* Subjects */}
        {!!subjects.length && (
          <View className="mt-3">
            <Text className="text-[11px] text-gray-500 mb-1">Subjects</Text>
            <View className="flex-row flex-wrap">
              {subjects.map((s) => (
                <SubjectChip key={s} label={cap(String(s))} />
              ))}
            </View>
          </View>
        )}

        {/* Quick actions */}
        <View className="mt-3 flex-row gap-2">
          <TouchableOpacity
            className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1 border border-gray-200"
            onPress={handleCalendar}
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
            onPress={handleCall}
          >
            <Ionicons name="call-outline" size={16} color="#0EA5E9" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-10 h-10 rounded-xl items-center justify-center border border-gray-200"
            onPress={handleMail}
          >
            <Ionicons name="mail-outline" size={16} color="#16A34A" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StudentRow;
