import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function StudentsHeader({
  tabs = [],
  activeTab,
  onTabChange,
  query,
  onChangeQuery,
  loading,
  countsByKey = {},
  onAddPress,
}) {
  return (
    <>
      {/* Hero header */}
      <View className="bg-emerald-600 px-4 pt-5 pb-6 rounded-b-2xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-extrabold">
            My Students
          </Text>
          <TouchableOpacity
            onPress={onAddPress}
            className="bg-white/90 px-3 py-2 rounded-xl flex-row items-center"
          >
            <Ionicons name="person-add-outline" size={16} color="#111827" />
            <Text className="ml-1 font-semibold text-gray-900">Add</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View
          className="mt-4 rounded-xl px-3 py-2 flex-row items-center border"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          <Ionicons name="search" size={16} color="white" />
          <TextInput
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Search by student name"
            placeholderTextColor="rgba(255,255,255,0.85)"
            className="ml-2 text-white flex-1"
            returnKeyType="search"
          />
          {loading ? (
            <ActivityIndicator size="small" />
          ) : !!query ? (
            <TouchableOpacity onPress={() => onChangeQuery("")}>
              <Ionicons name="close-circle" size={18} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4 mt-3">
        <View className="bg-white rounded-2xl shadow border border-gray-100">
          <View className="flex-row p-2">
            {tabs.map((t) => {
              const isActive = activeTab === t.key;
              const countChip = countsByKey[t.key] ?? 0; // always show

              return (
                <TouchableOpacity
                  key={t.key}
                  onPress={() => onTabChange(t.key)}
                  className={`flex-row items-center px-3 py-2 rounded-xl mr-2 ${isActive ? "" : "opacity-70"}`}
                  style={{
                    backgroundColor: isActive ? `${t.color}22` : "transparent",
                  }}
                >
                  <Ionicons name={t.icon} size={16} color={t.color} />
                  <Text
                    className="ml-1 font-semibold"
                    style={{ color: t.color }}
                  >
                    {t.label}
                  </Text>

                  <View
                    className="ml-2 px-1.5 rounded-md"
                    style={{ backgroundColor: `${t.color}22` }}
                  >
                    <Text className="text-[11px]" style={{ color: t.color }}>
                      {countChip}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
}
export default memo(StudentsHeader);
