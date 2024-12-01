import CountryPickerItem from "@/components/atoms/CountryPickerItem";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CountryCode, Country } from "react-native-country-picker-modal";
const signIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState<string>("91");
  const [showPin, setShowPin] = useState<boolean>(false);

  // Handle country selection
  const handleSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in with email:", email, "and PIN:", pin);
  };

  const togglePinVisibility = () => {
    setShowPin((prevState) => !prevState);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Careerbox</Text>
      <Text style={styles.subtitle}>Build the skills to drive your career</Text>

      {/* Gradient Line */}
      <LinearGradient
        colors={["#2F57EF", "#B966E7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientLine}
      />

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <View style={styles.countryPickerContainer}>
          <CountryPickerItem
            countryCode={countryCode}
            onSelect={handleSelectCountry}
          />
          <Text style={styles.callingCode}>+{callingCode}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      {/* <TextInput
        style={styles.pinInput}
        placeholder="Enter 4 Digit PIN"
        value={pin}
        onChangeText={setPin}
        secureTextEntry
      /> */}
      <View style={styles.pinInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter 4 Digit PIN"
          value={pin}
          onChangeText={setPin}
          secureTextEntry={!showPin}
        />
        <TouchableOpacity onPress={togglePinVisibility}>
          {showPin ? <EyeIcon /> : <EyeOffIcon />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgotPinButton}>
        <Text style={styles.forgotPinText}>Forgot PIN?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Continue to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginWithPhoneButton}>
        <Text style={styles.loginWithPhoneText}>Login with Phone</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't Have an account?</Text>
        <TouchableOpacity>
          <Text style={[styles.signUpText, styles.signUpLink]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 1,
  },
  pinInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginVertical: 20,
    textAlign: "center",
    fontSize: 14,
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
  forgotPinButton: {
    alignSelf: "flex-end",
  },
  forgotPinText: {
    color: "#007AFF",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  loginWithPhoneButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  loginWithPhoneText: {
    marginLeft: 8,
    color: "#007AFF",
  },
  signUpContainer: {
    flexDirection: "row",
  },
  signUpText: {
    marginRight: 4,
  },
  signUpLink: {
    color: "#007AFF",
  },
  pinInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: "100%",
  },
  eyeIcon: {
    marginLeft: 8,
  },
});

export default signIn;
