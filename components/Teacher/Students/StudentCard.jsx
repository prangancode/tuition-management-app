import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InitialsAvatar from "../../ui/InitialsAvatar";

const StatusPill = ({ statusKey }) => {
  const map = {
    active: {
      bg: "bg-emerald-100",
      txt: "text-emerald-800",
      ic: "checkmark-circle",
      color: "#047857",
    },
    pending: {
      bg: "bg-amber-100",
      txt: "text-amber-800",
      ic: "time",
      color: "#92400E",
    },
    archived: {
      bg: "bg-gray-100",
      txt: "text-gray-800",
      ic: "archive",
      color: "#111827",
    },
  }[statusKey] || {
    bg: "bg-gray-100",
    txt: "text-gray-800",
    ic: "help",
    color: "#111827",
  };

  return (
    <View
      className={`px-2.5 py-1.5 rounded-full flex-row items-center ${map.bg}`}
    >
      <Ionicons name={map.ic} size={14} color={map.color} />
      <Text className={`ml-1 text-xs font-semibold ${map.txt}`}>
        {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
      </Text>
    </View>
  );
};

const SubjectChip = ({ label }) => (
  <View className="bg-indigo-50 px-3 py-1 rounded-full mr-2 mb-2 border border-indigo-100">
    <Text className="text-indigo-700 text-[11px] font-semibold">{label}</Text>
  </View>
);

const InfoCell = ({ icon, color, label, value }) => (
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
        {value ?? "—"}
      </Text>
    </View>
  </View>
);

/* ------------ Card ------------ */
export default function StudentCard({ item, onView, onEdit, onDelete }) {
  const s = item?.student || {};
  const td = item?.tuition_details || {};

  const statusKey =
    item?.status === "pending"
      ? "pending"
      : item?.is_active
        ? "active"
        : "archived";

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      {/* Top row */}
      <View className="flex-row justify-between items-start">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full items-center justify-center mr-3">
            <InitialsAvatar
              name={s.name || s.custom_id || "ST"}
              size={40}
              rounded
            />
          </View>
          <View>
            <Text className="text-[16px] font-semibold text-gray-900">
              {s.name || "—"}
            </Text>
            <Text className="text-[12px] text-gray-500">{s.email || "—"}</Text>
          </View>
        </View>
        <StatusPill statusKey={statusKey} />
      </View>

      {/* Details */}
      <View className="mt-3 gap-3">
        <View className="flex-row gap-3">
          <InfoCell
            icon="card-outline"
            color="#4F46E5"
            label="Student ID"
            value={s.custom_id}
          />
          <InfoCell
            icon="call-outline"
            color="#0EA5E9"
            label="Phone"
            value={s.phone}
          />
        </View>
        <View className="flex-row gap-3">
          <InfoCell
            icon="school-outline"
            color="#10B981"
            label="Class Level"
            value={td.class_level}
          />
          <View className="flex-1" />
        </View>
      </View>

      {/* Subjects */}
      {Array.isArray(td.subject_list) && td.subject_list.length > 0 ? (
        <View className="mt-3">
          <Text className="text-[11px] text-gray-500 mb-1">Subjects</Text>
          <View className="flex-row flex-wrap">
            {td.subject_list.map((sub) => (
              <SubjectChip key={String(sub)} label={String(sub)} />
            ))}
          </View>
        </View>
      ) : null}

      {/* Actions */}
      <View className="mt-4 flex-row gap-2">
        <TouchableOpacity
          onPress={() => onView(item)}
          className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1"
          style={{ backgroundColor: "#E0F2FE" }}
        >
          <Ionicons name="eye-outline" size={16} color="#0369A1" />
          <Text
            className="text-[12px] font-semibold"
            style={{ color: "#0369A1" }}
          >
            View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onEdit(item)}
          className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1"
          style={{ backgroundColor: "#EDE9FE" }}
        >
          <Ionicons name="create-outline" size={16} color="#4338CA" />
          <Text
            className="text-[12px] font-semibold"
            style={{ color: "#4338CA" }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item)}
          className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1"
          style={{ backgroundColor: "#FFE4E6" }}
        >
          <Ionicons name="trash-outline" size={16} color="#BE123C" />
          <Text
            className="text-[12px] font-semibold"
            style={{ color: "#BE123C" }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
