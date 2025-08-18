// ScheduleScreen.jsx
import { useEffect, useState, useMemo } from "react";
import { View, SafeAreaView, FlatList, Text } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import StudentRow from "../../../components/Teacher/ScheduleScreen/StudentRow";
import StudentRowSkeleton from "../../../components/Teacher/ScheduleScreen/StudentRowSkeleton";
import Header from "../../../components/Teacher/ScheduleScreen/Header";

/* ---------------- Helpers ---------------- */
function SkeletonList({ count = 5 }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={{ marginBottom: 10 }}>
          <StudentRowSkeleton />
        </View>
      ))}
    </View>
  );
}

function EmptyState() {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
      <Text className="text-gray-500">No active students found.</Text>
    </View>
  );
}

/* ---------------- Screen ---------------- */
export default function ScheduleScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    activeConnections = [],
    loading,
    pagination,
  } = useSelector((state) => state.scheduleTuitionEvents);

  const [query, setQuery] = useState("");

  // Initial load: page 1
  useEffect(() => {
    dispatch({
      type: "FETCH_ACTIVE_CONNECTION_STUDENTS",
      payload: { filters: { per_page: 5, page: 1 } },
    });
  }, [dispatch]);

  // Optional: load more when reaching end
  const canLoadMore = useMemo(() => {
    if (!pagination) return false;
    const { page, last_page } = pagination;
    return page && last_page && page < last_page;
  }, [pagination]);

  const handleEndReached = () => {
    if (loading || !canLoadMore) return;
    const nextPage = (pagination?.page || 1) + 1;
    dispatch({
      type: "FETCH_ACTIVE_CONNECTION_STUDENTS",
      payload: { filters: { per_page: 5, page: nextPage } },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={activeConnections}
        // ensure string key
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <StudentRow
              item={item}
              onViewCalendar={(params) =>
                router.push({
                  pathname: "/calender/[id]",
                  params: { id: item.id, ...params },
                })
              }
            />
          </View>
        )}
        ListHeaderComponent={
          <Header
            query={query}
            setQuery={setQuery}
            STUDENTS={activeConnections}
          />
        }
        ListHeaderComponentStyle={{ marginBottom: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={
          activeConnections.length > 0 && loading ? (
            <SkeletonList count={2} />
          ) : (
            <View style={{ height: 12 }} />
          )
        }
        ListEmptyComponent={
          loading ? <SkeletonList count={5} /> : <EmptyState />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        onEndReachedThreshold={0.4}
        onEndReached={handleEndReached}
      />
    </SafeAreaView>
  );
}
