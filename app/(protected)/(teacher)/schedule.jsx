import { useMemo, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { useRouter } from "expo-router";
import StudentRow from "../../../components/Teacher/ScheduleScreen/StudentRow";
import Header from "../../../components/Teacher/ScheduleScreen/Header";

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
        ListHeaderComponent={
          <Header query={query} setQuery={setQuery} STUDENTS={STUDENTS} />
        }
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
