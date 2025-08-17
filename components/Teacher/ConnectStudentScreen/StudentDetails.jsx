import { useEffect, useState, useMemo } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import StudentDetailsSkeleton from "./StudentDetailsSkeleton";
import { getConnectionButtonState } from "../../../utils/connectionStatusUtils";
import { notify } from "../../../helpers/toast";

const StudentDetails = () => {
  const dispatch = useDispatch();
  const {
    studentDetails: studentInfo,
    tuitionDetails,
    loading,
    connectionStatus,
    connectionStatusLoading,
  } = useSelector((state) => state.connectStudents);

  const router = useRouter();
  const {
    label,
    disabled: statusDisabled,
    className: buttonClass,
    icon: Icon,
  } = getConnectionButtonState(connectionStatus);

  const handleConnect = () => {
    if (!tuitionDetails) {
      notify.info("Tuition details", "submit tuition details first");
      router.push("/tuitionDetailsForm");
    } else {
      dispatch({
        type: "SEND_CONNECTION_REQUEST",
        payload: {
          student_id: studentInfo?.id,
          custom_id: studentInfo?.custom_id,
          tuition_details_id: tuitionDetails?.id,
        },
      });
    }
  };

  // check connection status with a student regarding teacher
  useEffect(() => {
    if (studentInfo?.id) {
      dispatch({
        type: "CHECK_CONNECTION_STATUS",
        payload: { student_id: studentInfo.id },
      });
    }
  }, [dispatch, studentInfo?.id]);

  if (loading) return <StudentDetailsSkeleton />;

  // --- Button state mirroring the web logic ---
  const isDisabled = statusDisabled || connectionStatusLoading;

  const text = connectionStatusLoading ? "Loading..." : label;

  // Fallback background based on status (works even if buttonClass is web-only)
  const statusBgClass = useMemo(() => {
    switch (connectionStatus) {
      case "accepted":
        return "bg-gray-600";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-green-600";
      default:
        return "bg-green-600";
    }
  }, [connectionStatus]);

  // Try to pick a bg-* from buttonClass (if provided), else fallback
  const parsedBgFromUtil =
    typeof buttonClass === "string"
      ? (buttonClass.match(/\bbg-[\w-]+\b/g) || [])[0]
      : "";

  const bgClass = connectionStatusLoading
    ? "bg-gray-400"
    : parsedBgFromUtil || statusBgClass;

  // Hide icon while connectionStatusLoading, fallback to Ionicons if util provides none
  const showIcon = !connectionStatusLoading;
  const RenderIcon =
    Icon || ((p) => <Ionicons name="person-add-outline" {...p} />); // default

  return (
    <View className="max-w-md w-full self-center">
      <View className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
        {/* Top section */}
        <View className="p-6">
          <View className="flex-row items-start justify-between">
            {/* Name + role */}
            <View className="flex-1 pr-4">
              <Text className="text-gray-900 font-semibold text-lg">
                {studentInfo?.name || "—"}
              </Text>

              <View className="mt-2 self-start rounded-full bg-blue-50 px-2.5 py-1 border border-blue-100">
                <Text className="text-blue-700 text-xs font-semibold">
                  {studentInfo?.role || "Student"}
                </Text>
              </View>
            </View>

            {/* Circular initials badge */}
            <View className="w-12 h-12 rounded-full items-center justify-center bg-indigo-100 border border-indigo-200">
              <Text className="text-indigo-700 font-semibold">
                {studentInfo?.name
                  ?.split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "ST"}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="mt-6 h-px bg-gray-100" />

          {/* Info rows */}
          <View className="mt-4">
            {/* Email */}
            <View className="flex-row items-center py-2">
              <View className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 items-center justify-center mr-3">
                <Feather name="mail" size={18} color="#f87171" />
              </View>
              <Text className="text-gray-900 text-sm font-medium flex-1">
                {studentInfo?.email || "—"}
              </Text>
              <TouchableOpacity hitSlop={8} onPress={() => {}}>
                <Feather name="copy" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Phone */}
            <View className="flex-row items-center py-2">
              <View className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 items-center justify-center mr-3">
                <Feather name="phone" size={18} color="#10b981" />
              </View>
              <Text className="text-gray-500 text-sm flex-1">
                {studentInfo?.phone || "—"}
              </Text>
              <TouchableOpacity hitSlop={8} onPress={() => {}}>
                <Feather name="copy" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Student ID */}
            <View className="flex-row items-center py-2">
              <View className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 items-center justify-center mr-3">
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={18}
                  color="#6366f1"
                />
              </View>
              <Text className="text-gray-500 text-sm flex-1">
                {studentInfo?.custom_id || "—"}
              </Text>
              <View className="rounded-full bg-indigo-100 px-2 py-0.5 border border-indigo-200">
                <Text className="text-indigo-700 text-[10px] font-semibold tracking-wide">
                  VERIFIED
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer action */}
        <View className="border-t border-gray-100 p-4">
          <Pressable
            onPress={handleConnect}
            disabled={isDisabled}
            className={`h-11 rounded-xl flex-row items-center justify-center px-4 ${bgClass} ${
              isDisabled ? "opacity-70" : ""
            }`}
            style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
            accessibilityRole="button"
            accessibilityState={{
              disabled: isDisabled,
              busy: connectionStatusLoading,
            }}
          >
            {showIcon ? <RenderIcon size={18} color="#fff" /> : null}
            <Text
              className={`text-white font-semibold text-sm ${showIcon ? "ml-2" : ""}`}
            >
              {text}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default StudentDetails;
