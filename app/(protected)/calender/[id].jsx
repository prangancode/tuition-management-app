import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, Stack } from "expo-router";

/* ---------- Dummy data (swap with API/store) ---------- */
const STUDENTS = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Chen" },
  { id: "3", name: "Alex Thompson" },
];

// date: [{ id, name, time, avatar }]
const EVENTS = {
  "2025-01-21": [
    {
      id: "1",
      name: "Leslie Alexander",
      time: "1:00 PM - 2:30 PM",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: "2",
      name: "Michael Foster",
      time: "3:00 PM - 4:30 PM",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: "3",
      name: "Dries Vincent",
      time: "5:00 PM - 6:30 PM",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: "4",
      name: "Lindsay Walton",
      time: "7:00 PM - 8:30 PM",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
  ],
};

/* ---------- Helpers ---------- */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW_LETTERS = ["M", "T", "W", "T", "F", "S", "S"]; // Monday first

const isToday = (d) => {
  const t = new Date();
  return (
    d.getDate() === t.getDate() &&
    d.getMonth() === t.getMonth() &&
    d.getFullYear() === t.getFullYear()
  );
};
const ymd = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Monday-first 6x7 grid
function makeGrid(year, month) {
  const out = [];
  const first = new Date(year, month, 1);
  const monIndex = (first.getDay() + 6) % 7; // 0..6, Mon=0
  const start = new Date(year, month, 1 - monIndex);
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push({
      date: d,
      inMonth: d.getMonth() === month,
      isToday: isToday(d),
      key: `${i}-${d.getTime()}`, // unique and stable
    });
  }
  return out;
}

/* ---------- Tiny bits ---------- */
const EventRow = ({ name, time, avatar, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    className="flex-row items-center p-3 mb-3 rounded-2xl bg-white border border-gray-100 shadow-sm"
  >
    {avatar ? (
      <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full mr-3" />
    ) : (
      <View
        className="w-10 h-10 rounded-full mr-3 items-center justify-center"
        style={{ backgroundColor: "#E5E7EB" }}
      >
        <Ionicons name="person" size={16} color="#374151" />
      </View>
    )}

    <View className="flex-1">
      <Text className="text-[14px] font-semibold text-gray-900">{name}</Text>
      <View className="mt-1 self-start px-2 py-0.5 rounded-md bg-gray-100 flex-row items-center">
        <Ionicons name="time-outline" size={12} color="#374151" />
        <Text className="ml-1 text-[11px] text-gray-700">{time}</Text>
      </View>
    </View>

    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

/* ---------- Screen ---------- */
export default function StudentCalendarScreen() {
  const { id } = useLocalSearchParams();
  const student = STUDENTS.find((s) => s.id === id) || { name: "Student" };

  // ▶ Default to **current** month/year/day
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(ymd(today));

  const grid = useMemo(() => makeGrid(year, month), [year, month]);
  const title = `${MONTHS[month]} ${year}`;
  const eventsForSelectedDay = EVENTS[selectedDate] || [];

  const goPrev = () =>
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });

  const goNext = () =>
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });

  const goToday = () => {
    const t = new Date();
    setMonth(t.getMonth());
    setYear(t.getFullYear());
    setSelectedDate(ymd(t));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{ title: `${student.name} • Calendar`, headerShown: false }}
      />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        {/* Month header */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-[16px] font-bold text-gray-900">{title}</Text>
          <View className="flex-row items-center">
            <TouchableOpacity className="px-2 py-1 rounded-lg" onPress={goPrev}>
              <Ionicons name="chevron-back" size={18} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity className="px-2 py-1 rounded-lg" onPress={goNext}>
              <Ionicons name="chevron-forward" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar card */}
        <View className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Week letters */}
          <View className="flex-row justify-between px-4 pt-4 pb-2">
            {DOW_LETTERS.map(
              (
                l,
                i /* ✅ use index as key to avoid duplicate key warning */
              ) => (
                <View key={i} className="w-10 items-center">
                  <Text className="text-[11px] tracking-wider text-gray-400">
                    {l}
                  </Text>
                </View>
              )
            )}
          </View>

          {/* Day grid (6 rows) */}
          <View className="px-3 pb-4">
            {Array.from({ length: 6 }).map((_, row) => (
              <View
                key={row}
                className="flex-row justify-between border-t border-gray-100"
              >
                {grid.slice(row * 7, row * 7 + 7).map((cell) => {
                  const key = ymd(cell.date);
                  const selected = selectedDate === key;
                  const hasEvents = !!EVENTS[key]?.length;

                  const ballClasses = [
                    "w-10 h-10 rounded-full items-center justify-center",
                    selected ? "bg-gray-900" : "",
                    !selected && cell.isToday ? "border border-indigo-500" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  const numberStyle = selected
                    ? { color: "#FFFFFF" }
                    : { color: cell.inMonth ? "#111827" : "#9CA3AF" };

                  return (
                    <TouchableOpacity
                      key={cell.key}
                      className="py-2 w-10 items-center"
                      onPress={() => setSelectedDate(key)}
                      accessibilityRole="button"
                      accessibilityLabel={`Select ${cell.date.toDateString()}`}
                    >
                      <View className={ballClasses}>
                        <Text
                          className="text-[13px] font-medium"
                          style={numberStyle}
                        >
                          {cell.date.getDate()}
                        </Text>
                      </View>

                      {/* event dot */}
                      {hasEvents ? (
                        <View
                          className="w-1.5 h-1.5 rounded-full mt-1"
                          style={{
                            backgroundColor: selected ? "#FFFFFF" : "#111827",
                            opacity: selected ? 0.9 : 0.6,
                          }}
                        />
                      ) : (
                        <View className="h-1.5 mt-1" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Today shortcut */}
          <TouchableOpacity
            onPress={goToday}
            className="mx-4 mb-4 self-start px-3 py-1.5 rounded-lg bg-gray-100"
          >
            <Text className="text-[12px] font-semibold text-gray-700">
              Today
            </Text>
          </TouchableOpacity>
        </View>

        {/* Schedule list */}
        <View className="mt-6">
          <Text className="text-[13px] font-semibold text-gray-900 mb-4">
            Schedule for{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>

          {eventsForSelectedDay.length === 0 ? (
            <View className="p-6 border border-gray-100 rounded-2xl items-center">
              <Text className="text-gray-600">No events on this day.</Text>
            </View>
          ) : (
            eventsForSelectedDay.map((e) => (
              <EventRow
                key={e.id}
                name={e.name}
                time={e.time}
                avatar={e.avatar}
                onPress={() => {}}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
