import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: { navigate: (path) => router.replace(path) },
    });
  };

  return (
    <View>
      {/* top row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3">
            {/* avatar with glow */}
            <View className="w-14 h-14 rounded-full items-center justify-center bg-white/15">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                }}
                className="w-12 h-12 rounded-full"
              />
            </View>
          </View>

          <View>
            <Text className="text-white/80 text-xs">Good morning 👋</Text>
            <Text className="text-white font-bold text-xl leading-6">
              Prof. Anderson
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity className="p-2 rounded-full bg-white/15 mr-2">
            <Feather name="search" size={18} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2 rounded-full bg-white/15 mr-2 relative">
            <Ionicons name="notifications-outline" size={18} color="white" />
            <View className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-indigo-600" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onLogout}
            className="p-2 rounded-full bg-white/15"
          >
            <Ionicons name="log-out-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
