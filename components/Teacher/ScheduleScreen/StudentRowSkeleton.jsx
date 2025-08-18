import { View } from "react-native";
import Skeleton from "../../ui/Skeleton";

export default function StudentRowSkeleton() {
  return (
    <View className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Accent top bar */}
      <Skeleton rounded={false} className="h-1.5 w-full" />

      <View className="p-4">
        {/* Top row */}
        <View className="flex-row justify-between items-start">
          <View className="flex-row items-center">
            <Skeleton className="w-12 h-12 rounded-full mr-3" />
            <View>
              <Skeleton className="w-40 h-4 mb-2" />
              <Skeleton className="w-28 h-3" />
            </View>
          </View>
          <Skeleton className="w-28 h-7 rounded-xl" />
        </View>

        {/* Info rows */}
        <View className="mt-3 flex-row gap-3 flex-wrap">
          <Skeleton className="w-36 h-5 rounded-lg" />
          <Skeleton className="w-28 h-5 rounded-lg" />
        </View>
        <View className="mt-2 flex-row gap-3 flex-wrap">
          <Skeleton className="w-28 h-5 rounded-lg" />
          <Skeleton className="w-28 h-5 rounded-lg" />
        </View>
        <View className="mt-2 flex-row gap-3 flex-wrap">
          <Skeleton className="w-44 h-5 rounded-lg" />
        </View>

        {/* Subjects */}
        <View className="mt-3 flex-row flex-wrap">
          <Skeleton className="w-20 h-6 rounded-full mr-2 mb-2" />
          <Skeleton className="w-24 h-6 rounded-full mr-2 mb-2" />
          <Skeleton className="w-16 h-6 rounded-full mr-2 mb-2" />
        </View>

        {/* Quick actions */}
        <View className="mt-3 flex-row gap-2">
          <Skeleton className="flex-1 h-10 rounded-xl" />
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-10 h-10 rounded-xl" />
        </View>
      </View>
    </View>
  );
}
