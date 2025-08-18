import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Props:
 * - loading (bool): true when fetching the next page
 * - canLoadMore (bool): show the Load more button when true
 * - onLoadMore (fn): handler to fetch next page
 * - currentPage (number)
 * - totalPages (number)
 * - totalShown (number): rows currently rendered
 * - total (number): total rows on server
 * - showCounter (bool) default true
 * - buttonLabel (string) optional custom label
 */
export default function PaginationFooter({
  loading,
  canLoadMore,
  onLoadMore,
  currentPage,
  totalPages,
  totalShown,
  total,
  showCounter = true,
  buttonLabel,
}) {
  if (loading) {
    return (
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 }}>
        <View
          className="h-11 rounded-2xl bg-violet-600 items-center justify-center flex-row"
          accessible
          accessibilityRole="button"
          accessibilityState={{ busy: true }}
        >
          <ActivityIndicator size="small" />
          <Text className="text-white font-semibold ml-2">Loading…</Text>
        </View>
        {showCounter && (
          <View className="items-center mt-2">
            <Text className="text-[12px] text-gray-400">
              Showing {totalShown} of {total}
            </Text>
          </View>
        )}
      </View>
    );
  }

  if (!canLoadMore) {
    return (
      <View className="items-center py-4">
        {showCounter && (
          <Text className="text-[12px] text-gray-400">
            Showing {totalShown} of {total}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 }}>
      <TouchableOpacity
        onPress={onLoadMore}
        className="h-11 rounded-2xl bg-violet-600 items-center justify-center flex-row"
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel="Load more"
      >
        <Ionicons name="chevron-down" size={16} color="#fff" />
        <Text className="text-white font-semibold ml-1">
          {buttonLabel || `Load more (${currentPage}/${totalPages})`}
        </Text>
      </TouchableOpacity>
      {showCounter && (
        <View className="items-center mt-2">
          <Text className="text-[12px] text-gray-400">
            Showing {totalShown} of {total}
          </Text>
        </View>
      )}
    </View>
  );
}
