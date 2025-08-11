import React from "react";
import { SafeAreaView, View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-between pb-8">
        {/* Big top illustration */}
        <View className="items-center">
          <Image
            source={require("../../assets/images/auth/teacher-student.png")}
            resizeMode="cover"
            className="w-full h-[500px]"
          />
        </View>

        {/* Bottom content */}
        <View>
          {/* Brand row */}
          <View className="flex-row items-center">
            <Text className="text-base font-semibold text-gray-900">
              TutorHub
            </Text>
          </View>

          {/* Headline + subcopy */}
          <Text className="mt-2 text-3xl font-extrabold text-gray-900 leading-snug">
            Teach & learn in{"\n"}one place
          </Text>

          <Text className="mt-2 text-[13px] leading-5 text-gray-500">
            Manage lessons, track schedules, and connect with students —
            everything a tutor needs to run classes smoothly.
          </Text>

          {/* Buttons */}
          <View className="mt-6">
            <Pressable
              onPress={() => router.push("/(auth)/signIn")}
              className="h-12 rounded-full bg-[#1E6DFF] items-center justify-center"
            >
              <Text className="text-white font-semibold">Login</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(auth)/signUp")}
              className="h-12 rounded-full border border-gray-300 items-center justify-center mt-3 bg-white"
            >
              <Text className="text-gray-900 font-semibold">Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
