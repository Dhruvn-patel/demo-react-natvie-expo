import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="profileDetails" options={{ headerShown: false }} />
      <Stack.Screen name="educationDetails" options={{ headerShown: false }} />
      <Stack.Screen name="eligibilityForm" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
