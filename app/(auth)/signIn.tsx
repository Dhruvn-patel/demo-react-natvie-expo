import CountryPickerItem from "@/components/atoms/CountryPickerItem";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState<string>("91");
  const [showPin, setShowPin] = useState<boolean>(false);
  const [isLoginWithEmail, setIsLoginWithEmail] = useState<boolean>(false);

  // Handle country selection
  const handleSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  const handleLogin = () => {
    setIsLoginWithEmail((pre) => !pre);
  };
  const handleContinueLogin = () => {
    console.log("Logging in with email:", email, "and PIN:", pin);
  };

  const togglePinVisibility = () => {
    setShowPin((prevState) => !prevState);
  };
  const redirectSignUp = () => {
    return router.push("/(auth)/signUp");
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

      <Text style={styles.inputLabel}>Enter Email</Text>
      {isLoginWithEmail ? (
        <View style={styles.pinInputContainer}>
          <TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={pin}
              onChangeText={setPin}
              secureTextEntry={!showPin}
            />
          </TouchableOpacity>
        </View>
      ) : (
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
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
      )}

      <Text style={styles.inputLabel}>Enter Pi n</Text>
      <View style={styles.pinInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter 4 Digit PIN"
          value={pin}
          onChangeText={setPin}
          secureTextEntry={!showPin}
        />
        {/* <TouchableOpacity onPress={togglePinVisibility}>
          {showPin ? <EyeIcon /> : <EyeOffIcon />}
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity style={styles.forgotPinButton}>
        <Text style={styles.forgotPinText}>Forgot PIN?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleContinueLogin}
      >
        <Text style={styles.loginButtonText}>Continue to Login</Text>
      </TouchableOpacity>

      {isLoginWithEmail ? (
        <TouchableOpacity
          style={styles.loginWithEmailButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginWithEmailText}>Login with Email</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.loginWithEmailButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginWithEmailText}>Login with Phone</Text>
        </TouchableOpacity>
      )}

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't Have an account?</Text>
        <TouchableOpacity>
          <Text
            style={[styles.signUpText, styles.signUpLink]}
            onPress={redirectSignUp}
          >
            Sign Up
          </Text>
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
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  input: {
    // paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  pinInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
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
    marginBottom: 10,
  },
  forgotPinText: {
    color: "#00000",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 500,
  },
  loginButton: {
    backgroundColor: "#192335",
    borderRadius: 68,
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
  loginWithEmailButton: {
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 68,
    borderColor: "#888888",
    borderWidth: 1,
    width: "100%",
  },
  loginWithEmailText: {
    color: "#888888",
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
  },
  signUpText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 21,
    marginRight: 4,
  },
  signUpLink: {
    color: "#00000",
  },
  pinInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: "100%",
  },
  eyeIcon: {
    marginLeft: 8,
  },
  inputLabel: {
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginVertical: 10,
    color: "#000",
  },
});

export default signIn;
