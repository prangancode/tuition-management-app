import { useEffect, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import TuitionDetailsSkeleton from "./TuitionDetailsSkeleton";

/** —— palette —— */
const C = {
  indigo: "#4F46E5",
  blue: "#2563EB",
  sky: "#0EA5E9",
  emerald: "#10B981",
  amber: "#F59E0B",
  violet: "#8B5CF6",
  rose: "#E11D48",
  slate: "#6B7280",
};

/** —— helpers —— */
const labelType = (t) =>
  t === "monthly_based" ? "Monthly Based" : "Course Based";
const money = (n) =>
  n == null
    ? "৳ —"
    : `৳ ${Number(n)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

function parseDaysName(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {
      return v
        .split(",")
        .map((s) => s.replace(/(^\s*"?|"?\s*$)/g, "").trim())
        .filter(Boolean);
    }
  }
  return [];
}

function normalizeDetails(td = {}) {
  return {
    tuition_type: td?.tuition_type ?? "monthly_based",
    class_level: td?.class_level ?? "—",
    subject_list: Array.isArray(td?.subject_list) ? td?.subject_list : [],
    medium: td?.medium ?? "—",
    institute_name: td?.institute_name ?? "—",
    address_line: td?.address_line ?? "—",
    district: td?.district ?? "—",
    thana: td?.thana ?? "—",
    study_purpose: td?.study_purpose ?? "—",

    // monthly
    tuition_days_per_week:
      td?.tuition_days_per_week != null
        ? Number(td?.tuition_days_per_week)
        : null,
    hours_per_day: td?.hours_per_day != null ? Number(td?.hours_per_day) : null,
    days_name: parseDaysName(td?.days_name),
    salary_per_month:
      td?.salary_per_month != null ? Number(td?.salary_per_month) : null,
    starting_month: td?.starting_month ?? "—",

    // course
    total_classes_per_course:
      td?.total_classes_per_course != null
        ? Number(td?.total_classes_per_course)
        : null,
    hours_per_class:
      td?.hours_per_class != null ? Number(td?.hours_per_class) : null,
    salary_per_subject:
      td?.salary_per_subject != null ? Number(td?.salary_per_subject) : null,
    total_course_completion_salary:
      td?.total_course_completion_salary != null
        ? Number(td?.total_course_completion_salary)
        : null,
    duration: td?.duration ?? null,
  };
}

/** —— UI atoms —— */
const SectionTitle = ({ icon, title, right, iconColor = C.indigo }) => (
  <View className="flex-row items-center justify-between mb-2">
    <View className="flex-row items-center gap-2">
      <View className="w-8 h-8 rounded-xl bg-indigo-50 items-center justify-center">
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text className="text-sm font-semibold text-gray-900">{title}</Text>
    </View>
    {right}
  </View>
);

const Row = ({ icon, label, value, color = C.slate }) => (
  <View className="flex-row items-start gap-3 py-2">
    <Ionicons name={icon} size={16} color={color} style={{ marginTop: 2 }} />
    <View className="flex-1">
      <Text className="text-[12px] text-gray-500">{label}</Text>
      <Text className="text-[13px] font-semibold text-gray-900 mt-0.5">
        {value ?? "—"}
      </Text>
    </View>
  </View>
);

const Chip = ({ children }) => (
  <View className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 mr-2 mb-2">
    <Text className="text-[11px] font-semibold text-gray-700">{children}</Text>
  </View>
);

const Stat = ({ label, value }) => (
  <View className="flex-1 p-3 rounded-xl bg-indigo-50">
    <Text className="text-[11px] text-indigo-700">{label}</Text>
    <Text className="text-base font-semibold text-indigo-900 mt-0.5">
      {value}
    </Text>
  </View>
);

/** —— component —— */
const TuitionDetails = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const teacherId = user?.id;

  const { studentDetails, tuitionDetails, tuitionDetailsLoading } = useSelector(
    (state) => state.connectStudents
  );

  // fetch on ids present
  useEffect(() => {
    if (studentDetails?.id && teacherId) {
      dispatch({
        type: "FETCH_TUITION_DETAILS",
        payload: { teacherId, studentId: studentDetails.id },
      });
    }
  }, [teacherId, studentDetails?.id, dispatch]);

  const data = useMemo(
    () => normalizeDetails(tuitionDetails),
    [tuitionDetails]
  );
  const isMonthly = data?.tuition_type === "monthly_based";

  // EARLY RETURN — skeleton while loading
  if (tuitionDetailsLoading) {
    return (
      <View className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{
            padding: 3,
            paddingBottom: 24,
            marginTop: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <TuitionDetailsSkeleton />
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ padding: 3, paddingBottom: 24, marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-2xl border border-gray-100  p-5">
          {/* type pill */}
          <View className="items-start mb-4">
            <View className="px-3 py-1.5 rounded-full bg-indigo-600/10 flex-row items-center">
              <Ionicons
                name={isMonthly ? "calendar-outline" : "book-outline"}
                size={14}
                color={C.indigo}
              />
              <Text className="text-[11px] font-semibold text-indigo-700 ml-1.5">
                {labelType(data.tuition_type)}
              </Text>
            </View>
          </View>

          {!tuitionDetails ? (
            <View className="py-6">
              <SectionTitle icon="reader-outline" title="Overview" />
              <Text className="text-[13px] text-gray-500">
                No tuition details found for this student yet.
              </Text>
            </View>
          ) : (
            <>
              {/* overview */}
              <SectionTitle
                icon="reader-outline"
                title="Overview"
                iconColor={C.indigo}
              />
              <View className="flex-row gap-3">
                <Stat label="Class Level" value={data.class_level} />
                <Stat
                  label={isMonthly ? "Days / Week" : "Total Classes"}
                  value={
                    isMonthly
                      ? String(data.tuition_days_per_week ?? "—")
                      : String(data.total_classes_per_course ?? "—")
                  }
                />
              </View>

              {/* subjects */}
              <View className="mt-4">
                <SectionTitle
                  icon="albums-outline"
                  title="Subjects"
                  iconColor={C.violet}
                />
                <View className="flex-row flex-wrap mt-1">
                  {(data.subject_list || []).length ? (
                    data.subject_list.map((s) => <Chip key={s}>{s}</Chip>)
                  ) : (
                    <Text className="text-[12px] text-gray-500">
                      No subjects
                    </Text>
                  )}
                </View>
              </View>

              {/* base details */}
              <View className="mt-4">
                <SectionTitle
                  icon="information-circle-outline"
                  title="Details"
                  iconColor={C.sky}
                />
                <Row
                  icon="language-outline"
                  label="Medium"
                  value={data.medium}
                  color={C.violet}
                />
                <Row
                  icon="school-outline"
                  label="Institute"
                  value={data.institute_name}
                  color={C.blue}
                />
                <Row
                  icon="business-outline"
                  label="Address"
                  value={data.address_line}
                  color={C.amber}
                />
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Row
                      icon="location-outline"
                      label="District"
                      value={data.district}
                      color={C.rose}
                    />
                  </View>
                  <View className="flex-1">
                    <Row
                      icon="navigate-outline"
                      label="Thana"
                      value={data.thana}
                      color={C.indigo}
                    />
                  </View>
                </View>
                <Row
                  icon="flag-outline"
                  label="Purpose"
                  value={data.study_purpose}
                  color={C.emerald}
                />
              </View>

              {/* conditional */}
              {isMonthly ? (
                <View className="mt-4">
                  <SectionTitle
                    icon="time-outline"
                    title="Schedule & Pay"
                    iconColor={C.sky}
                  />
                  <View className="flex-row gap-3">
                    <Stat
                      label="Hours / Day"
                      value={
                        data.hours_per_day != null
                          ? `${data.hours_per_day}`
                          : "—"
                      }
                    />
                    <Stat
                      label="Salary / Month"
                      value={money(data.salary_per_month)}
                    />
                  </View>
                  <Row
                    icon="calendar-outline"
                    label="Starting Month"
                    value={data.starting_month}
                    color={C.sky}
                  />

                  <Text className="text-[12px] text-gray-500 mt-2">Days</Text>
                  <View className="flex-row flex-wrap mt-1">
                    {data.days_name.length ? (
                      data.days_name.map((d) => <Chip key={d}>{d}</Chip>)
                    ) : (
                      <Text className="text-[12px] text-gray-500">
                        No days set
                      </Text>
                    )}
                  </View>
                </View>
              ) : (
                <View className="mt-4">
                  <SectionTitle
                    icon="time-outline"
                    title="Course Plan & Pay"
                    iconColor={C.sky}
                  />
                  <View className="flex-row gap-3">
                    <Stat
                      label="Hours / Class"
                      value={
                        data.hours_per_class != null
                          ? `${data.hours_per_class}`
                          : "—"
                      }
                    />
                    <Stat label="Duration" value={data.duration ?? "—"} />
                  </View>

                  <View className="flex-row gap-3 mt-3">
                    <Stat
                      label="Per Subject"
                      value={money(data.salary_per_subject)}
                    />
                    <Stat
                      label="Total Course"
                      value={money(data.total_course_completion_salary)}
                    />
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TuitionDetails;
