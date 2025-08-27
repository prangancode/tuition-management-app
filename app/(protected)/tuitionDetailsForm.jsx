import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import Segment from "../../components/ui/Segment";
import LabeledInput from "../../components/ui/LabeledInput";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";

const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export default function TuitionDetailsForm() {
  const { studentDetails, tuitionDetailsSubmitting } = useSelector(
    (state) => state.connectStudents
  );
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  // base fields
  const [tuitionType, setTuitionType] = useState("monthly_based"); // "monthly_based" | "course"
  const [classLevel, setClassLevel] = useState("");
  const [subjects, setSubjects] = useState("");
  const [medium, setMedium] = useState("");
  const [institute, setInstitute] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [studyPurpose, setStudyPurpose] = useState("");

  // monthly fields
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [daysSelected, setDaysSelected] = useState([]);
  const [salaryPerMonth, setSalaryPerMonth] = useState("");
  const [startingMonth, setStartingMonth] = useState("");

  // course fields
  const [totalClasses, setTotalClasses] = useState("");
  const [hoursPerClass, setHoursPerClass] = useState("");
  const [salaryPerSubject, setSalaryPerSubject] = useState("");
  const [totalCourseSalary, setTotalCourseSalary] = useState("");
  const [duration, setDuration] = useState("");

  const requiredBase = [
    classLevel,
    subjects,
    medium,
    institute,
    district,
    thana,
    studyPurpose,
  ].every(Boolean);
  const requiredMonthly =
    [daysPerWeek, hoursPerDay, salaryPerMonth, startingMonth].every(Boolean) &&
    daysSelected.length > 0;
  const requiredCourse = [
    totalClasses,
    hoursPerClass,
    salaryPerSubject,
    totalCourseSalary,
    duration,
  ].every(Boolean);

  const isValid = useMemo(() => {
    if (!requiredBase) return false;
    return tuitionType === "monthly_based" ? requiredMonthly : requiredCourse;
  }, [tuitionType, requiredBase, requiredMonthly, requiredCourse]);

  const handleToggleDay = (day) => {
    setDaysSelected((prev) =>
      prev.includes(day) ? prev.filter((x) => x !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    if (!isValid || tuitionDetailsSubmitting) return;
    const payload = {
      teacher_id: user?.id,
      student_id: studentDetails?.id,
      tuition_type: tuitionType,
      class_level: classLevel,
      subject_list: subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      medium,
      institute_name: institute,
      address_line: address,
      district,
      thana,
      study_purpose: studyPurpose,
      ...(tuitionType === "monthly_based"
        ? {
            tuition_days_per_week: Number(daysPerWeek),
            hours_per_day: Number(hoursPerDay),
            days_name: daysSelected,
            salary_per_month: Number(salaryPerMonth),
            starting_month: startingMonth,
          }
        : {
            total_classes_per_course: Number(totalClasses),
            hours_per_class: Number(hoursPerClass),
            salary_per_subject: Number(salaryPerSubject),
            total_course_completion_salary: Number(totalCourseSalary),
            duration,
          }),
    };

    // console.log("LOCAL_SAVE_PREVIEW", payload);
    dispatch({
      type: "SUBMIT_TUITION_DETAILS",
      payload: {
        ...payload,
        navigate: (path) => router.replace(path),
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 28 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          {/* Card */}
          <View className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {/* Header */}
            <View className="px-5 pt-5">
              <Text className="text-base font-semibold text-gray-900">
                Tuition Information
              </Text>
              <Text className="text-xs text-gray-500 mt-1">
                Fields marked <Text className="text-rose-500">*</Text> are
                required.
              </Text>

              {/* Tuition type pills */}
              <View className="flex-row mt-4 bg-gray-100 p-1 rounded-xl">
                <Segment
                  active={tuitionType === "monthly_based"}
                  onPress={() => setTuitionType("monthly_based")}
                  label="Monthly Based"
                  icon="calendar-outline"
                />
                <Segment
                  active={tuitionType === "course"}
                  onPress={() => setTuitionType("course")}
                  label="Course Based"
                  icon="book-outline"
                />
              </View>
            </View>

            {/* Base fields */}
            <View className="px-5 pt-4">
              <LabeledInput
                label="Class Level"
                required
                value={classLevel}
                onChangeText={setClassLevel}
                placeholder="e.g., Class 8, Class 9, Class 10"
              />
              <LabeledInput
                label="Subjects (comma separated)"
                required
                value={subjects}
                onChangeText={setSubjects}
                placeholder="e.g., Math, Science, English"
              />
              <LabeledInput
                label="Medium"
                required
                value={medium}
                onChangeText={setMedium}
                placeholder="e.g., Bangla Version, English Version"
              />
              <LabeledInput
                label="Institute Name"
                required
                value={institute}
                onChangeText={setInstitute}
                placeholder="e.g., ABC Institute"
              />
              <LabeledInput
                label="Address Line"
                required
                value={address}
                onChangeText={setAddress}
                placeholder="e.g., 123 Main St, City"
                multiline
              />

              {/* District / Thana */}
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <LabeledInput
                    label="District"
                    required
                    value={district}
                    onChangeText={setDistrict}
                    placeholder="e.g., Dhaka"
                  />
                </View>
                <View className="flex-1">
                  <LabeledInput
                    label="Thana"
                    required
                    value={thana}
                    onChangeText={setThana}
                    placeholder="e.g., Dhanmondi"
                  />
                </View>
              </View>

              <LabeledInput
                label="Study Purpose"
                required
                value={studyPurpose}
                onChangeText={setStudyPurpose}
                placeholder="e.g., Exam Prep, Skill Development"
              />
            </View>

            {/* Conditional sections */}
            {tuitionType === "monthly_based" ? (
              <View className="px-5 pt-2">
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <LabeledInput
                      label="Tuition Days / Week"
                      required
                      value={daysPerWeek}
                      onChangeText={setDaysPerWeek}
                      placeholder="e.g., 5"
                      keyboardType="number-pad"
                    />
                  </View>
                  <View className="flex-1">
                    <LabeledInput
                      label="Hours / Day"
                      required
                      value={hoursPerDay}
                      onChangeText={setHoursPerDay}
                      placeholder="e.g., 2"
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>

                {/* Days chips */}
                <Text className="text-[13px] font-semibold text-gray-900 mt-2">
                  Days Name <Text className="text-rose-500">*</Text>
                </Text>
                <View className="flex-row flex-wrap gap-2 mt-2">
                  {DAYS.map((d) => {
                    const active = daysSelected.includes(d);
                    return (
                      <Pressable
                        key={d}
                        onPress={() => handleToggleDay(d)}
                        className={`px-3 py-1.5 rounded-full border ${
                          active
                            ? "bg-indigo-600 border-indigo-600"
                            : "bg-gray-100 border-gray-200"
                        }`}
                      >
                        <Text
                          className={`text-xs font-semibold ${
                            active ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {d}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <View className="flex-row gap-3 mt-3">
                  <View className="flex-1">
                    <LabeledInput
                      label="Salary / Month"
                      required
                      value={salaryPerMonth}
                      onChangeText={setSalaryPerMonth}
                      placeholder="e.g., 20000"
                      keyboardType="number-pad"
                      iconLeft={
                        <Feather name="dollar-sign" size={16} color="#6B7280" />
                      }
                    />
                  </View>
                  <View className="flex-1">
                    <LabeledInput
                      label="Starting Month"
                      required
                      value={startingMonth}
                      onChangeText={setStartingMonth}
                      placeholder="e.g., January 2026"
                      iconLeft={
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color="#6B7280"
                        />
                      }
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View className="px-5 pt-2">
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <LabeledInput
                      label="Total Classes / Course"
                      required
                      value={totalClasses}
                      onChangeText={setTotalClasses}
                      placeholder="e.g., 20"
                      keyboardType="number-pad"
                    />
                  </View>
                  <View className="flex-1">
                    <LabeledInput
                      label="Hours / Class"
                      required
                      value={hoursPerClass}
                      onChangeText={setHoursPerClass}
                      placeholder="e.g., 1.5"
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>

                <View className="flex-row gap-3 mt-3">
                  <View className="flex-1">
                    <LabeledInput
                      label="Salary / Subject"
                      required
                      value={salaryPerSubject}
                      onChangeText={setSalaryPerSubject}
                      placeholder="e.g., 500"
                      keyboardType="number-pad"
                      iconLeft={
                        <Feather name="dollar-sign" size={16} color="#6B7280" />
                      }
                    />
                  </View>
                  <View className="flex-1">
                    <LabeledInput
                      label="Total Course Salary"
                      required
                      value={totalCourseSalary}
                      onChangeText={setTotalCourseSalary}
                      placeholder="e.g., 5000"
                      keyboardType="number-pad"
                      iconLeft={
                        <Feather name="hash" size={16} color="#6B7280" />
                      }
                    />
                  </View>
                </View>

                <LabeledInput
                  label="Duration"
                  required
                  value={duration}
                  onChangeText={setDuration}
                  placeholder="e.g., 3 months, 6 months"
                  className="mt-3"
                  iconLeft={
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                  }
                />
              </View>
            )}

            {/* Footer */}
            <View className="px-5 py-5 mt-2 border-t border-gray-100">
              <Pressable
                onPress={handleSave}
                disabled={!isValid || tuitionDetailsSubmitting}
                className={`h-12 rounded-xl items-center justify-center flex-row gap-2 ${
                  !isValid || tuitionDetailsSubmitting
                    ? "bg-indigo-400"
                    : "bg-indigo-600"
                }`}
                style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
              >
                {tuitionDetailsSubmitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="save-outline" size={18} color="#fff" />
                    <Text className="text-white font-semibold">
                      Save and continue
                    </Text>
                  </>
                )}
              </Pressable>

              {!isValid && (
                <Text className="text-xs text-gray-500 mt-2">
                  Fill all required fields
                  {tuitionType === "monthly_based"
                    ? " and pick at least one day."
                    : "."}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
