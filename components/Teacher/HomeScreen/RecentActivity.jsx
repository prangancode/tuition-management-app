import { useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import ActivityItemSkeleton from "./ActivityItemSkeleton";

/* ---------- time ago ---------- */
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

/* ---------- action (accepted / rejected / pending / info) ---------- */
const deriveAction = (title = "", body = "") => {
  const s = `${title} ${body}`.toLowerCase();
  if (/\baccept(ed|s|ance)?\b|approved|confirmed/.test(s)) return "accepted";
  if (/\breject(ed|s|ion)?\b|declined|canceled|cancelled|denied/.test(s))
    return "rejected";
  if (/\bpending\b|awaiting/.test(s)) return "pending";
  return "info";
};

/* ---------- left icon by notification type ---------- */
const typeStyle = (notifType) => {
  switch (notifType) {
    case "tuition_event":
      return { icon: "calendar-outline", tint: "#4F46E5" }; // indigo
    case "connection_request":
      return { icon: "person-add-outline", tint: "#0EA5E9" }; // sky
    default:
      return { icon: "notifications-outline", tint: "#6B7280" }; // gray
  }
};

/* ---------- status chip (accepted / rejected / pending / info) ---------- */
const statusStyle = (action) => {
  switch (action) {
    case "accepted":
      return {
        bg: "bg-emerald-100",
        txt: "text-emerald-700",
        tint: "#059669",
        icon: "checkmark-circle",
        label: "Accepted",
      };
    case "rejected":
      return {
        bg: "bg-rose-100",
        txt: "text-rose-700",
        tint: "#BE123C",
        icon: "close-circle",
        label: "Rejected",
      };
    case "pending":
      return {
        bg: "bg-amber-100",
        txt: "text-amber-700",
        tint: "#B45309",
        icon: "time",
        label: "Pending",
      };
    default:
      return {
        bg: "bg-blue-100",
        txt: "text-blue-700",
        tint: "#2563EB",
        icon: "information-circle",
        label: "Info",
      };
  }
};

function StatusChip({ action }) {
  const s = statusStyle(action);
  return (
    <View className={`px-2 py-0.5 rounded-full flex-row items-center ${s.bg}`}>
      <Ionicons name={s.icon} size={14} color={s.tint} />
      <Text className={`ml-1 text-[11px] font-semibold ${s.txt}`}>
        {s.label}
      </Text>
    </View>
  );
}

function ActivityItem({ item, isLast, onPress }) {
  const ts = typeStyle(item.notifType);
  const when = item.at ? timeAgo(item.at) : "";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(item.original)}
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
            <View className="flex-row items-center">
              <Text
                className="text-[14px] font-semibold text-gray-900"
                numberOfLines={1}
              >
                {item.title}
              </Text>
              {!item.read && (
                <View className="ml-2 w-2 h-2 rounded-full bg-indigo-500" />
              )}
            </View>
            {!!when && (
              <Text
                className="text-[11px] text-gray-500 ml-2"
                numberOfLines={1}
              >
                {when}
              </Text>
            )}
          </View>

          {!!item.subtitle && (
            <Text
              className="text-[12px] text-gray-600 mt-0.5"
              numberOfLines={2}
            >
              {item.subtitle}
            </Text>
          )}

          <View className="mt-2 mr-auto">
            <StatusChip action={item.action} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const mapNotification = (n) => {
  const dt = n?.data || {};
  const notifType = dt?.type || "notification";
  const title = dt?.title || "Notification";
  const subtitle = dt?.body || "";
  const action = deriveAction(dt?.title, dt?.body); // accepted | rejected | pending | info
  const at = n?.created_at;
  const read = !!n?.read_at;

  return {
    id: n?.id || String(Math.random()),
    notifType,
    title,
    subtitle,
    action,
    at,
    read,
    original: n,
  };
};

/* =================== MAIN COMPONENT =================== */
export default function RecentActivity({ onItemPress }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { items: notifications = [], loading } = useSelector(
    (state) => state?.notifications || {}
  );

  useEffect(() => {
    if (user?.id) {
      dispatch({ type: "FETCH_NOTIFICATIONS", payload: { id: user.id } });
    }
  }, [dispatch, user?.id]);

  // map & sort newest first
  const data = useMemo(() => {
    const arr = Array.isArray(notifications) ? notifications : [];
    return arr
      .map(mapNotification)
      .slice(0, 4)
      .sort((a, b) => new Date(b.at) - new Date(a.at));
  }, [notifications]);

  return (
    <View className="px-0">
      <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <View className="px-4 pt-4 pb-2">
          <Text className="text-[15px] font-bold text-gray-900">
            Recent activity
          </Text>
          <Text className="text-[12px] text-gray-500 mt-0.5">
            Event updates and connection requests
          </Text>
        </View>
        {loading ? (
          <View className="px-0">
            {[0, 1, 2, 3].map((i) => (
              <ActivityItemSkeleton key={i} isLast={i === 3} />
            ))}
          </View>
        ) : data.length === 0 ? (
          <View className="px-4 py-6">
            <Text className="text-[12px] text-gray-500">
              No recent activity
            </Text>
          </View>
        ) : (
          data.map((item, idx) => (
            <ActivityItem
              key={item.id}
              item={item}
              isLast={idx === data.length - 1}
              onPress={onItemPress}
            />
          ))
        )}
      </View>
    </View>
  );
}
