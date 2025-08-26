import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "../../ui/Skeleton";

function SectionCard({ children }) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
      {children}
    </View>
  );
}

export default function EditTuitionDetailsSkeleton({ variant = "both" }) {
  const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const showMonthly = variant === "monthly" || variant === "both";
  const showCourse = variant === "course" || variant === "both";

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      {/* <View className="bg-indigo-600 px-4 pt-3 pb-5 rounded-b-3xl">
        <View className="flex-row items-center justify-between">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="w-7 h-7 rounded-full" />
        </View>
        <Skeleton className="h-3 w-56 mt-3 rounded-md" />
      </View> */}

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Tuition Type */}
        <SectionCard>
          <Skeleton className="h-4 w-28 mb-3 rounded-md" />
          <View className="flex-row gap-2">
            <Skeleton className="h-10 flex-1 rounded-xl" />
            <Skeleton className="h-10 flex-1 rounded-xl" />
          </View>
        </SectionCard>

        {/* Core Information */}
        <SectionCard>
          <Skeleton className="h-4 w-32 mb-2 rounded-md" />
          <Skeleton className="h-11 w-full mb-3 rounded-xl" />

          <Skeleton className="h-4 w-24 mb-2 rounded-md" />
          <View className="flex-row items-center border border-gray-100 rounded-xl px-3 py-3 mb-2">
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-4 flex-1 ml-2 rounded-md" />
            <Skeleton className="h-7 w-14 ml-2 rounded-lg" />
          </View>
          <View className="flex-row flex-wrap">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-16 mr-2 mb-2 rounded-full" />
            ))}
          </View>

          <Skeleton className="h-4 w-16 mb-2 rounded-md" />
          <Skeleton className="h-11 w-full mb-3 rounded-xl" />

          <Skeleton className="h-4 w-28 mb-2 rounded-md" />
          <Skeleton className="h-11 w-full mb-3 rounded-xl" />

          <Skeleton className="h-4 w-24 mb-2 rounded-md" />
          <Skeleton className="h-11 w-full mb-3 rounded-xl" />

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Skeleton className="h-4 w-20 mb-2 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </View>
            <View className="flex-1">
              <Skeleton className="h-4 w-16 mb-2 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </View>
          </View>

          <Skeleton className="h-4 w-28 mt-3 mb-2 rounded-md" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </SectionCard>

        {/* Monthly Plan */}
        {showMonthly && (
          <SectionCard>
            <Skeleton className="h-4 w-28 mb-2 rounded-md" />
            <View className="flex-row flex-wrap gap-2 mb-3">
              {Days.map((d) => (
                <Skeleton key={d} className="h-8 w-14 rounded-full" />
              ))}
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Skeleton className="h-4 w-20 mb-2 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </View>
              <View className="flex-1">
                <Skeleton className="h-4 w-20 mb-2 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </View>
            </View>

            <View className="flex-row gap-3 mt-3">
              <View className="flex-1">
                <Skeleton className="h-4 w-32 mb-2 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </View>
              <View className="flex-1">
                <Skeleton className="h-4 w-40 mb-2 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </View>
            </View>
          </SectionCard>
        )}

        {/* Course Plan */}
        {showCourse && (
          <SectionCard>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Skeleton className="h-4 w-36 mb-2 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </View>
              <View className="flex-1">
                <Skeleton className="h-4 w-28 mb-2 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </View>
            </View>

            <View className="flex-row gap-3 mt-3">
              <View className="flex-1">
                <Skeleton className="h-4 w-40 mb-2 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </View>
              <View className="flex-1">
                <Skeleton className="h-4 w-44 mb-2 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </View>
            </View>

            <Skeleton className="h-4 w-32 mt-3 mb-2 rounded-md" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </SectionCard>
        )}
      </ScrollView>

      {/* Footer buttons */}
      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <View className="flex-row gap-3">
          <Skeleton className="h-12 flex-1 rounded-xl" />
          <Skeleton className="h-12 flex-1 rounded-xl" />
        </View>
      </View>
    </SafeAreaView>
  );
}
