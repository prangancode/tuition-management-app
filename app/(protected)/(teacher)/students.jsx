import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/* ------------ Sample Data ------------ */
const STUDENTS = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    custom_id: "S01734627514",
    phone: "01734627514",
    class_level: "Class 9",
    initials: "SJ",
    avatarColor: "#6D28D9",
    status: "active",
    subjects: ["Mathematics", "Physics"],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    custom_id: "S01987654321",
    phone: "01812345678",
    class_level: "Class 10",
    initials: "MC",
    avatarColor: "#10B981",
    status: "active",
    subjects: ["Chemistry", "Biology"],
  },
  {
    id: "3",
    name: "Alex Thompson",
    email: "alex.t@example.com",
    custom_id: "S01234567890",
    phone: "01699887766",
    class_level: "Class 12",
    initials: "AT",
    avatarColor: "#F81D7F",
    status: "pending",
    subjects: ["Advanced Mathematics"],
  },
  {
    id: "4",
    name: "Priya Das",
    email: "priya.d@example.com",
    custom_id: "S01827363828",
    phone: "01722223333",
    class_level: "Class 8",
    initials: "PD",
    avatarColor: "#2563EB",
    status: "archived",
    subjects: ["Mathematics"],
  },
];

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

/* ------------ Small UI bits ------------ */
const StatusPill = ({ status }) => {
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
  }[status];

  return (
    <View
      className={`px-2.5 py-1.5 rounded-full flex-row items-center ${map.bg}`}
    >
      <Ionicons name={map.ic} size={14} color={map.color} />
      <Text className={`ml-1 text-xs font-semibold ${map.txt}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
        {value}
      </Text>
    </View>
  </View>
);

const ActionButton = ({ icon, color, bg, label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1"
    style={{ backgroundColor: bg }}
  >
    <Ionicons name={icon} size={16} color={color} />
    <Text className="text-[12px] font-semibold" style={{ color }}>
      {label}
    </Text>
  </TouchableOpacity>
);

/* ------------ Card ------------ */
const StudentCard = ({ item, onView, onEdit, onDelete }) => (
  <View className="bg-white rounded-2xl p-4  border border-gray-100 shadow-sm">
    {/* Top row: avatar, name/email, status */}
    <View className="flex-row justify-between items-start">
      <View className="flex-row items-center">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: item.avatarColor }}
        >
          <Text className="text-white font-bold">{item.initials}</Text>
        </View>
        <View>
          <Text className="text-[16px] font-semibold text-gray-900">
            {item.name}
          </Text>
          <Text className="text-[12px] text-gray-500">{item.email}</Text>
        </View>
      </View>
      <StatusPill status={item.status} />
    </View>

    {/* Details grid */}
    <View className="mt-3 gap-3">
      <View className="flex-row gap-3">
        <InfoCell
          icon="card-outline"
          color="#4F46E5"
          label="Student ID"
          value={item.custom_id}
        />
        <InfoCell
          icon="call-outline"
          color="#0EA5E9"
          label="Phone"
          value={item.phone}
        />
      </View>
      <View className="flex-row gap-3">
        <InfoCell
          icon="school-outline"
          color="#10B981"
          label="Class Level"
          value={item.class_level}
        />
        <View className="flex-1" />
      </View>
    </View>

    {/* Subjects */}
    {item.subjects?.length ? (
      <View className="mt-3">
        <Text className="text-[11px] text-gray-500 mb-1">Subjects</Text>
        <View className="flex-row flex-wrap">
          {item.subjects.map((s) => (
            <SubjectChip key={s} label={s} />
          ))}
        </View>
      </View>
    ) : null}

    {/* Actions */}
    <View className="mt-4 flex-row gap-2">
      <ActionButton
        icon="eye-outline"
        label="View"
        color="#0369A1"
        bg="#E0F2FE"
        onPress={() => onView(item)}
      />
      <ActionButton
        icon="create-outline"
        label="Edit"
        color="#4338CA"
        bg="#EDE9FE"
        onPress={() => onEdit(item)}
      />
      <ActionButton
        icon="trash-outline"
        label="Delete"
        color="#BE123C"
        bg="#FFE4E6"
        onPress={() => onDelete(item)}
      />
    </View>
  </View>
);

/* ------------ Screen ------------ */
const StudentsScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () =>
      TABS.reduce((acc, t) => {
        acc[t.key] = STUDENTS.filter((s) => s.status === t.key).length;
        return acc;
      }, {}),
    []
  );

  const filtered = useMemo(() => {
    const base = STUDENTS.filter((s) => s.status === activeTab);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.custom_id.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.subjects?.some((sub) => sub.toLowerCase().includes(q))
    );
  }, [activeTab, query]);

  const onView = () => router.push("/studentDetails");
  const onEdit = (item) => Alert.alert("Edit", `Edit ${item.name}`);
  const onDelete = (item) => Alert.alert("Delete", `Delete ${item.name}?`);

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
        <View className="mt-4 bg-white/15 rounded-xl px-3 py-2 flex-row items-center border border-white/20">
          <Ionicons name="search" size={16} color="white" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name, email, ID, phone, subject…"
            placeholderTextColor="rgba(255,255,255,0.8)"
            className="ml-2 text-white flex-1"
          />
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4 mt-3">
        <View className="bg-white rounded-2xl shadow border border-gray-100">
          <View className="flex-row p-2">
            {TABS.map((t) => {
              const isActive = activeTab === t.key;
              return (
                <TouchableOpacity
                  key={t.key}
                  onPress={() => setActiveTab(t.key)}
                  className={`flex-row items-center px-3 py-2 rounded-xl mr-2 ${
                    isActive ? "" : "opacity-70"
                  }`}
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
                  <View
                    className="ml-2 px-1.5 rounded-md"
                    style={{ backgroundColor: `${t.color}22` }}
                  >
                    <Text className="text-[11px]" style={{ color: t.color }}>
                      {counts[t.key] || 0}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={filtered}
        keyExtractor={(it) => it.id}
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
        ListFooterComponent={<View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
};

export default StudentsScreen;
