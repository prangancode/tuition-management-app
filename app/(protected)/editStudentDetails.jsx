import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, Feather } from "@expo/vector-icons";

import { clearTuitionDetails } from "../../slices/Teacher/StudentManagement/studentManagementSlice";
import { notify } from "../../helpers/toast";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Labeled = ({ label, required, children, right }) => (
  <View className="mb-3">
    <View className="flex-row justify-between items-center mb-1">
      <Text className="text-[13px] font-semibold text-gray-900">
        {label} {required ? <Text className="text-red-500">*</Text> : null}
      </Text>
      {right}
    </View>
    {children}
  </View>
);

const TextBox = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  maxLength,
}) => (
  <TextInput
    className={`border border-gray-200 rounded-xl px-3.5 py-3 text-[14px] text-gray-900 ${
      multiline ? "min-h-[84px]" : ""
    }`}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
    multiline={multiline}
    maxLength={maxLength}
    placeholderTextColor="#9CA3AF"
  />
);

const Segmented = ({ value, onChange }) => {
  const Item = ({ v, icon, label }) => {
    const active = value === v;
    return (
      <Pressable
        onPress={() => onChange(v)}
        className={`flex-1 h-10 rounded-xl items-center justify-center flex-row gap-2 ${
          active ? "bg-indigo-600" : "bg-gray-100"
        }`}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        <Ionicons name={icon} size={16} color={active ? "#fff" : "#4B5563"} />
        <Text
          className={`text-xs font-semibold ${
            active ? "text-white" : "text-gray-700"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="flex-row gap-2">
      <Item v="monthly_based" icon="calendar-outline" label="Monthly-based" />
      <Item v="course" icon="book-outline" label="Course-based" />
    </View>
  );
};

const Chip = ({ label, onRemove }) => (
  <View className="flex-row items-center bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mr-2 mb-2">
    <Text className="text-[12px] text-indigo-800 mr-1">{label}</Text>
    <Pressable onPress={onRemove} hitSlop={8}>
      <Ionicons name="close-circle" size={16} color="#4338CA" />
    </Pressable>
  </View>
);

const DayPill = ({ day, active, onToggle }) => (
  <Pressable
    onPress={() => onToggle(day)}
    className={`px-3 py-2 rounded-full border ${
      active ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"
    }`}
    style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
  >
    <Text
      className={`text-[12px] font-semibold ${
        active ? "text-white" : "text-gray-700"
      }`}
    >
      {day}
    </Text>
  </Pressable>
);

const SectionCard = ({ title, icon, children, right }) => (
  <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center gap-2">
        <Ionicons name={icon} size={18} color="#4F46E5" />
        <Text className="text-[13px] font-bold text-gray-900">{title}</Text>
      </View>
      {right}
    </View>
    {children}
  </View>
);

export default function EditStudentDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tuition_details_id } = useLocalSearchParams();

  // redux state (assuming you added these in your slice)
  const {
    tuitionDetails,
    tuitionDetailsLoading,
    tuitionDetailsError,
    tuitionDetailsSubmitting,
  } = useSelector((s) => s.studentManagement);

  // local form state
  const [teacherId, setTeacherId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [tuitionType, setTuitionType] = useState("monthly_based");
  const [classLevel, setClassLevel] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [medium, setMedium] = useState("");
  const [institute, setInstitute] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [purpose, setPurpose] = useState("");

  // monthly-based
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [daysSelected, setDaysSelected] = useState([]);
  const [salaryPerMonth, setSalaryPerMonth] = useState("");
  const [startingMonth, setStartingMonth] = useState("");

  // course-based
  const [classesPerCourse, setClassesPerCourse] = useState("");
  const [hoursPerClass, setHoursPerClass] = useState("");
  const [salaryPerSubject, setSalaryPerSubject] = useState("");
  const [totalCourseSalary, setTotalCourseSalary] = useState("");
  const [duration, setDuration] = useState("");

  // fire the fetch on mount
  useEffect(() => {
    if (tuition_details_id !== undefined && tuition_details_id !== null) {
      dispatch({
        type: "GET_TUITION_DETAILS",
        payload: { id: tuition_details_id },
      });
    }
    return () => {
      // optional: clear redux detail on unmount
      dispatch(clearTuitionDetails());
    };
  }, [tuition_details_id, dispatch]);

  // seed local form when redux data arrives
  useEffect(() => {
    if (!tuitionDetails) return;
    setTeacherId(tuitionDetails?.teacher_id ?? null);
    setStudentId(tuitionDetails?.student_id ?? null);
    setTuitionType(tuitionDetails?.tuition_type ?? "monthly_based");
    setClassLevel(tuitionDetails?.class_level ?? "");
    setSubjects(
      Array.isArray(tuitionDetails?.subject_list)
        ? tuitionDetails.subject_list
        : []
    );
    setMedium(tuitionDetails?.medium ?? "");
    setInstitute(tuitionDetails?.institute_name ?? "");
    setAddress(tuitionDetails?.address_line ?? "");
    setDistrict(tuitionDetails?.district ?? "");
    setThana(tuitionDetails?.thana ?? "");
    setPurpose(tuitionDetails?.study_purpose ?? "");

    setDaysPerWeek(tuitionDetails?.tuition_days_per_week?.toString?.() ?? "");
    setHoursPerDay(tuitionDetails?.hours_per_day?.toString?.() ?? "");
    setDaysSelected(
      Array.isArray(tuitionDetails?.days_name) ? tuitionDetails.days_name : []
    );
    setSalaryPerMonth(tuitionDetails?.salary_per_month?.toString?.() ?? "");
    setStartingMonth(tuitionDetails?.starting_month ?? "");

    setClassesPerCourse(
      tuitionDetails?.total_classes_per_course?.toString?.() ?? ""
    );
    setHoursPerClass(tuitionDetails?.hours_per_class?.toString?.() ?? "");
    setSalaryPerSubject(tuitionDetails?.salary_per_subject?.toString?.() ?? "");
    setTotalCourseSalary(
      tuitionDetails?.total_course_completion_salary?.toString?.() ?? ""
    );
    setDuration(tuitionDetails?.duration ?? "");
  }, [tuitionDetails]);

  // autocalc days per week from selection
  useEffect(() => {
    if (tuitionType === "monthly_based") {
      setDaysPerWeek(daysSelected.length ? String(daysSelected.length) : "");
    }
  }, [daysSelected, tuitionType]);

  const toggleDay = (day) => {
    setDaysSelected((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addSubject = () => {
    const t = (subjectInput || "").trim();
    if (!t) return;
    if (subjects.includes(t)) {
      setSubjectInput("");
      return;
    }
    setSubjects((s) => [...s, t]);
    setSubjectInput("");
  };

  const removeSubject = (s) => {
    setSubjects((arr) => arr.filter((x) => x !== s));
  };

  const numberOrNull = (v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const validate = () => {
    if (!tuitionType) return "Tuition type is required.";
    if (!classLevel) return "Class level is required.";
    if (!Array.isArray(subjects) || subjects.length === 0)
      return "Add at least one subject.";
    if (tuitionType === "monthly_based") {
      if (!daysSelected.length) return "Select at least one day.";
      if (!salaryPerMonth) return "Monthly salary is required.";
      //   if (startingMonth && !/^\d{4}-\d{2}$/.test(startingMonth))
      //     return "Starting month must be YYYY-MM.";
    } else {
      if (!classesPerCourse) return "Total classes per course is required.";
      if (!hoursPerClass) return "Hours per class is required.";
      if (!salaryPerSubject) return "Salary per subject is required.";
      if (!totalCourseSalary)
        return "Total course completion salary is required.";
    }
    return null;
  };

  const onSave = () => {
    const err = validate();
    if (err) {
      notify?.error?.("Validation", err);
      return;
    }

    const base = {
      tuition_type: tuitionType,
      class_level: classLevel,
      subject_list: subjects,
      medium,
      institute_name: institute,
      address_line: address,
      district,
      thana,
      study_purpose: purpose,
    };

    const monthly =
      tuitionType === "monthly_based"
        ? {
            tuition_days_per_week: numberOrNull(daysPerWeek),
            hours_per_day: numberOrNull(hoursPerDay),
            days_name: daysSelected,
            salary_per_month: numberOrNull(salaryPerMonth),
            starting_month: startingMonth || null,
          }
        : {};

    const course =
      tuitionType === "course"
        ? {
            total_classes_per_course: numberOrNull(classesPerCourse),
            hours_per_class: numberOrNull(hoursPerClass),
            salary_per_subject: numberOrNull(salaryPerSubject),
            total_course_completion_salary: numberOrNull(totalCourseSalary),
            duration: duration || null,
          }
        : {};

    const payload = { ...base, ...monthly, ...course };

    // handing off to saga
    dispatch({
      type: "UPDATE_TUITION_DETAILS",
      payload: { id: tuition_details_id, data: payload },
    });
  };

  const HeaderBar = () => (
    <View className="bg-indigo-600 px-4 pb-5 pt-3 rounded-b-3xl">
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={{ padding: 6 }}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>
        <Text className="text-white font-bold text-[16px]">
          Edit Tuition Details
        </Text>
        <View style={{ width: 28 }} />
      </View>
      <Text className="text-indigo-100 mt-2 text-[12px]">
        ID: {tuition_details_id} • Student #{studentId ?? "—"} • Teacher #
        {teacherId ?? "—"}
      </Text>
    </View>
  );

  if (tuitionDetailsLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="text-gray-600 mt-2">Loading tuition details…</Text>
      </SafeAreaView>
    );
  }

  if (tuitionDetailsError) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Ionicons name="alert-circle" size={28} color="#DC2626" />
        <Text className="text-red-600 mt-2 text-center">
          {tuitionDetailsError}
        </Text>
        <Pressable
          onPress={() =>
            dispatch({
              type: "GET_TUITION_DETAILS",
              payload: { id: tuition_details_id },
            })
          }
          className="mt-4 bg-indigo-600 rounded-xl px-4 py-2"
        >
          <Text className="text-white font-semibold text-[13px]">Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <HeaderBar />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Tuition Type */}
          <SectionCard title="Tuition Type" icon="options-outline">
            <Segmented
              value={tuitionType}
              onChange={(v) => {
                setTuitionType(v);
                if (v === "monthly_based") {
                  setClassesPerCourse("");
                  setHoursPerClass("");
                  setSalaryPerSubject("");
                  setTotalCourseSalary("");
                  setDuration("");
                } else {
                  setDaysSelected([]);
                  setDaysPerWeek("");
                  setHoursPerDay("");
                  setSalaryPerMonth("");
                  setStartingMonth("");
                }
              }}
            />
          </SectionCard>

          {/* Core */}
          <SectionCard title="Core Information" icon="id-card-outline">
            <Labeled label="Class Level" required>
              <TextBox
                value={classLevel}
                onChangeText={setClassLevel}
                placeholder="e.g., Class 9 / HSC"
              />
            </Labeled>

            <Labeled
              label="Subjects"
              required
              right={
                <Pressable
                  onPress={addSubject}
                  className="bg-indigo-600 rounded-lg px-2 py-1"
                  hitSlop={8}
                >
                  <Text className="text-white text-[12px] font-semibold">
                    Add
                  </Text>
                </Pressable>
              }
            >
              <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-2 mb-2">
                <Ionicons name="book-outline" size={16} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-2 text-[14px]"
                  placeholder="Type a subject and tap Add"
                  value={subjectInput}
                  onChangeText={setSubjectInput}
                  onSubmitEditing={addSubject}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View className="flex-row flex-wrap">
                {subjects.map((s) => (
                  <Chip key={s} label={s} onRemove={() => removeSubject(s)} />
                ))}
              </View>
            </Labeled>

            <Labeled label="Medium">
              <TextBox
                value={medium}
                onChangeText={setMedium}
                placeholder="e.g., English / Bangla"
              />
            </Labeled>

            <Labeled label="Institute Name">
              <TextBox
                value={institute}
                onChangeText={setInstitute}
                placeholder="e.g., City College"
              />
            </Labeled>

            <Labeled label="Address Line">
              <TextBox
                value={address}
                onChangeText={setAddress}
                placeholder="House 10, Road 2"
              />
            </Labeled>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Labeled label="District">
                  <TextBox
                    value={district}
                    onChangeText={setDistrict}
                    placeholder="e.g., Dhaka"
                  />
                </Labeled>
              </View>
              <View className="flex-1">
                <Labeled label="Thana">
                  <TextBox
                    value={thana}
                    onChangeText={setThana}
                    placeholder="e.g., Tejgaon"
                  />
                </Labeled>
              </View>
            </View>

            <Labeled label="Study Purpose">
              <TextBox
                value={purpose}
                onChangeText={setPurpose}
                placeholder="Improve grades / Admission prep"
                multiline
              />
            </Labeled>
          </SectionCard>

          {/* Monthly-based */}
          {tuitionType === "monthly_based" && (
            <SectionCard title="Monthly Plan" icon="calendar-outline">
              <Labeled label="Select Days" required>
                <View className="flex-row flex-wrap gap-2">
                  {DAYS.map((d) => (
                    <DayPill
                      key={d}
                      day={d}
                      active={daysSelected.includes(d)}
                      onToggle={toggleDay}
                    />
                  ))}
                </View>
              </Labeled>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Labeled label="Days / Week">
                    <TextBox
                      value={daysPerWeek}
                      onChangeText={setDaysPerWeek}
                      placeholder="e.g., 3"
                      keyboardType="numeric"
                    />
                  </Labeled>
                </View>
                <View className="flex-1">
                  <Labeled label="Hours / Day">
                    <TextBox
                      value={hoursPerDay}
                      onChangeText={setHoursPerDay}
                      placeholder="e.g., 2"
                      keyboardType="numeric"
                    />
                  </Labeled>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Labeled label="Salary / Month (BDT)" required>
                    <TextBox
                      value={salaryPerMonth}
                      onChangeText={setSalaryPerMonth}
                      placeholder="e.g., 8000"
                      keyboardType="numeric"
                    />
                  </Labeled>
                </View>
                <View className="flex-1">
                  <Labeled label="Starting Month (YYYY-MM)">
                    <TextBox
                      value={startingMonth}
                      onChangeText={setStartingMonth}
                      placeholder="2025-09"
                      keyboardType="numbers-and-punctuation"
                      maxLength={7}
                    />
                  </Labeled>
                </View>
              </View>
            </SectionCard>
          )}

          {/* Course-based */}
          {tuitionType === "course" && (
            <SectionCard title="Course Plan" icon="book-outline">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Labeled label="Total Classes / Course" required>
                    <TextBox
                      value={classesPerCourse}
                      onChangeText={setClassesPerCourse}
                      placeholder="e.g., 24"
                      keyboardType="numeric"
                    />
                  </Labeled>
                </View>
                <View className="flex-1">
                  <Labeled label="Hours / Class" required>
                    <TextBox
                      value={hoursPerClass}
                      onChangeText={setHoursPerClass}
                      placeholder="e.g., 1.5"
                      keyboardType="numeric"
                    />
                  </Labeled>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Labeled label="Salary / Subject (BDT)" required>
                    <TextBox
                      value={salaryPerSubject}
                      onChangeText={setSalaryPerSubject}
                      placeholder="e.g., 4000"
                      keyboardType="numeric"
                    />
                  </Labeled>
                </View>
                <View className="flex-1">
                  <Labeled label="Total Course Salary (BDT)" required>
                    <TextBox
                      value={totalCourseSalary}
                      onChangeText={setTotalCourseSalary}
                      placeholder="e.g., 9600"
                      keyboardType="numeric"
                    />
                  </Labeled>
                </View>
              </View>

              <Labeled label="Duration (free text)">
                <TextBox
                  value={duration}
                  onChangeText={setDuration}
                  placeholder="e.g., 6 weeks / 2 months"
                />
              </Labeled>
            </SectionCard>
          )}
        </ScrollView>

        {/* Sticky footer */}
        <View className="bg-white border-t border-gray-200 px-4 py-3">
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => router.back()}
              className="flex-1 h-12 rounded-xl bg-gray-100 items-center justify-center"
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={onSave}
              disabled={tuitionDetailsSubmitting}
              className="flex-1 h-12 rounded-xl bg-indigo-600 items-center justify-center flex-row gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
              style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
            >
              <Feather name="save" size={18} color="#fff" />
              <Text className="text-white font-semibold">
                {" "}
                {tuitionDetailsSubmitting
                  ? "Saving changes.."
                  : "Save changes"}{" "}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
