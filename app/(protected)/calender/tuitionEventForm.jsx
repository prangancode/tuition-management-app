// TuitionEventForm.native.jsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
  SafeAreaView, // ← added
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";

/* ---------------- Helpers ---------------- */
const pad2 = (n) => String(n).padStart(2, "0");
const toSqlDateTime = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(
    d.getHours()
  )}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

const prettyDate = (d) =>
  d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const prettyTime = (d) =>
  d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

/* ---------------- Reusable Field ---------------- */
function Field({ label, icon, children, error }) {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-[11px] font-semibold text-gray-600 tracking-wide">
        {label}
      </Text>
      <View className="flex-row items-center rounded-2xl border border-gray-100 bg-gray-50 px-3 py-2.5">
        {!!icon && (
          <View className="mr-2 rounded-xl bg-white/80 px-2 py-1">
            <Ionicons name={icon} size={16} color="#6B7280" />
          </View>
        )}
        <View className="flex-1">{children}</View>
      </View>
      {!!error && <Text className="mt-1 text-xs text-rose-600">{error}</Text>}
    </View>
  );
}

/* ---------------- Main Form ---------------- */
export default function TuitionEventForm({ selectedStudent, setIsModalOpen }) {
  const dispatch = useDispatch();
  const { submitting } = useSelector((s) => s.scheduleTuitionEvents);

  const student = selectedStudent?.student || {};

  // Local form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [scheduledDate, setScheduledDate] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Validation
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";
    if (!scheduledAt) e.scheduled_at = "Scheduled time is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const markTouchedAll = () =>
    setTouched({ title: true, description: true, scheduled_at: true });

  const handleSubmit = () => {
    if (!validate()) {
      markTouchedAll();
      return;
    }
    dispatch({
      type: "SUBMIT_TUITION_EVENTS",
      payload: {
        student_id: student?.id || "",
        title: title.trim(),
        description: description.trim(),
        scheduled_at: scheduledAt,
        setIsModalOpen,
      },
    });
  };

  /* ------ Date & Time pickers ------ */
  const onPickDate = (event, date) => {
    if (Platform.OS !== "ios") setShowDatePicker(false);
    if (!date) return;
    const base = scheduledDate || new Date();
    date.setHours(
      base.getHours(),
      base.getMinutes(),
      base.getSeconds() || 0,
      0
    );
    setScheduledDate(date);
    setScheduledAt(toSqlDateTime(date));
    setErrors((prev) => ({ ...prev, scheduled_at: undefined }));
  };

  const onPickTime = (event, time) => {
    if (Platform.OS !== "ios") setShowTimePicker(false);
    if (!time) return;
    const base = scheduledDate || new Date();
    base.setHours(time.getHours(), time.getMinutes(), 0, 0);
    const d = new Date(base);
    setScheduledDate(d);
    setScheduledAt(toSqlDateTime(d));
    setErrors((prev) => ({ ...prev, scheduled_at: undefined }));
  };

  const clearSchedule = () => {
    setScheduledDate(null);
    setScheduledAt("");
    setTouched((t) => ({ ...t, scheduled_at: true }));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 28 }}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Card shell */}
        <View className="rounded-3xl border border-gray-100 bg-white shadow-lg overflow-hidden">
          {/* Accent bar */}
          <View className="h-1.5 bg-indigo-500" />

          {/* Header block */}
          <View className="px-4 pt-4 pb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50">
                  <Ionicons name="create-outline" size={18} color="#4F46E5" />
                </View>
                <Text className="ml-2 text-[16px] font-extrabold text-gray-900">
                  New Tuition Event
                </Text>
              </View>

              {!!setIsModalOpen && (
                <TouchableOpacity
                  onPress={() => setIsModalOpen(false)}
                  className="rounded-xl bg-gray-100 px-3 py-1.5"
                  activeOpacity={0.9}
                >
                  <Text className="text-xs font-semibold text-gray-800">
                    Close
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Student chip */}
            <View className="mt-3 self-start flex-row items-center rounded-full bg-indigo-50 px-2.5 py-1">
              <Ionicons name="person-outline" size={12} color="#4F46E5" />
              <Text className="ml-1 text-[11px] font-semibold text-indigo-700">
                {student?.name || "Unknown"}
                {student?.custom_id ? ` • ${student.custom_id}` : ""}
              </Text>
            </View>
          </View>

          {/* Body */}
          <View className="px-4 pb-4">
            {/* Title */}
            <Field
              label="Title"
              icon="book-outline"
              error={touched.title && errors.title}
            >
              <TextInput
                value={title}
                onChangeText={(t) => {
                  setTitle(t);
                  if (touched.title)
                    setErrors((e) => ({ ...e, title: undefined }));
                }}
                onBlur={() => setTouched((t) => ({ ...t, title: true }))}
                placeholder="e.g., Algebra Chapter 1"
                className="text-[14px] text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </Field>

            {/* Description */}
            <Field
              label="Description"
              icon="chatbox-ellipses-outline"
              error={touched.description && errors.description}
            >
              <TextInput
                value={description}
                onChangeText={(t) => {
                  setDescription(t);
                  if (touched.description)
                    setErrors((e) => ({ ...e, description: undefined }));
                }}
                onBlur={() => setTouched((t) => ({ ...t, description: true }))}
                placeholder="What will you cover?"
                className="text-[14px] text-gray-900 h-28 py-2" // 👈 taller
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={5}
                textAlignVertical="top" // 👈 Android: top-align text
                blurOnSubmit={false}
              />
            </Field>

            {/* Scheduled At */}
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[11px] font-semibold text-gray-600 tracking-wide">
                Scheduled At
              </Text>
              {!!scheduledAt && (
                <Text className="text-[11px] font-semibold text-indigo-600">
                  {prettyDate(scheduledDate || new Date())} ·{" "}
                  {prettyTime(scheduledDate || new Date())}
                </Text>
              )}
            </View>

            <View className="mb-3 flex-row gap-2">
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm"
                activeOpacity={0.9}
              >
                <Ionicons name="calendar-outline" size={16} color="#4F46E5" />
                <Text className="ml-2 text-[13px] font-semibold text-gray-800">
                  {scheduledDate ? prettyDate(scheduledDate) : "Pick Date"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm"
                activeOpacity={0.9}
              >
                <Ionicons name="time-outline" size={16} color="#4F46E5" />
                <Text className="ml-2 text-[13px] font-semibold text-gray-800">
                  {scheduledDate ? prettyTime(scheduledDate) : "Pick Time"}
                </Text>
              </TouchableOpacity>

              {!!scheduledAt && (
                <TouchableOpacity
                  onPress={() => {
                    setScheduledDate(null);
                    setScheduledAt("");
                    setTouched((t) => ({ ...t, scheduled_at: true }));
                  }}
                  className="w-11 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50"
                  activeOpacity={0.9}
                >
                  <Ionicons name="close-outline" size={18} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>

            {touched.scheduled_at && errors.scheduled_at ? (
              <Text className="mb-2 text-xs text-rose-600">
                {errors.scheduled_at}
              </Text>
            ) : null}

            {/* Native pickers */}
            {showDatePicker && (
              <View className="mt-3 mb-2 rounded-2xl border border-gray-100 bg-white px-2 py-2">
                <DateTimePicker
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  value={scheduledDate || new Date()}
                  onChange={(e, d) => {
                    if (Platform.OS !== "ios") setShowDatePicker(false);
                    if (!d) return;
                    const base = scheduledDate || new Date();
                    d.setHours(
                      base.getHours(),
                      base.getMinutes(),
                      base.getSeconds() || 0,
                      0
                    );
                    setScheduledDate(d);
                    setScheduledAt(toSqlDateTime(d));
                    setErrors((prev) => ({ ...prev, scheduled_at: undefined }));
                    setTouched((t) => ({ ...t, scheduled_at: true }));
                  }}
                />
              </View>
            )}

            {showTimePicker && (
              <View className="mt-3 rounded-2xl border border-gray-100 bg-white px-2 py-2">
                <DateTimePicker
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  value={scheduledDate || new Date()}
                  onChange={(e, d) => {
                    if (Platform.OS !== "ios") setShowTimePicker(false);
                    if (!d) return;
                    const base = scheduledDate || new Date();
                    base.setHours(d.getHours(), d.getMinutes(), 0, 0);
                    const next = new Date(base);
                    setScheduledDate(next);
                    setScheduledAt(toSqlDateTime(next));
                    setErrors((prev) => ({ ...prev, scheduled_at: undefined }));
                    setTouched((t) => ({ ...t, scheduled_at: true }));
                  }}
                />
              </View>
            )}

            {/* Buttons */}
            <View className="mt-4 flex-row gap-3">
              <TouchableOpacity
                disabled={submitting}
                onPress={handleSubmit}
                className="flex-1 flex-row items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 shadow"
                activeOpacity={0.9}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Ionicons name="paper-plane-outline" size={16} color="#fff" />
                )}
                <Text className="ml-2 text-sm font-semibold text-white">
                  {submitting ? "Submitting…" : "Submit"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={submitting}
                onPress={() => setIsModalOpen && setIsModalOpen(false)}
                className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                activeOpacity={0.9}
              >
                <Ionicons name="arrow-back-outline" size={16} color="#111827" />
                <Text className="ml-2 text-sm font-semibold text-gray-900">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

            {/* Hint */}
            <View className="mt-4 self-center rounded-xl bg-gray-50 px-3 py-1.5">
              <Text className="text-[11px] text-gray-600">
                Saved in{" "}
                <Text className="font-semibold">YYYY-MM-DD HH:mm:ss</Text>{" "}
                (local time).
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
