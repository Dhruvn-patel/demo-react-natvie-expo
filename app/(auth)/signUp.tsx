import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountryCode, Country } from "react-native-country-picker-modal";
import { useRouter } from "expo-router";
import CountryPickerItem from "@/components/atoms/CountryPickerItem";

const signUp: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState<string>("91");

  // Handle country selection
  const handleSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  // Handle phone number validation and signup
  const handleSignUp = () => {
    if (!phone || phone.length < 10) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid 10-digit phone number."
      );
      return;
    }
    Alert.alert(
      "Sign Up",
      `You have signed up successfully with phone: +${callingCode} ${phone}`
    );
    // Implement API call or navigation logic here

    router.push("/(auth)/verifyOtp");
  };

  const redirectLogin = () => {
    return router.push("/(auth)/signIn");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.logo}>Careerbox</Text>

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Build the skills to drive your career</Text>

      <LinearGradient
        colors={["#2F57EF", "#B966E7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientLine}
      />

      <View style={styles.phoneTextContainer}>
        <Text style={styles.phoneText}>Phone Number</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.countryPickerContainer}>
          {/* <CountryPickerItem
            countryCode={countryCode}
            onSelect={handleSelectCountry}
          /> */}
          <Text style={styles.callingCode}>+{callingCode}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile No."
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>

      <TouchableOpacity onPress={handleSignUp} style={styles.buttonContainer}>
        <LinearGradient
          colors={["#2F57EF", "#B966E7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue to Signup</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={redirectLogin}>
        <Text style={styles.loginLink}>
          Already have an account? <Text style={styles.loginText}>Login</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#000",
    height: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  gradientLine: {
    width: "80%",
    height: 2,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 1,
  },
  phoneTextContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  phoneText: {
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 21,
    fontSize: 14,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9C1AFF",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  countryPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  callingCode: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonContainer: {
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  loginLink: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  loginText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default signUp;
