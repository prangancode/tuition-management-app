import { Stack, router, Redirect } from "expo-router";
import useAuth from "../../hooks/useAuth";

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
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
