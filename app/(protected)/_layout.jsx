import { Stack, router, Redirect } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="groupSelector"
        options={{ animation: "slide_from_bottom", headerShown: false }}
      /> */}
    </Stack>
  );
}
