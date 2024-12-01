import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="onBoarding" options={{ headerShown: false }} />
      <Stack.Screen name="singIn" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="verifyOtp" options={{ headerShown: false }} />
      <Stack.Screen name="generatePin" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
