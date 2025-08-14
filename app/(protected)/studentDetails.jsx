import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/* ---------- dummy data (shape matches your web version) ---------- */
const sample = {
  status: "active", // active | pending | archived
  is_active: 1,
  student: {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "01734627514",
    custom_id: "S01734627514", // S + 11 digits
    initials: "SJ",
    avatarColor: "#6D28D9",
  },
  tuition_details: {
    tuition_type: "monthly_based", // monthly_based | course
    class_level: "Class 9",
    subject_list: ["Mathematics", "Physics", "English"],
    medium: "English Version",
    institute_name: "ABC Institute",
    address_line: "123 Main St",
    thana: "Dhanmondi",
    district: "Dhaka",
    study_purpose: "Exam Prep",
    // monthly fields:
    tuition_days_per_week: 5,
    hours_per_day: 2,
    days_name: ["Sat", "Mon", "Wed"],
    starting_month: "January 2026",
    salary_per_month: 20000,
    // course fields (for preview switch type above):
    // total_classes_per_course: 24,
    // hours_per_class: 1.5,
    // salary_per_subject: 1200,
    // total_course_completion_salary: 9600,
    // duration: "3 months",
  },
};

/* ---------- helpers ---------- */
const C = {
  indigo: "#4F46E5",
  blue: "#2563EB",
  sky: "#0EA5E9",
  emerald: "#10B981",
  amber: "#F59E0B",
  rose: "#E11D48",
  slate: "#6B7280",
  violet: "#8B5CF6",
};

const labelType = (t) =>
  t === "monthly_based" ? "Monthly Based" : "Course Based";
const money = (n) =>
  `৳ ${Number(n || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
const fmtArr = (a) => (Array.isArray(a) && a.length ? a.join(", ") : "—");
const fullAddress = (t) =>
  [t.address_line, t.thana, t.district].filter(Boolean).join(", ");

/* ---------- small UI atoms ---------- */
const StatusPill = ({ status }) => {
  const map = {
    active: { bg: "#DCFCE7", color: "#065F46", icon: "checkmark-circle" },
    pending: { bg: "#FEF3C7", color: "#92400E", icon: "time" },
    archived: { bg: "#F3F4F6", color: "#111827", icon: "archive" },
  }[status] || { bg: "#F3F4F6", color: "#6B7280", icon: "help-circle" };

  return (
    <View
      className="flex-row items-center px-2.5 py-1.5 rounded-full"
      style={{ backgroundColor: map.bg }}
    >
      <Ionicons name={map.icon} size={14} color={map.color} />
      <Text className="ml-1 text-xs font-semibold" style={{ color: map.color }}>
        {status?.[0]?.toUpperCase() + status?.slice(1)}
      </Text>
    </View>
  );
};

const SectionTitle = ({ icon, color = C.indigo, title, right }) => (
  <View className="flex-row items-center justify-between mb-2">
    <View className="flex-row items-center gap-2">
      <View
        className="w-8 h-8 rounded-xl items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text className="text-sm font-semibold text-gray-900">{title}</Text>
    </View>
    {right}
  </View>
);

const InfoRow = ({ icon, color = C.slate, label, value, onPress }) => (
  <Pressable
    onPress={onPress}
    disabled={!onPress}
    className="flex-row items-start gap-3 py-2"
    style={({ pressed }) => ({ opacity: onPress && pressed ? 0.8 : 1 })}
  >
    <Ionicons name={icon} size={16} color={color} style={{ marginTop: 2 }} />
    <View className="flex-1">
      <Text className="text-[11px] text-gray-500">{label}</Text>
      <Text
        className="text-[13px] font-semibold text-gray-900 mt-0.5"
        numberOfLines={2}
      >
        {value || "—"}
      </Text>
    </View>
  </Pressable>
);

const Chip = ({ label, tone = "indigo" }) => {
  const toneMap = {
    indigo: { bg: "#EEF2FF", color: "#4338CA", border: "#E0E7FF" },
    sky: { bg: "#F0F9FF", color: "#0369A1", border: "#E0F2FE" },
    emerald: { bg: "#ECFDF5", color: "#047857", border: "#D1FAE5" },
  }[tone];
  return (
    <View
      className="px-3 py-1 rounded-full mr-2 mb-2 border"
      style={{ backgroundColor: toneMap.bg, borderColor: toneMap.border }}
    >
      <Text
        className="text-[11px] font-semibold"
        style={{ color: toneMap.color }}
      >
        {label}
      </Text>
    </View>
  );
};

const Stat = ({ label, value, tone = "indigo" }) => {
  const toneMap = {
    indigo: { bg: "#EEF2FF", color: "#3730A3" },
    sky: { bg: "#F0F9FF", color: "#075985" },
    amber: { bg: "#FFFBEB", color: "#92400E" },
    emerald: { bg: "#ECFDF5", color: "#065F46" },
  }[tone];
  return (
    <View
      className="flex-1 p-3 rounded-xl"
      style={{ backgroundColor: toneMap.bg }}
    >
      <Text className="text-[11px]" style={{ color: `${toneMap.color}CC` }}>
        {label}
      </Text>
      <Text
        className="text-base font-semibold mt-0.5"
        style={{ color: toneMap.color }}
      >
        {value}
      </Text>
    </View>
  );
};

/* ---------- main component ---------- */
const StudentDetails = ({ data = sample }) => {
  const { student, tuition_details, status, is_active } = data || {};
  const isMonthly = tuition_details?.tuition_type === "monthly_based";

  const onCall = () => {
    if (!student?.phone) return;
    Linking.openURL(`tel:${student.phone}`).catch(() => {});
  };
  const onMail = () => {
    if (!student?.email) return;
    Linking.openURL(`mailto:${student.email}`).catch(() => {});
  };
  const onDisconnect = () => {
    Alert.alert("Disconnect", `Disconnect ${student?.name}?`, [
      { text: "Cancel" },
      { text: "Disconnect", style: "destructive", onPress: () => {} },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header card */}
        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <View className="flex-row justify-between items-start">
            <View className="flex-row items-center">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: student?.avatarColor || C.indigo }}
              >
                <Text className="text-white font-bold">
                  {student?.initials || "ST"}
                </Text>
              </View>
              <View>
                <Text className="text-[16px] font-semibold text-gray-900">
                  {student?.name}
                </Text>
                <Text className="text-[12px] text-gray-500">
                  {student?.email}
                </Text>
              </View>
            </View>
            <StatusPill status={status} />
          </View>

          {/* Quick actions */}
          <View className="flex-row gap-2 mt-4">
            <Pressable
              onPress={onCall}
              className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1"
              style={{ backgroundColor: "#E0F2FE" }}
            >
              <Ionicons name="call-outline" size={16} color="#0369A1" />
              <Text
                className="text-[12px] font-semibold"
                style={{ color: "#0369A1" }}
              >
                Call
              </Text>
            </Pressable>
            <Pressable
              onPress={onMail}
              className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1"
              style={{ backgroundColor: "#EDE9FE" }}
            >
              <Ionicons name="mail-outline" size={16} color="#4338CA" />
              <Text
                className="text-[12px] font-semibold"
                style={{ color: "#4338CA" }}
              >
                Email
              </Text>
            </Pressable>
            {is_active ? (
              <Pressable
                onPress={onDisconnect}
                className="h-10 px-3 rounded-xl items-center justify-center flex-row gap-1"
                style={{ backgroundColor: "#FFE4E6" }}
              >
                <Ionicons name="unlink-outline" size={16} color="#BE123C" />
                <Text
                  className="text-[12px] font-semibold"
                  style={{ color: "#BE123C" }}
                >
                  Disconnect
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>

        {/* Student info */}
        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-4">
          <SectionTitle
            icon="person-circle-outline"
            color={C.indigo}
            title="Student Info"
          />
          <InfoRow
            icon="card-outline"
            color={C.indigo}
            label="Student ID"
            value={student?.custom_id}
          />
          <InfoRow
            icon="call-outline"
            color={C.sky}
            label="Phone"
            value={student?.phone}
            onPress={onCall}
          />
          <InfoRow
            icon="mail-outline"
            color={C.violet}
            label="Email"
            value={student?.email}
            onPress={onMail}
          />
          <InfoRow
            icon="checkmark-circle-outline"
            color={
              status === "active"
                ? C.emerald
                : status === "pending"
                  ? C.amber
                  : C.slate
            }
            label="Status"
            value={status?.[0]?.toUpperCase() + status?.slice(1)}
          />
        </View>

        {/* Tuition info */}
        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-4">
          <SectionTitle
            icon={isMonthly ? "calendar-outline" : "book-outline"}
            color={isMonthly ? C.indigo : C.violet}
            title={`Tuition • ${labelType(tuition_details?.tuition_type)}`}
            right={
              <View
                className="px-2 py-1 rounded-md"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <Text className="text-[11px] font-semibold text-gray-700">
                  {tuition_details?.class_level}
                </Text>
              </View>
            }
          />

          {/* quick stats */}
          <View className="flex-row gap-3 mt-1">
            {isMonthly ? (
              <>
                <Stat
                  label="Days / Week"
                  value={String(tuition_details?.tuition_days_per_week || "—")}
                  tone="emerald"
                />
                <Stat
                  label="Hours / Day"
                  value={String(tuition_details?.hours_per_day || "—")}
                  tone="sky"
                />
              </>
            ) : (
              <>
                <Stat
                  label="Hours / Class"
                  value={String(tuition_details?.hours_per_class || "—")}
                  tone="sky"
                />
                <Stat
                  label="Duration"
                  value={tuition_details?.duration || "—"}
                  tone="amber"
                />
              </>
            )}
          </View>

          {/* basics */}
          <View className="mt-3">
            <InfoRow
              icon="language-outline"
              color={C.violet}
              label="Medium"
              value={tuition_details?.medium}
            />
            <InfoRow
              icon="home-outline"
              color={C.blue}
              label="Institute"
              value={tuition_details?.institute_name}
            />
            <InfoRow
              icon="location-outline"
              color={C.rose}
              label="Address"
              value={fullAddress(tuition_details)}
            />
            <InfoRow
              icon="flag-outline"
              color={C.emerald}
              label="Study Purpose"
              value={tuition_details?.study_purpose}
            />
          </View>

          {/* subjects */}
          <View className="mt-3">
            <SectionTitle
              icon="albums-outline"
              color={C.indigo}
              title="Subjects"
            />
            <View className="flex-row flex-wrap mt-1">
              {(tuition_details?.subject_list || []).map((s) => (
                <Chip key={s} label={s} tone="indigo" />
              ))}
              {!tuition_details?.subject_list?.length && (
                <Text className="text-[13px] text-gray-500">—</Text>
              )}
            </View>
          </View>

          {/* schedule & pay */}
          {isMonthly ? (
            <View className="mt-3">
              <SectionTitle
                icon="time-outline"
                color={C.sky}
                title="Schedule & Pay"
              />
              <InfoRow
                icon="calendar-outline"
                color={C.sky}
                label="Starting Month"
                value={tuition_details?.starting_month}
              />
              <InfoRow
                icon="cash-outline"
                color={C.emerald}
                label="Monthly Salary"
                value={money(tuition_details?.salary_per_month)}
              />
              <Text className="text-[11px] text-gray-500 mt-2">Days</Text>
              <View className="flex-row flex-wrap mt-1">
                {(tuition_details?.days_name || []).map((d) => (
                  <Chip key={d} label={d} tone="sky" />
                ))}
              </View>
            </View>
          ) : (
            <View className="mt-3">
              <SectionTitle
                icon="time-outline"
                color={C.sky}
                title="Course Plan & Pay"
              />
              <InfoRow
                icon="reader-outline"
                color={C.indigo}
                label="Total Classes"
                value={String(tuition_details?.total_classes_per_course || "—")}
              />
              <InfoRow
                icon="cash-outline"
                color={C.emerald}
                label="Per Subject"
                value={money(tuition_details?.salary_per_subject)}
              />
              <InfoRow
                icon="wallet-outline"
                color={C.violet}
                label="Total Course"
                value={money(tuition_details?.total_course_completion_salary)}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentDetails;
