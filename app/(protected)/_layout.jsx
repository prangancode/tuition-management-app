import { Stack, router, Redirect } from "expo-router";

export default function AppLayout() {
  const isSignedIn = false;

  if (isSignedIn === false) {
    return <Redirect href={"/welcome"} />;
  }

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
