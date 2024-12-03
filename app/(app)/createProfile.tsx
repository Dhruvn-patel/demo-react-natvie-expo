import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";

interface ProfileDetails {
  name: string;
  email: string;
  gender: string;
  dob: string;
  location: string;
}

interface EducationDetails {
  courseLevel: string;
  branch: string;
  subject: string;
  board: string;
  passingYear: string;
  domicile: string;
}

interface AdmissionPreferences {
  eligibleCourses: string[];
  admissionChoices: string[];
}
const ProfileComponent = () => {
  const [step, setStep] = useState<number>(1);
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    name: "",
    email: "",
    gender: "",
    dob: "",
    location: "",
  });
  const [educationDetails, setEducationDetails] = useState<EducationDetails>({
    courseLevel: "",
    branch: "",
    subject: "",
    board: "",
    passingYear: "",
    domicile: "",
  });
  const [admissionPreferences, setAdmissionPreferences] =
    useState<AdmissionPreferences>({
      eligibleCourses: [],
      admissionChoices: [],
    });

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const toggleSelection = (array: Array<any>, setArray: any, value: any) => {
    if (array.includes(value)) {
      setArray(array.filter((item) => item !== value));
    } else {
      setArray([...array, value]);
    }
  };

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  tag: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  selectedTag: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileComponent;
