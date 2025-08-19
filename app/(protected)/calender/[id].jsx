import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

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
const DOW_LETTERS = ["M", "T", "W", "T", "F", "S", "S"]; // Monday-first

const isToday = (d) => {
  const t = new Date();
  return (
    d.getDate() === t.getDate() &&
    d.getMonth() === t.getMonth() &&
    d.getFullYear() === t.getFullYear()
  );
};
const ymd = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

// Parse "YYYY-MM-DD HH:mm:ss" as local time
const parseSQLDateTimeLocal = (s = "") => new Date(s.replace(" ", "T"));

// 12-hour time like "1:05 PM"
const fmtTime = (d) =>
  d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

// Make 6x7 grid (Mon-first)
function makeGrid(year, month) {
  const out = [];
  const first = new Date(year, month, 1);
  const monIndex = (first.getDay() + 6) % 7; // Mon=0
  const start = new Date(year, month, 1 - monIndex);
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push({
      date: d,
      inMonth: d.getMonth() === month,
      isToday: isToday(d),
      key: `${i}-${d.getTime()}`,
    });
  }
  return out;
}

// Visuals for status
const statusVisual = (status = "") => {
  const s = String(status || "").toLowerCase();
  if (s === "accepted" || s === "confirmed") {
    return {
      bg: "#DCFCE7",
      fg: "#166534",
      icon: "checkmark-circle-outline",
      label: "Accepted",
    };
  }
  if (s === "pending") {
    return {
      bg: "#FEF9C3",
      fg: "#92400E",
      icon: "time-outline",
      label: "Pending",
    };
  }
  if (s === "rejected" || s === "cancelled" || s === "canceled") {
    return {
      bg: "#FEE2E2",
      fg: "#991B1B",
      icon: "close-circle-outline",
      label: "Cancelled",
    };
  }
  return {
    bg: "#E5E7EB",
    fg: "#374151",
    icon: "ellipse-outline",
    label: s || "Unknown",
  };
};

/* ---------- Small bits ---------- */
function EventRow({ event }) {
  const studentName = event?.student?.name || "";
  const title = event?.title || "Untitled";
  const desc = event?.description || "";
  const when = parseSQLDateTimeLocal(event?.scheduled_at);
  const timeText = fmtTime(when);
  const v = statusVisual(event?.status);

  return (
    <View className="flex-row items-center p-3 mb-3 rounded-2xl bg-white border border-gray-100 shadow-sm">
      <View
        className="w-10 h-10 rounded-full mr-3 items-center justify-center"
        style={{ backgroundColor: "#EEF2FF" }}
      >
        <Ionicons name="book-outline" size={16} color="#4F46E5" />
      </View>

      <View className="flex-1">
        <Text
          className="text-[14px] font-semibold text-gray-900"
          numberOfLines={1}
        >
          {title}
        </Text>

        <View className="mt-1 flex-row items-center gap-2">
          <View className="self-start px-2 py-0.5 rounded-md bg-gray-100 flex-row items-center">
            <Ionicons name="time-outline" size={12} color="#374151" />
            <Text className="ml-1 text-[11px] text-gray-700">{timeText}</Text>
          </View>

          {!!studentName && (
            <View className="self-start px-2 py-0.5 rounded-md bg-gray-100 flex-row items-center">
              <Ionicons name="person-outline" size={12} color="#374151" />
              <Text
                className="ml-1 text-[11px] text-gray-700"
                numberOfLines={1}
              >
                {studentName}
              </Text>
            </View>
          )}

          <View
            className="self-start px-2 py-0.5 rounded-md flex-row items-center"
            style={{ backgroundColor: v.bg }}
          >
            <Ionicons name={v.icon} size={12} color={v.fg} />
            <Text
              className="ml-1 text-[11px] font-semibold"
              style={{ color: v.fg }}
            >
              {v.label}
            </Text>
          </View>
        </View>

        {!!desc && (
          <Text className="mt-1 text-[12px] text-gray-500" numberOfLines={2}>
            {desc}
          </Text>
        )}
      </View>

      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </View>
  );
}

/* ---------- Screen ---------- */
export default function StudentCalendarScreen() {
  const { specificStudentEvents, specificStudentEventsLoading } = useSelector(
    (state) => state.scheduleTuitionEvents
  );
  const dispatch = useDispatch();
  const { studentId, studentName, customId } = useLocalSearchParams();

  // current month/year/day
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(ymd(today));

  // Fetch events for the student
  useEffect(() => {
    if (!studentId) return;
    dispatch({
      type: "FETCH_SPECIFIC_STUDENT_EVENTS",
      payload: { student_id: studentId },
    });
  }, [studentId, dispatch]);

  // Group events by YYYY-MM-DD
  const eventsByDay = useMemo(() => {
    const map = {};
    (specificStudentEvents || []).forEach((e) => {
      if (!e?.scheduled_at) return;
      const d = parseSQLDateTimeLocal(e.scheduled_at);
      const key = ymd(d);
      if (!map[key]) map[key] = [];
      map[key].push(e);
    });
    // Sort each day by time asc
    Object.values(map).forEach((arr) =>
      arr.sort(
        (a, b) =>
          parseSQLDateTimeLocal(a.scheduled_at) -
          parseSQLDateTimeLocal(b.scheduled_at)
      )
    );
    return map;
  }, [specificStudentEvents]);

  const grid = useMemo(() => makeGrid(year, month), [year, month]);
  const title = `${MONTHS[month]} ${year}`;
  const eventsForSelectedDay = eventsByDay[selectedDate] || [];

  const goPrev = () =>
    setMonth((m) => (m === 0 ? (setYear((y) => y - 1), 11) : m - 1));
  const goNext = () =>
    setMonth((m) => (m === 11 ? (setYear((y) => y + 1), 0) : m + 1));
  const goToday = () => {
    const t = new Date();
    setMonth(t.getMonth());
    setYear(t.getFullYear());
    setSelectedDate(ymd(t));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== Header ===== */}
        <View className="mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons
                name="calendar-clear-outline"
                size={18}
                color="#4F46E5"
              />
              <Text
                className="ml-2 text-[16px] font-extrabold text-gray-900"
                numberOfLines={1}
              >
                {studentName ? `${studentName} · Calendar` : "Calendar"}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/calender/tuitionEventForm",
                  params: {
                    studentName: studentName,
                    customId: customId,
                    studentId: studentId,
                  },
                })
              }
              className="px-3 py-2 rounded-xl flex-row items-center"
              style={{ backgroundColor: "#EEF2FF" }}
            >
              <Ionicons name="add-circle" size={18} color="#4F46E5" />
              <Text
                className="ml-1 text-[13px] font-semibold"
                style={{ color: "#4F46E5" }}
              >
                Add Event
              </Text>
            </TouchableOpacity>
          </View>

          {/* ID pill */}
          {!!customId && (
            <View
              className="mt-2 self-start px-2.5 py-1 rounded-full flex-row items-center"
              style={{ backgroundColor: "#F1F5F9" }}
            >
              <Ionicons name="card-outline" size={12} color="#334155" />
              <Text
                className="ml-1 text-[11px] font-semibold"
                style={{ color: "#334155" }}
              >
                {customId}
              </Text>
            </View>
          )}
        </View>

        {/* Month controls */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-[13px] font-semibold text-gray-700">
            {title}
          </Text>
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
            {DOW_LETTERS.map((l, i) => (
              <View key={i} className="w-10 items-center">
                <Text className="text-[11px] tracking-wider text-gray-400">
                  {l}
                </Text>
              </View>
            ))}
          </View>

          {/* Day grid */}
          <View className="px-3 pb-4">
            {Array.from({ length: 6 }).map((_, row) => (
              <View
                key={row}
                className="flex-row justify-between border-top border-gray-100"
              >
                {grid.slice(row * 7, row * 7 + 7).map((cell) => {
                  const key = ymd(cell.date);
                  const selected = selectedDate === key;
                  const hasEvents = !!eventsByDay[key]?.length;

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
                    >
                      <View className={ballClasses}>
                        <Text
                          className="text-[13px] font-medium"
                          style={numberStyle}
                        >
                          {cell.date.getDate()}
                        </Text>
                      </View>
                      {hasEvents ? (
                        <View
                          className="w-1.5 h-1.5 rounded-full mt-1"
                          style={{
                            backgroundColor: selected ? "#111827" : "#4F46E5",
                            opacity: selected ? 1 : 0.85,
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

          {specificStudentEventsLoading ? (
            <View className="p-6 border border-gray-100 rounded-2xl items-center">
              <ActivityIndicator />
              <Text className="mt-2 text-gray-600">Loading events…</Text>
            </View>
          ) : eventsForSelectedDay.length === 0 ? (
            <View className="p-6 border border-gray-100 rounded-2xl items-center">
              <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
              <Text className="mt-1 text-gray-600">No events on this day.</Text>
            </View>
          ) : (
            eventsForSelectedDay.map((e) => <EventRow key={e.id} event={e} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
