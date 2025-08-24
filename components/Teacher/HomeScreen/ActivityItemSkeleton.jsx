import { View, Text } from "react-native";

import Skeleton from "../../ui/Skeleton";

export default function ActivityItemSkeleton({ isLast }) {
  return (
    <View className={`px-4 py-3 ${isLast ? "" : "border-b border-gray-100"}`}>
      <View className="flex-row items-start">
        {/* left icon bubble */}
        <Skeleton className="w-10 h-10 rounded-xl mr-3" />

        {/* right content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-3 w-10 rounded-md" />
          </View>

          <Skeleton className="h-3 w-64 rounded-md mt-2" />
          <Skeleton className="h-3 w-44 rounded-md mt-1" />

          {/* status chip */}
          <Skeleton className="h-5 w-20 rounded-full mt-3" />
        </View>
      </View>
    </View>
  );
}
