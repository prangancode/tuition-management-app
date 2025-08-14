import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/* ---------------- Dummy Data ---------------- */
const STUDENTS = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "01734627514",
    subjects: ["Mathematics", "Physics", "English"],
    avatarColor: "#6D28D9",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "01812345678",
    subjects: ["Chemistry", "Biology"],
    avatarColor: "#10B981",
  },
  {
    id: "3",
    name: "Alex Thompson",
    email: "alex.t@example.com",
    phone: "01699887766",
    subjects: ["Advanced Mathematics"],
    avatarColor: "#F81D7F",
  },
];

/* ---------------- Small UI Bits ---------------- */
const SubjectChip = ({ label }) => (
  <View
    className="px-3 py-1 rounded-full mr-2 mb-2 border"
    style={{ backgroundColor: "#EEF2FF", borderColor: "#E0E7FF" }}
  >
    <Text className="text-[11px] font-semibold" style={{ color: "#4338CA" }}>
      {label}
    </Text>
  </View>
);

const InfoRow = ({ icon, color, label, value }) => (
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

/* ---------------- Card: Active Student ---------------- */
const StudentRow = ({ item, onViewCalendar }) => (
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

/* ---------------- Screen ---------------- */
const ScheduleScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STUDENTS;
    return STUDENTS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.subjects?.some((x) => x.toLowerCase().includes(q))
    );
  }, [query]);

  const Header = (
    <>
      {/* Hero header */}
      <View className="bg-indigo-600 px-4 pt-5 pb-6 rounded-b-2xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-extrabold">Schedule</Text>
          <TouchableOpacity
            className="bg-white/90 px-3 py-2 rounded-xl flex-row items-center"
            onPress={() => {}}
          >
            <Ionicons name="person-add-outline" size={18} color="#111827" />
            <Text className="ml-1 font-semibold text-gray-900">
              Add Student
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white mt-1 opacity-90">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>

        {/* Search */}
        <View className="mt-4 bg-white/15 rounded-xl px-3 py-2 flex-row items-center border border-white/20">
          <Ionicons name="search" size={16} color="white" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search students, subjects, phone…"
            placeholderTextColor="rgba(255,255,255,0.85)"
            className="ml-2 text-white flex-1"
          />
        </View>

        {/* Small stats strip */}
        <View className="mt-4 flex-row gap-2">
          <View className="flex-1 bg-white/15 rounded-xl p-3">
            <Text className="text-white/90 text-xs">Active Students</Text>
            <Text className="text-white font-bold text-lg">
              {STUDENTS.length}
            </Text>
          </View>
          <View className="flex-1 bg-white/15 rounded-xl p-3">
            <Text className="text-white/90 text-xs">Today</Text>
            <Text className="text-white font-bold text-lg">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
      </View>

      {/* Section title */}
      <View className="px-4 mt-4 flex-row items-center gap-2">
        <View
          className="w-8 h-8 rounded-xl items-center justify-center"
          style={{ backgroundColor: "#EEF2FF" }}
        >
          <Ionicons name="people-outline" size={18} color="#4F46E5" />
        </View>
        <Text className="text-sm font-semibold text-gray-900">
          Active Students
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={filtered}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <StudentRow
              item={item}
              onViewCalendar={() =>
                router.push({
                  pathname: "/calender/[id]",
                  params: { id: item.id },
                })
              }
            />
          </View>
        )}
        ListHeaderComponent={Header}
        ListHeaderComponentStyle={{ marginBottom: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
};

export default ScheduleScreen;
