import React from "react";
import { View } from "react-native";
import Skeleton from "../../ui/Skeleton";

const StudentDetailsSkeleton = () => {
  return (
    <View className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
      {/* Top section */}
      <View className="p-6">
        <View className="flex-row items-start justify-between">
          {/* Name + role */}
          <View className="flex-1 pr-4">
            <Skeleton className="h-5 w-40 rounded-md" />
            <View className="mt-2 self-start">
              <Skeleton className="h-5 w-20 rounded-full" />
            </View>
          </View>

          {/* Circular initials badge */}
          <Skeleton className="w-12 h-12 rounded-full" />
        </View>

        {/* Divider */}
        <View className="mt-6 h-px bg-gray-100" />

        {/* Info rows */}
        <View className="mt-4">
          {/* Email */}
          <View className="flex-row items-center py-2">
            <Skeleton className="w-9 h-9 rounded-xl mr-3" />
            <Skeleton className="h-4 flex-1 rounded-md" />
            <Skeleton className="w-4 h-4 rounded" />
          </View>

          {/* Phone */}
          <View className="flex-row items-center py-2">
            <Skeleton className="w-9 h-9 rounded-xl mr-3" />
            <Skeleton className="h-4 flex-1 rounded-md" />
            <Skeleton className="w-4 h-4 rounded" />
          </View>

          {/* Student ID + verified pill */}
          <View className="flex-row items-center py-2">
            <Skeleton className="w-9 h-9 rounded-xl mr-3" />
            <Skeleton className="h-4 flex-1 rounded-md mr-3" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </View>
        </View>
      </View>

      {/* Footer action */}
      <View className="border-t border-gray-100 p-4">
        <Skeleton className="h-11 rounded-xl" />
      </View>
    </View>
  );
};

export default StudentDetailsSkeleton;
