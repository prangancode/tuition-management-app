import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import Header from "../../../components/Teacher/HomeScreen/Header";
import QuickSummary from "../../../components/Teacher/HomeScreen/QuickSummary";
import StatsGrid from "../../../components/Teacher/HomeScreen/StatsGrid";
import TodaysSchedule from "../../../components/Teacher/HomeScreen/TodaysSchedule";
import RecentActivity from "../../../components/Teacher/HomeScreen/RecentActivity";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative hero cap */}
        <View className="px-4 pt-6 pb-8 rounded-b-3xl bg-indigo-600">
          <Header />
          <QuickSummary />
        </View>

        {/* Lifted content wrapper so cards feel layered */}
        <View className="-mt-6 px-4">
          <StatsGrid />

          <View className="mt-6">
            <TodaysSchedule />
          </View>

          <View className="mt-6">
            <RecentActivity />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
