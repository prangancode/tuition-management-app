import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AddStudentForm from "../../../components/Teacher/ConnectStudentScreen/AddStudentForm";

const connectMethods = [
  {
    title: "Student ID",
    description: "Enter 6-digit student ID",
    icon: "link-outline", // Ionicons
    active: true,
  },
  {
    title: "QR Code",
    description: "Scan student QR code",
    icon: "qrcode-scan", // MaterialCommunityIcons
    active: false,
  },
];

const ConnectScreen = () => {
  return (
    <SafeAreaView>
      <View className=" bg-gray-400  px-4 pt-6 pb-8  rounded-bl-3xl rounded-br-3xl">
        {/* Header */}
        <View className="flex-row items-center gap-3 mb-6 bg-gray-300">
          <View className="w-12 h-12 bg-white/10 rounded-2xl items-center justify-center">
            <Ionicons name="person-add" size={24} color="white" />
          </View>
          <View>
            <Text className="text-white font-semibold text-xl">
              Connect Student
            </Text>
            <Text className="text-white/80">Expand your teaching network</Text>
          </View>
        </View>

        {/* Connection Methods */}
        <View className="flex-row flex-wrap gap-3">
          {connectMethods.map((method, index) => {
            const isActive = method.active;
            return (
              <TouchableOpacity
                key={index}
                className={`w-[48%] p-4 rounded-2xl shadow-slate-50 ${
                  isActive
                    ? "bg-white/20 border border-white"
                    : "bg-white/10 border border-white opacity-60"
                }`}
              >
                {method.icon === "link-outline" ? (
                  <Ionicons
                    name="link-outline"
                    size={20}
                    color="white"
                    className="mb-2"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={20}
                    color="white"
                    className="mb-2"
                  />
                )}
                <Text className="text-white font-medium text-sm">
                  {method.title}
                </Text>
                <Text className="text-white/70 text-xs">
                  {method.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View className="px-4 mt-4">
        <AddStudentForm />
      </View>
    </SafeAreaView>
  );
};

export default ConnectScreen;
