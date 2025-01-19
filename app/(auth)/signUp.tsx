import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import CountryPickerWrapper from "@/components/atoms/CountryPickerWrapper";

const { width, height } = Dimensions.get("window");

const signUp: React.FC = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState<string>("91");

  const handleSelectCountry = async (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleSignUp = async () => {
    if (!phone || phone.length < 10 || phone.length > 10) {
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
    router.push("/(auth)/verifyOtp");
    setPhone("");
    // try {
    //   await axios.post("http://172.20.10.2:5002/auth/register", {
    //     phoneNumber: phone,
    //   });
    //   Alert.alert(
    //     "Sign Up",
    //     `You have signed up successfully with phone: +${callingCode} ${phone}`
    //   );

    //   router.push("/(auth)/verifyOtp");
    // } catch (error: Error | any) {
    //   Alert.alert("error", error.message);
    // }
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
          {/* <CountryPickerWrapper
            countryCode={countryCode}
            withFlag={true}
            withCallingCode={true}
            withFilter={true}
            withEmoji={true}
            onSelect={handleSelectCountry}
            containerButtonStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          /> */}
          <Text style={styles.callingCode}>+{callingCode}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile No."
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          maxLength={10}
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
    padding: width * 0.05,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginBottom: height * 0.05,
    color: "#000",
    height: height * 0.06,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    color: "#000",
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "#666",
    marginBottom: height * 0.04,
    textAlign: "center",
  },
  gradientLine: {
    width: "80%",
    height: 2,
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
    borderRadius: 1,
  },
  phoneTextContainer: {
    width: "100%",
    paddingHorizontal: width * 0.03,
  },
  phoneText: {
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: height * 0.03,
    fontSize: width * 0.04,
    marginVertical: height * 0.01,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9C1AFF",
    borderRadius: 8,
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.03,
    width: "100%",
  },
  countryPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: width * 0.03,
  },
  callingCode: {
    marginLeft: width * 0.01,
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#000",
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    paddingVertical: height * 0.02,
    color: "#000",
  },
  button: {
    width: "100%",
    paddingVertical: height * 0.02,
    borderRadius: 30,
    marginBottom: height * 0.03,
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
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#FFF",
  },
  loginLink: {
    fontSize: width * 0.04,
    color: "#666",
    marginTop: height * 0.01,
  },
  loginText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default signUp;
