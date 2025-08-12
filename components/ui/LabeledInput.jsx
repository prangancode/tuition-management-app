import React, { forwardRef, memo } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

const LabeledInput = memo(
  forwardRef(function LabeledInput(
    {
      label,
      required = false,
      value,
      onChangeText,
      placeholder,
      keyboardType,
      multiline = false,
      secureTextEntry = false,
      editable = true,
      returnKeyType,
      onSubmitEditing,
      autoCapitalize = "sentences",
      maxLength,
      iconLeft = null,
      iconRight = null,
      onPressRightIcon,
      error = null,
      helperText = null,
      containerClassName = "",
      inputClassName = "",
    },
    ref
  ) {
    const border = error ? "border-rose-300" : "border-gray-200";
    const bg = error ? "bg-rose-50" : "bg-gray-100";

    return (
      <View className={`mb-3 ${containerClassName}`}>
        {label ? (
          <Text className="text-[13px] font-semibold text-gray-900 mb-1">
            {label} {required ? <Text className="text-rose-500">*</Text> : null}
          </Text>
        ) : null}

        <View
          className={`flex-row items-center gap-2 rounded-xl border ${border} ${bg} px-3`}
          style={{ paddingVertical: multiline ? 10 : 8 }}
        >
          {iconLeft}
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            keyboardType={keyboardType}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            editable={editable}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            className={`flex-1 text-[16px] text-gray-900 ${
              multiline ? "min-h-[80px]" : ""
            } ${inputClassName}`}
          />
          {iconRight ? (
            <Pressable onPress={onPressRightIcon} hitSlop={10}>
              {iconRight}
            </Pressable>
          ) : null}
        </View>

        {error ? (
          <Text className="text-xs text-rose-600 mt-1">{String(error)}</Text>
        ) : helperText ? (
          <Text className="text-xs text-gray-500 mt-1">{helperText}</Text>
        ) : null}
      </View>
    );
  })
);

export default LabeledInput;
