import { View, Text } from "react-native";
import React from "react";

const SubjectChip = ({ label }) => {
  return (
    <View
      className="px-3 py-1 rounded-full mr-2 mb-2 border"
      style={{ backgroundColor: "#EEF2FF", borderColor: "#E0E7FF" }}
    >
      <Text className="text-[11px] font-semibold" style={{ color: "#4338CA" }}>
        {label}
      </Text>
    </View>
  );
};

export default SubjectChip;
