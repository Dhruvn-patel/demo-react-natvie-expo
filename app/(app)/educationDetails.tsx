import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useRouter } from "expo-router";

// Define types for dropdown state and options
type DropdownState = {
  courseLevel: string;
  branch: string;
  subject: string;
  university: string;
  year: string;
  domicile: string;
};

type DropdownVisibility = {
  [key in keyof DropdownState]: boolean;
};

type FormField = {
  label: string;
  field: keyof DropdownState;
  isTextInput?: boolean;
};

// Dropdown options
const options: Record<keyof DropdownState, string[]> = {
  courseLevel: ["10th", "12th", "Graduate"],
  branch: ["Engineering", "Medical", "B.Sc.", "B.A."],
  subject: ["Physics", "Mathematics", "History", "Biology"],
  university: [], // Text input field; no options required
  year: ["2023", "2022", "2021", "2020"],
  domicile: ["California", "New York", "Texas", "Florida"],
};

const educationDetails: React.FC = () => {
  const router = useRouter();

  // States for dropdown values, visibility, and errors
  const [dropdowns, setDropdowns] = useState<DropdownState>({
    courseLevel: "",
    branch: "",
    subject: "",
    university: "",
    year: "",
    domicile: "",
  });

  const [isDropdownVisible, setDropdownVisible] = useState<DropdownVisibility>({
    courseLevel: false,
    branch: false,
    subject: false,
    university: false,
    year: false,
    domicile: false,
  });

  const [errors, setErrors] = useState<Partial<DropdownState>>({});

  // Navigate to the next screen
  const onSave = () => {
    const newErrors: Partial<DropdownState> = {};

    // Simple validation logic: Ensure fields are filled
    Object.keys(dropdowns).forEach((key) => {
      if (!dropdowns[key as keyof DropdownState]) {
        newErrors[key as keyof DropdownState] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
      return; // Do not proceed until validation is successful
    }

    router.push("/(app)/eligibilityForm");
  };

  // Toggle dropdown visibility
  const handleDropdownToggle = (field: keyof DropdownState): void => {
    setDropdownVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle dropdown selection
  const handleDropdownSelect = (
    field: keyof DropdownState,
    value: string
  ): void => {
    setDropdowns((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "", // Clear error when a selection is made
    }));
    setDropdownVisible((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // Render dropdown menu
  const renderDropdown = (field: keyof DropdownState): JSX.Element | null => {
    if (!isDropdownVisible[field]) return null;

    return (
      <View style={styles.dropdown}>
        <FlatList
          data={options[field]}
          keyExtractor={(item, index) => `${field}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleDropdownSelect(field, item)}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  // Form fields
  const formFields: FormField[] = [
    { label: "Latest Passout Course Level", field: "courseLevel" },
    { label: "Branch/Stream/Degree", field: "branch" },
    { label: "Specialize Subject", field: "subject" },
    { label: "Exam Board/University", field: "university", isTextInput: true },
    { label: "Passing Year", field: "year" },
    { label: "Domicile", field: "domicile" },
  ];

  // Render form fields dynamically
  const renderFormFields: ListRenderItem<FormField> = ({ item }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{item.label}</Text>
      {item.isTextInput ? (
        <TextInput
          style={[styles.input, errors[item.field] && { borderColor: "red" }]}
          placeholder={`Enter ${item.label}`}
          value={dropdowns[item.field]}
          onChangeText={(text) =>
            setDropdowns((prev) => ({ ...prev, [item.field]: text }))
          }
        />
      ) : (
        <TouchableOpacity
          style={[styles.input, errors[item.field] && { borderColor: "red" }]}
          onPress={() => handleDropdownToggle(item.field)}
        >
          <Text style={styles.inputText}>
            {dropdowns[item.field] || `Select ${item.label}`}
          </Text>
        </TouchableOpacity>
      )}
      {renderDropdown(item.field)}
      {/* Show error message */}
      {errors[item.field] && (
        <Text style={styles.errorText}>{errors[item.field]}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={formFields}
        keyExtractor={(item) => item.field}
        renderItem={renderFormFields}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Education Details</Text>
            <Text style={styles.subHeader}>
              Fill up your latest passout education details
            </Text>
            <View style={styles.divider} />
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>Save & Continue</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: "#7C7C7C",
    marginTop: 5,
  },
  divider: {
    height: 2,
    backgroundColor: "#007BFF",
    width: "50%",
    alignSelf: "center",
    marginVertical: 15,
  },
  fieldContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#1A1B1D",
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 12,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  inputText: {
    fontSize: 14,
    color: "#7C7C7C",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#1A1B1D",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1A1B1D",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default educationDetails;
