import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="createProfile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
