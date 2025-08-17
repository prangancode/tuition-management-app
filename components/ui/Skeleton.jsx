import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function Skeleton({ className = "", style, rounded = true }) {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={`bg-gray-200 ${rounded ? "rounded-md" : ""} ${className}`}
      style={[{ opacity }, style]}
    />
  );
}
