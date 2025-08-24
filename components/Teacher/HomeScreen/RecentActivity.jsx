import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------- tiny utils ---------- */
const timeAgo = (d) => {
  const t = typeof d === "string" ? new Date(d) : d;
  const diff = Math.max(0, Date.now() - t.getTime());
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  const w = Math.floor(days / 7);
  return `${w}w ago`;
};

const statusStyle = (action) => {
  switch (action) {
    case "accepted":
      return {
        bg: "bg-emerald-100",
        txt: "text-emerald-700",
        tint: "#059669",
        icon: "checkmark-circle",
      };
    case "rejected":
      return {
        bg: "bg-rose-100",
        txt: "text-rose-700",
        tint: "#BE123C",
        icon: "close-circle",
      };
    default:
      return {
        bg: "bg-amber-100",
        txt: "text-amber-700",
        tint: "#B45309",
        icon: "time",
      };
  }
};

const typeStyle = (type) => {
  // leading icon bubble (left side)
  if (type === "event") {
    return { icon: "calendar-outline", tint: "#4F46E5" }; // indigo
  }
  return { icon: "person-add-outline", tint: "#0EA5E9" }; // sky
};

const buildCopy = (item) => {
  if (item.type === "event") {
    return {
      title:
        item.action === "accepted"
          ? "Tuition event accepted"
          : item.action === "rejected"
            ? "Tuition event rejected"
            : "Tuition event pending",
      subtitle: item.studentName
        ? `${item.studentName}${item.note ? " • " + item.note : ""}`
        : item.note || "",
    };
  }
  // connection
  return {
    title:
      item.action === "accepted"
        ? "Connection request accepted"
        : item.action === "rejected"
          ? "Connection request rejected"
          : "Connection request pending",
    subtitle: item.studentName ? item.studentName : item.note || "",
  };
};

/* ---------- subcomponents ---------- */
function StatusChip({ action }) {
  const s = statusStyle(action);
  return (
    <View className={`px-2 py-0.5 rounded-full flex-row items-center ${s.bg}`}>
      <Ionicons name={s.icon} size={14} color={s.tint} />
      <Text className={`ml-1 text-[11px] font-semibold ${s.txt}`}>
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </Text>
    </View>
  );
}

function ActivityItem({ item, isLast, onPress }) {
  const ts = typeStyle(item.type);
  const { title, subtitle } = buildCopy(item);
  const when = item.at ? timeAgo(item.at) : "";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
      className={`px-4 py-3 ${isLast ? "" : "border-b border-gray-100"}`}
    >
      <View className="flex-row items-start">
        {/* left icon bubble */}
        <View
          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: `${ts.tint}1A` }} // ~10% tint
        >
          <Ionicons name={ts.icon} size={18} color={ts.tint} />
        </View>

        {/* text area */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-[14px] font-semibold text-gray-900"
              numberOfLines={1}
            >
              {title}
            </Text>
            {!!when && (
              <Text
                className="text-[11px] text-gray-500 ml-2"
                numberOfLines={1}
              >
                {when}
              </Text>
            )}
          </View>

          {!!subtitle && (
            <Text
              className="text-[12px] text-gray-600 mt-0.5"
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          )}

          <View className="mt-2 mr-auto">
            <StatusChip action={item.action || "pending"} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* ---------- main component ---------- */
export default function RecentActivity({ activities, onItemPress }) {
  // sample data if none passed
  const data =
    activities && activities.length
      ? activities
      : [
          {
            id: "1",
            type: "event", // "event" | "connection"
            action: "accepted", // "accepted" | "rejected" | "pending"
            studentName: "Sarah Johnson",
            note: "Monthly Math — 7:30 PM",
            at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15m ago
          },
          {
            id: "2",
            type: "connection",
            action: "rejected",
            studentName: "Arafat Khan",
            note: "Reason: unavailable schedule",
            at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3h ago
          },
          {
            id: "3",
            type: "event",
            action: "pending",
            studentName: "Nusrat Rahman",
            note: "Chemistry Trial Class",
            at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 26h ago
          },
          {
            id: "4",
            type: "connection",
            action: "accepted",
            studentName: "Khalid Hasan",
            at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2d ago
          },
        ];

  return (
    <View className="px-0">
      {/* Card container */}
      <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <View className="px-4 pt-4 pb-2">
          <Text className="text-[15px] font-bold text-gray-900">
            Recent activity
          </Text>
          <Text className="text-[12px] text-gray-500 mt-0.5">
            Event updates and connection requests
          </Text>
        </View>

        {/* list */}
        {data.map((item, idx) => (
          <ActivityItem
            key={item.id ?? String(idx)}
            item={item}
            isLast={idx === data.length - 1}
            onPress={onItemPress}
          />
        ))}
      </View>
    </View>
  );
}
