import { SafeAreaView, View } from "react-native";
import Header from "../../../components/Teacher/HomeScreen/Header";
import QuickSummary from "../../../components/Teacher/HomeScreen/QuickSummary";
import StatsGrid from "../../../components/Teacher/HomeScreen/StatsGrid";
import TodaysSchedule from "../../../components/Teacher/HomeScreen/TodaysSchedule";

const HomeScreen = () => {
  return (
    <>
      <SafeAreaView>
        <View className="bg-gray-400 pt-6 pb-8 px-4 rounded-bl-3xl rounded-br-3xl">
          {/* Header */}
          <Header />

          {/* Quick Summary */}
          <QuickSummary />
        </View>

        {/* Stats */}
        <StatsGrid />

        {/* Schedule Events */}
        <TodaysSchedule />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
