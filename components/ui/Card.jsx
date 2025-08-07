import { View } from "react-native";

const Card = ({ children, className = "" }) => {
  return (
    <View className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </View>
  );
};

export default Card;
