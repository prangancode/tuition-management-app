import { View } from "react-native";
import Skeleton from "../../ui/Skeleton";

export default function StudentCardSkeleton() {
  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      {/* Top row */}
      <View className="flex-row justify-between items-start">
        <View className="flex-row items-center">
          <Skeleton style={{ borderRadius: 9999 }} className="w-12 h-12 mr-3" />
          <View>
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-3 w-28" />
          </View>
        </View>
        <Skeleton className="h-6 w-20" />
      </View>

      {/* Details */}
      <View className="mt-3">
        <View className="flex-row gap-3 mb-3">
          <View className="flex-1 flex-row items-center gap-2">
            <Skeleton className="w-8 h-8" />
            <View className="flex-1">
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-4 w-28" />
            </View>
          </View>
          <View className="flex-1 flex-row items-center gap-2">
            <Skeleton className="w-8 h-8" />
            <View className="flex-1">
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </View>
          </View>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 flex-row items-center gap-2">
            <Skeleton className="w-8 h-8" />
            <View className="flex-1">
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-4 w-24" />
            </View>
          </View>
          <View className="flex-1" />
        </View>
      </View>

      {/* Subjects */}
      <View className="mt-3">
        <Skeleton className="h-3 w-16 mb-2" />
        <View className="flex-row flex-wrap">
          <Skeleton className="h-6 w-16 mr-2 mb-2" />
          <Skeleton className="h-6 w-20 mr-2 mb-2" />
          <Skeleton className="h-6 w-14 mr-2 mb-2" />
        </View>
      </View>

      {/* Actions */}
      <View className="mt-4 flex-row gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </View>
    </View>
  );
}
