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
import { Picker } from "@react-native-picker/picker";

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
    <ScrollView contentContainerStyle={styles.container}>
      {step === 1 && (
        <View>
          <Text style={styles.title}>Profile Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={profileDetails.name}
            onChangeText={(text) =>
              setProfileDetails({ ...profileDetails, name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={profileDetails.email}
            onChangeText={(text) =>
              setProfileDetails({ ...profileDetails, email: text })
            }
          />
          <Picker
            selectedValue={profileDetails.gender}
            onValueChange={(value) =>
              setProfileDetails({ ...profileDetails, gender: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={profileDetails.dob}
            onChangeText={(text) =>
              setProfileDetails({ ...profileDetails, dob: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Select Location"
            value={profileDetails.location}
            onChangeText={(text) =>
              setProfileDetails({ ...profileDetails, location: text })
            }
          />
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.title}>Education Details</Text>
          <Picker
            selectedValue={educationDetails.courseLevel}
            onValueChange={(value) =>
              setEducationDetails({ ...educationDetails, courseLevel: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="10th, 12th, Graduate" value="" />
            <Picker.Item label="10th" value="10th" />
            <Picker.Item label="12th" value="12th" />
            <Picker.Item label="Graduate" value="graduate" />
          </Picker>
          <Picker
            selectedValue={educationDetails.branch}
            onValueChange={(value) =>
              setEducationDetails({ ...educationDetails, branch: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Engineer, Medical, B.Sc, B.A." value="" />
            <Picker.Item label="Engineer" value="engineer" />
            <Picker.Item label="Medical" value="medical" />
            <Picker.Item label="B.Sc" value="bsc" />
            <Picker.Item label="B.A." value="ba" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Select Specialize Subject"
            value={educationDetails.subject}
            onChangeText={(text) =>
              setEducationDetails({ ...educationDetails, subject: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Exam Board / University / Institute"
            value={educationDetails.board}
            onChangeText={(text) =>
              setEducationDetails({ ...educationDetails, board: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Select Year of Passing"
            value={educationDetails.passingYear}
            onChangeText={(text) =>
              setEducationDetails({ ...educationDetails, passingYear: text })
            }
          />
          <Picker
            selectedValue={educationDetails.domicile}
            onValueChange={(value) =>
              setEducationDetails({ ...educationDetails, domicile: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Domicile State" value="" />
            <Picker.Item label="State 1" value="state1" />
            <Picker.Item label="State 2" value="state2" />
          </Picker>
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.title}>Admission Preference</Text>
          <FlatList
            data={["Science", "Engineering", "Business", "Medical"]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.tag,
                  admissionPreferences.eligibleCourses.includes(item) &&
                    styles.selectedTag,
                ]}
                onPress={() =>
                  toggleSelection(
                    admissionPreferences.eligibleCourses,
                    setAdmissionPreferences,
                    item
                  )
                }
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            horizontal
            keyExtractor={(item) => item}
          />
          <FlatList
            data={["B.Sc.", "Mechanical", "IT", "CS", "M.D"]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.tag,
                  admissionPreferences.admissionChoices.includes(item) &&
                    styles.selectedTag,
                ]}
                onPress={() =>
                  toggleSelection(
                    admissionPreferences.admissionChoices,
                    setAdmissionPreferences,
                    item
                  )
                }
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            horizontal
            keyExtractor={(item) => item}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity onPress={handleBack} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 3 && (
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {step === 3 && (
          <TouchableOpacity
            onPress={() => alert("Profile Saved!")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
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
