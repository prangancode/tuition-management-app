import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

/* ------------ Tab config & filter mapping ------------ */
const TABS = [
  {
    key: "active",
    label: "Active",
    icon: "checkmark-done-circle-outline",
    color: "#10B981",
  },
  { key: "pending", label: "Pending", icon: "time-outline", color: "#F59E0B" },
  {
    key: "archived",
    label: "Archived",
    icon: "archive-outline",
    color: "#6B7280",
  },
];

const FILTERS_BY_TAB = {
  active: { status: "accepted", is_active: 1 },
  pending: { status: "pending" },
  archived: { status: "accepted", is_active: 0 },
};

/* ------------ Small helpers ------------ */
const initialsFrom = (name = "") =>
  (name.match(/\b\w/g) || []).slice(0, 2).join("").toUpperCase();
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
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

/* ------------ Small UI bits ------------ */
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

/* ------------ Card (reads API shape directly) ------------ */
const StudentCard = ({ item, onView, onEdit, onDelete }) => {
  const s = item?.student || {};
  const td = item?.tuition_details || {};
  const initials = initialsFrom(s.name || s.custom_id || "");
  const avatarColor = stringToColor(
    s.name || s.custom_id || String(s.id || "")
  );

  // statusKey for pill (for display only)
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
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: avatarColor }}
          >
            <Text className="text-white font-bold">{initials || "ST"}</Text>
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
              <SubjectChip key={sub} label={String(sub)} />
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
};

/* ------------ Screen ------------ */
export default function StudentsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    connectionRequests = [],
    pagination,
    loading,
  } = useSelector((s) => s.studentManagement);

  const [activeTab, setActiveTab] = useState("active");
  const [query, setQuery] = useState("");
  const searchTimerRef = useRef(null);

  // Initial + tab change fetch
  useEffect(() => {
    const filters = {
      ...FILTERS_BY_TAB[activeTab],
      per_page: 20,
      page: 1,
    };
    if (query.trim()) filters.search = query.trim();
    dispatch({ type: "FETCH_CONNECTION_REQUESTS", payload: { filters } });
    // clear any pending debounce when tab changes
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
      searchTimerRef.current = null;
    }
  }, [activeTab, dispatch]); // eslint-disable-line

  // Debounced search (300ms)
  const onChangeQuery = (text) => {
    setQuery(text);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      const filters = {
        ...FILTERS_BY_TAB[activeTab],
        per_page: 10,
        page: 1,
      };
      if (text.trim()) filters.search = text.trim();
      dispatch({ type: "FETCH_CONNECTION_REQUESTS", payload: { filters } });
    }, 300);
  };

  const onView = (conn) => {
    router.push({
      pathname: "/studentDetails",
      params: {
        // pass the entire object as a string
        conn: encodeURIComponent(JSON.stringify(conn)),
      },
    });
  };

  const onEdit = (item) =>
    Alert.alert("Edit", `Edit ${item?.student?.name || ""}`);
  const onDelete = (item) =>
    Alert.alert("Delete", `Delete ${item?.student?.name || ""}?`);

  const Header = (
    <>
      {/* Hero header */}
      <View className="bg-emerald-600 px-4 pt-5 pb-6 rounded-b-2xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-extrabold">
            My Students
          </Text>
          <TouchableOpacity className="bg-white/90 px-3 py-2 rounded-xl flex-row items-center">
            <Ionicons name="person-add-outline" size={16} color="#111827" />
            <Text className="ml-1 font-semibold text-gray-900">Add</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View
          className="mt-4 rounded-xl px-3 py-2 flex-row items-center border"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          <Ionicons name="search" size={16} color="white" />
          <TextInput
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Search by name, email, ID, phone, subject…"
            placeholderTextColor="rgba(255,255,255,0.85)"
            className="ml-2 text-white flex-1"
            returnKeyType="search"
          />
          {loading ? (
            <ActivityIndicator size="small" />
          ) : !!query ? (
            <TouchableOpacity onPress={() => onChangeQuery("")}>
              <Ionicons name="close-circle" size={18} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4 mt-3">
        <View className="bg-white rounded-2xl shadow border border-gray-100">
          <View className="flex-row p-2">
            {TABS.map((t) => {
              const isActive = activeTab === t.key;
              const countChip = isActive
                ? connectionRequests?.length || 0
                : null; // only show count for active tab
              return (
                <TouchableOpacity
                  key={t.key}
                  onPress={() => setActiveTab(t.key)}
                  className={`flex-row items-center px-3 py-2 rounded-xl mr-2 ${isActive ? "" : "opacity-70"}`}
                  style={{
                    backgroundColor: isActive ? `${t.color}22` : "transparent",
                  }}
                >
                  <Ionicons name={t.icon} size={16} color={t.color} />
                  <Text
                    className="ml-1 font-semibold"
                    style={{ color: t.color }}
                  >
                    {t.label}
                  </Text>
                  {countChip !== null && (
                    <View
                      className="ml-2 px-1.5 rounded-md"
                      style={{ backgroundColor: `${t.color}22` }}
                    >
                      <Text className="text-[11px]" style={{ color: t.color }}>
                        {countChip}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );

  const EmptyState = (
    <View className="px-4 pt-6">
      <Text className="text-gray-500">No students found.</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={connectionRequests}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <StudentCard
              item={item}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </View>
        )}
        ListHeaderComponent={Header}
        ListFooterComponent={
          loading ? (
            <View className="py-4 items-center">
              <ActivityIndicator />
              <Text className="mt-2 text-xs text-gray-500">Loading…</Text>
            </View>
          ) : (
            <View style={{ height: 16 }} />
          )
        }
        ListEmptyComponent={!loading ? EmptyState : null}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
}
