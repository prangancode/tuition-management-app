import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// ----- Data -----
const STUDENTS = [
  {
    id: "1",
    name: "Sarah Johnson",
    grade: "Grade 12",
    initials: "SJ",
    avatarColor: "#6D28D9",
    status: "active",
    rating: "Excellent",
    subjects: ["Mathematics", "Physics"],
    streakDays: 12,
    totalClasses: 24,
    topPerformer: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    grade: "Grade 11",
    initials: "MC",
    avatarColor: "#10B981",
    status: "active",
    rating: "Good",
    subjects: ["Chemistry", "Biology"],
    streakDays: 8,
    totalClasses: 32,
    topPerformer: false,
  },
  {
    id: "3",
    name: "Alex Thompson",
    grade: "Grade 12",
    initials: "AT",
    avatarColor: "#F81D7F",
    status: "active",
    rating: "Excellent",
    subjects: ["Advanced Mathematics"],
    streakDays: 15,
    totalClasses: 28,
    topPerformer: true,
  },
  {
    id: "4",
    name: "Priya Das",
    grade: "Grade 10",
    initials: "PD",
    avatarColor: "#2563EB",
    status: "pending",
    rating: "—",
    subjects: ["Mathematics"],
    streakDays: 0,
    totalClasses: 0,
    topPerformer: false,
  },
  {
    id: "5",
    name: "Leo Martin",
    grade: "Grade 12",
    initials: "LM",
    avatarColor: "#D97706",
    status: "archived",
    rating: "Good",
    subjects: ["Physics"],
    streakDays: 0,
    totalClasses: 18,
    topPerformer: false,
  },
];

const TABS = [
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "archived", label: "Archived" },
];

// ----- Small UI bits -----
const RatingPill = ({ rating }) => {
  const conf =
    rating === "Excellent"
      ? { bg: "bg-emerald-100", txt: "text-emerald-700", icon: "star-outline" }
      : rating === "Good"
        ? { bg: "bg-indigo-100", txt: "text-indigo-700", icon: "trending-up" }
        : { bg: "bg-gray-100", txt: "text-gray-600", icon: "minus" };
  return (
    <View
      className={`flex-row items-center px-2.5 py-1 rounded-full ${conf.bg}`}
    >
      <MaterialCommunityIcons name={conf.icon} size={14} color="black" />
      <Text className={`ml-1 text-xs font-semibold ${conf.txt}`}>{rating}</Text>
    </View>
  );
};

const StatusPill = ({ status }) => {
  const map = {
    active: { bg: "bg-black", txt: "text-white", label: "Active" },
    pending: { bg: "bg-amber-200", txt: "text-amber-900", label: "Pending" },
    archived: { bg: "bg-gray-200", txt: "text-gray-700", label: "Archived" },
  }[status];
  return (
    <View className={`px-2.5 py-1 rounded-full ${map.bg}`}>
      <Text className={`text-xs font-semibold ${map.txt}`}>{map.label}</Text>
    </View>
  );
};

const SubjectChip = ({ label }) => (
  <View className="bg-indigo-50 px-3 py-1 rounded-full mr-2 mb-2">
    <Text className="text-indigo-700 text-xs font-semibold">{label}</Text>
  </View>
);

const StudentCard = ({ item }) => (
  <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow">
    <View className="flex-row justify-between">
      <View className="flex-row items-center">
        {/* Avatar */}
        <View className="relative mr-3">
          <View
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: item.avatarColor }}
          >
            <Text className="text-white font-bold">{item.initials}</Text>
          </View>
          {item.topPerformer && (
            <View className="absolute -right-1 -top-1 bg-amber-400 w-5 h-5 rounded-full items-center justify-center">
              <AntDesign name="staro" size={12} color="white" />
            </View>
          )}
        </View>

        <View>
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-gray-500">{item.grade}</Text>
          <View className="flex-row mt-2">
            <RatingPill rating={item.rating} />
            <View className="w-2" />
            <StatusPill status={item.status} />
          </View>
        </View>
      </View>

      <TouchableOpacity className="p-1">
        <Feather name="more-vertical" size={18} color="#9CA3AF" />
      </TouchableOpacity>
    </View>

    {/* Subjects */}
    {item.subjects?.length ? (
      <View className="flex-row flex-wrap mt-3">
        {item.subjects.map((s) => (
          <SubjectChip key={s} label={s} />
        ))}
      </View>
    ) : null}

    {/* Bottom row (no progress bar) */}
    <View className="flex-row justify-between items-center mt-3">
      <View className="flex-row items-center">
        <Text className="mr-1">🔥</Text>
        <Text className="text-gray-600">{item.streakDays} day streak</Text>
      </View>
      <Text className="text-gray-600">{item.totalClasses} total classes</Text>
    </View>
  </View>
);

// ----- Screen -----
const StudentsScreen = () => {
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
    const list = STUDENTS.filter((s) => s.status === activeTab);
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.subjects?.some((sub) => sub.toLowerCase().includes(q))
    );
  }, [activeTab, query]);

  // Header + tabs (used as FlatList header)
  const Header = (
    <>
      {/* Green header */}
      <View className="bg-emerald-600 px-4 pt-2 pb-5 rounded-b-2xl">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-extrabold">
              My Students
            </Text>
            <Text className="text-white/90 mt-1">
              {STUDENTS.length} amazing learners
            </Text>
          </View>
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
            placeholder="Search students, subjects..."
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
                  className={`px-4 py-2 rounded-full mr-2 ${
                    isActive ? "bg-emerald-100" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`${isActive ? "text-emerald-700" : "text-gray-600"} font-semibold`}
                  >
                    {t.label}{" "}
                    <Text className="text-gray-400 font-normal">
                      {counts[t.key] ? ` ${counts[t.key]}` : ""}
                    </Text>
                  </Text>
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
            <StudentCard item={item} />
          </View>
        )}
        ListHeaderComponent={Header}
        ListFooterComponent={<View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
};

export default StudentsScreen;
