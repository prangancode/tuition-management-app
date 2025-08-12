import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Segment = memo(function Segment({
  label,
  icon, // Ionicons name or pass null
  active = false,
  onPress,
  disabled = false,
  className = "",
  iconColorActive = "#111827",
  iconColor = "#374151",
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected: active, disabled }}
      hitSlop={8}
      className={`flex-1 h-10 rounded-lg items-center justify-center flex-row gap-2 ${
        active ? "bg-white" : "bg-transparent"
      } ${disabled ? "opacity-50" : ""} ${className}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={16}
          color={active ? iconColorActive : iconColor}
        />
      ) : null}
      <Text
        className={`text-xs font-semibold ${
          active ? "text-gray-900" : "text-gray-600"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
});

export function SegmentGroup({
  options = [],
  value,
  onChange,
  className = "",
}) {
  return (
    <View className={`flex-row bg-gray-100 p-1 rounded-xl ${className}`}>
      {options.map((opt) => (
        <Segment
          key={opt.value}
          label={opt.label}
          icon={opt.icon}
          active={opt.value === value}
          onPress={() => onChange?.(opt.value)}
        />
      ))}
    </View>
  );
}

export default Segment;
