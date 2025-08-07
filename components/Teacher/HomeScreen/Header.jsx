import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between ">
      <View className="flex-row items-center ">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          }}
          className="w-12 h-12 rounded-full"
        />
        <View className=" ml-3">
          <Text className="text-white font-semibold text-base">
            Good Morning
          </Text>
          <Text className="text-white/80 text-sm">Prof. Anderson</Text>
        </View>
      </View>

      <View className="flex-row items-center space-x-2">
        <TouchableOpacity className="p-2 rounded-full bg-white/10 mr-2">
          <Feather name="search" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 rounded-full bg-white/10 relative">
          <Ionicons name="notifications-outline" size={20} color="white" />
          <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
