import React from "react";
import { View } from "react-native";
import Skeleton from "../../ui/Skeleton";

const Line = ({ w = "w-40" }) => <Skeleton className={`h-4 ${w} rounded-md`} />;
const Stat = () => <Skeleton className="h-14 rounded-xl flex-1" />;

const Chip = () => <Skeleton className="h-6 w-16 rounded-full mr-2 mb-2" />;

export default function TuitionDetailsSkeleton() {
  return (
    <View className="bg-white rounded-2xl border border-gray-100 p-5">
      {/* type pill */}
      <View className="items-start mb-4">
        <Skeleton className="h-6 w-28 rounded-full" />
      </View>

      {/* Overview */}
      <View className="mb-2">
        <Line w="w-24" />
      </View>
      <View className="flex-row gap-3 mb-4">
        <Stat />
        <Stat />
      </View>

      {/* Subjects */}
      <View className="mb-2">
        <Line w="w-24" />
      </View>
      <View className="flex-row flex-wrap mt-1 mb-4">
        <Chip />
        <Chip />
        <Chip />
        <Chip />
        <Chip />
      </View>

      {/* Details */}
      <View className="mb-2">
        <Line w="w-24" />
      </View>
      {[...Array(5)].map((_, i) => (
        <View key={i} className="flex-row items-center py-2">
          <Skeleton className="w-5 h-5 rounded-md mr-3" />
          <View className="flex-1">
            <Line w="w-28" />
            <View className="mt-1">
              <Line w="w-52" />
            </View>
          </View>
        </View>
      ))}

      {/* Schedule / Course section */}
      <View className="mt-3 mb-2">
        <Line w="w-32" />
      </View>
      <View className="flex-row gap-3">
        <Stat />
        <Stat />
      </View>
      <View className="mt-3">
        <Line w="w-48" />
      </View>
      <View className="flex-row flex-wrap mt-2">
        <Chip />
        <Chip />
        <Chip />
      </View>
    </View>
  );
}
