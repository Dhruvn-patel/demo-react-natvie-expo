import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
type DropdownKey = "subject" | "location";

interface FormField {
  label: string;
  placeholder: string;
  keyboardType?: "default" | "email-address";
}

const profileDetails: React.FC = () => {
  const router = useRouter();

  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dropdowns, setDropdowns] = useState<Record<DropdownKey, boolean>>({
    subject: false,
    location: false,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    location: "",
    dob: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    gender: "",
    location: "",
    dob: "",
  });

  const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user: any = await AsyncStorage.getItem("user");
        const parsedUser = JSON.parse(user);
        if (parsedUser.profileDetails && parsedUser.profileDetails.basicInfo) {
          return router.push("/(app)/educationDetails");
        }
      } catch (error) {
        router.push("/(auth)/signIn");
      }
    };

    fetchUser();
  }, []);

  const handleSetupProfile = async () => {
    // Reset previous errors
    setErrors({
      fullName: "",
      email: "",
      gender: "",
      location: "",
      dob: "",
    });

    // Validate before navigating
    if (!formData.fullName) {
      setErrors((prev) => ({ ...prev, fullName: "Full name is required" }));
      return;
    }

    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      return;
    }

    // Gender Validation
    if (!selectedGender) {
      setErrors((prev) => ({ ...prev, gender: "Gender is required" }));
      return;
    }

    // Date of Birth Validation
    if (!dob) {
      setErrors((prev) => ({ ...prev, dob: "Date of Birth is required" }));
      return;
    }

    // Location Validation
    if (!selectedLocation) {
      setErrors((prev) => ({ ...prev, location: "Location is required" }));
      return;
    }
    const user = await AsyncStorage.getItem("user");
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      gender: selectedGender,
      dob: moment(dob).format("YYYY-MM-DD"),
      city: selectedLocation,
    };
    console.log("formData :>> ", payload);
    try {
      const response = await axios.post(
        "http://192.168.5.137:5002/api/user/profileDetails",
        payload, // The request body
        {
          headers: {
            Authorization: `${JSON.parse(user as any).token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response :>> ", response.data);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(user as any),
          profileDetails: response.data?.basicInfo,
        })
      );
    } catch (error) {
      Alert.alert("Error", "Profile Data Already added.");
    } finally {
      router.push("/(app)/educationDetails");
    }
    // If validation passes, navigate to the next screen
  };

  const handleDropdownToggle = (key: DropdownKey): void => {
    setDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderDropdown = (
    key: DropdownKey,
    data: string[],
    onSelect: (value: string) => void
  ): React.ReactNode => {
    if (!dropdowns[key]) return null;

    return (
      <View style={styles.dropdownContainer}>
        {key === "location" && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(item);
                setDropdowns((prevState) => ({
                  ...prevState,
                  [key]: false,
                }));
                setSearchQuery(""); // Reset search on selection
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          )}
          nestedScrollEnabled
        />
      </View>
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDob(selectedDate);
  };
  const onSkipProfile = () => {
    router.push("/(app)/educationDetails");
  };
  const formFields: FormField[] = [
    { label: "Student Full Name", placeholder: "Enter your name" },
    {
      label: "Email",
      placeholder: "Enter your email",
      keyboardType: "email-address",
    },
  ];

  return (
    <FlatList
      data={formFields}
      keyExtractor={(item) => item.label}
      ListHeaderComponent={
        <>
          <Text style={styles.skip} onPress={onSkipProfile}>
            Skip {">>"}
          </Text>
          <Text style={styles.header}>Profile Details</Text>
          <Text style={styles.subHeader}>
            Fill up the correct details as it is.
          </Text>
          <View style={styles.divider} />
        </>
      }
      renderItem={({ item }) => (
        <>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={item.placeholder}
            keyboardType={item.keyboardType || "default"}
            value={
              item.label === "Student Full Name"
                ? formData.fullName
                : formData.email
            }
            onChangeText={(text) => {
              setFormData((prev) => ({
                ...prev,
                [item.label === "Student Full Name" ? "fullName" : "email"]:
                  text,
              }));
              setErrors((prev) => ({
                ...prev,
                [item.label === "Student Full Name" ? "fullName" : "email"]: "",
              }));
            }}
          />
          {errors[
            item.label === "Student Full Name" ? "fullName" : "email"
          ] && (
            <Text style={styles.errorText}>
              {
                errors[
                  item.label === "Student Full Name" ? "fullName" : "email"
                ]
              }
            </Text>
          )}
        </>
      )}
      ListFooterComponent={
        <>
          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            {["male", "female", "other"].map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderButton,
                  selectedGender === gender && styles.genderButtonSelected,
                ]}
                onPress={() => setSelectedGender(gender)}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    selectedGender === gender &&
                      styles.genderButtonTextSelected,
                  ]}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}

          {/* Date of Birth */}
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>
              {dob ? dob.toDateString() : "Select Date of Birth"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

          {/* Location */}
          <Text style={styles.label}>City/Location</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => handleDropdownToggle("location")}
          >
            <Text style={styles.inputText}>
              {selectedLocation || "Select Location (Searchable List)"}
            </Text>
          </TouchableOpacity>
          {renderDropdown("location", filteredLocations, setSelectedLocation)}
          {errors.location && (
            <Text style={styles.errorText}>{errors.location}</Text>
          )}

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={handleSetupProfile}>
            <Text style={styles.buttonText}>Save & Continue</Text>
          </TouchableOpacity>

          {/* Go to Desk */}
          <Text style={styles.goToDesk}>Go to my desk</Text>
        </>
      }
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  skip: {
    alignSelf: "flex-end",
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: "#7C7C7C",
  },
  divider: {
    height: 2,
    backgroundColor: "#007BFF",
    width: "50%",
    alignSelf: "center",
    marginVertical: 15,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#F9F9F9",
  },
  inputText: {
    color: "#A0A0A0",
  },
  button: {
    backgroundColor: "#1A1B1D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  goToDesk: {
    textAlign: "center",
    color: "#000",
    fontSize: 16,
    marginTop: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#F9F9F9",
  },
  genderButtonSelected: {
    borderColor: "#007BFF",
    backgroundColor: "#DCEEFF",
  },
  genderButtonText: {
    fontSize: 16,
    color: "#000",
  },
  genderButtonTextSelected: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    elevation: 2,
    maxHeight: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default profileDetails;
