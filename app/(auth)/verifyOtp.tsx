import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const VerifyOtp: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isResendDisabled, setResendDisabled] = useState(false);

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      Alert.alert("OTP Verified", `Entered OTP: ${otp}`);
      router.push("/(auth)/generatePin");
    } else {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
    }
  };

  const handleResendOtp = () => {
    setResendDisabled(true);
    Alert.alert("OTP Resent", "A new OTP has been sent to your number.");
    setTimeout(() => setResendDisabled(false), 30000); // Disable for 30 seconds
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Careerbox</Text>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        We sent a code to{" "}
        <Text style={styles.phoneNumber}>+91 123456 7890</Text>
      </Text>
      <Text style={styles.subtitle}>Please enter it below</Text>

      <LinearGradient
        colors={["#2F57EF", "#B966E7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientLine}
      />

      <TextInput
        style={styles.input}
        placeholder="######"
        keyboardType="number-pad"
        maxLength={6}
        onChangeText={(text) => setOtp(text)}
        value={otp}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendOtp}
          disabled={isResendDisabled}
        >
          <Text
            style={[
              styles.resendText,
              isResendDisabled && styles.disabledResendText,
            ]}
          >
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.verifyText}>Verify Otp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#000",
    height: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#7e7e7e",
    textAlign: "center",
    marginVertical: 5,
  },
  phoneNumber: {
    color: "#000",
    fontWeight: "bold",
  },
  gradientLine: {
    width: "80%",
    height: 2,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 1,
  },
  inputContainer: {
    marginBlockStart: 10,
    width: "100%",
    position: "relative", // Needed for absolute positioning of "Resend Code"
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,
    textAlign: "center",
    fontSize: 18,
  },
  resendButton: {
    position: "absolute", // Absolute positioning for bottom-right alignment
    right: 10,
    bottom: 0,
    // paddingTop: 50,
  },
  resendText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
  },
  disabledResendText: {
    color: "#aaa",
  },
  verifyButton: {
    backgroundColor: "#192335",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
