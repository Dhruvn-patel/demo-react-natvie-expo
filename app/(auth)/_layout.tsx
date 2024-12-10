import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Layout = () => {
  const screenOptions: any = {
    headerShown: false,
    animation: "slide_from_right",
  };

  return (
    <SafeAreaProvider>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="onBoarding" options={{ headerShown: false }} />
        <Stack.Screen name="singIn" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
        <Stack.Screen name="verifyOtp" options={{ headerShown: false }} />
        <Stack.Screen name="generatePin" options={{ headerShown: false }} />
        <Stack.Screen name="forgetPin" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
};

export default Layout;
