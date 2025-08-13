import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const sampleMonthly = {
  tuition_type: "monthly_based",
  class_level: "Class 9",
  subject_list: ["Math", "Science", "English"],
  medium: "English Version",
  institute_name: "ABC Institute",
  address_line: "123 Main St, Dhaka",
  district: "Dhaka",
  thana: "Dhanmondi",
  study_purpose: "Exam Prep",
  tuition_days_per_week: 5,
  hours_per_day: 2,
  days_name: ["Sat", "Mon", "Wed"],
  salary_per_month: 20000,
  starting_month: "January 2026",
};

const sampleCourse = {
  tuition_type: "course",
  class_level: "HSC",
  subject_list: ["Physics", "Chemistry"],
  medium: "Bangla Version",
  institute_name: "XYZ College",
  address_line: "Road 12, Mirpur",
  district: "Dhaka",
  thana: "Mirpur",
  study_purpose: "Skill Development",
  total_classes_per_course: 24,
  hours_per_class: 1.5,
  salary_per_subject: 1200,
  total_course_completion_salary: 9600,
  duration: "3 months",
};

/** —— palette (tailwind-ish hexes) —— */
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
  `৳ ${Number(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

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
        {value}
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
const TuitionDetails = ({ data = sampleMonthly /* try sampleCourse */ }) => {
  const isMonthly = data.tuition_type === "monthly_based";

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
                  ? String(data.tuition_days_per_week)
                  : String(data.total_classes_per_course)
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
              {(data.subject_list || []).map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
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
                <Stat label="Hours / Day" value={`${data.hours_per_day}`} />
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
                {(data.days_name || []).map((d) => (
                  <Chip key={d}>{d}</Chip>
                ))}
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
                <Stat label="Hours / Class" value={`${data.hours_per_class}`} />
                <Stat label="Duration" value={data.duration} />
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
        </View>
      </ScrollView>
    </View>
  );
};

export default TuitionDetails;
