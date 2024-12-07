import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

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

const options: Record<keyof DropdownState, string[]> = {
  courseLevel: ["10th", "12th", "Graduate"],
  branch: ["Engineering", "Medical", "B.Sc.", "B.A."],
  subject: ["Physics", "Mathematics", "History", "Biology"],
  year: ["2023", "2022", "2021", "2020"],
  domicile: ["California", "New York", "Texas", "Florida"],
  university: [],
};

const educationDetails: React.FC = () => {
  const router = useRouter();
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
    year: false,
    domicile: false,
    university: false,
  });

  const onSave = () => {
    router.push("/(app)/eligibilityForm");
  };

  const handleDropdownToggle = (field: keyof DropdownState): void => {
    setDropdownVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleDropdownSelect = (
    field: keyof DropdownState,
    value: string
  ): void => {
    setDropdowns((prev) => ({
      ...prev,
      [field]: value,
    }));
    setDropdownVisible((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const renderDropdown = (field: keyof DropdownState): JSX.Element | null => {
    return isDropdownVisible[field] ? (
      <View style={styles.dropdown}>
        <FlatList
          data={options[field]}
          keyExtractor={(item, index) => index.toString()}
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
    ) : null;
  };

  // Create a list of items to render in the form
  const formFields = [
    { label: "Latest Passout Course Level", field: "courseLevel" },
    { label: "Branch/Stream/Degree", field: "branch" },
    { label: "Specialize Subject", field: "subject" },
    { label: "Exam Board/University", field: "university", isTextInput: true },
    { label: "Passing Year", field: "year" },
    { label: "Domicile", field: "domicile" },
  ] as any;

  const renderFormFields = ({
    item,
  }: {
    item: { label: string; field: keyof DropdownState; isTextInput?: boolean };
  }) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{item.label}</Text>
        {item.isTextInput ? (
          <TextInput
            style={styles.input}
            placeholder={`Enter ${item.label}`}
            value={dropdowns[item.field]}
            onChangeText={(text) =>
              setDropdowns((prev) => ({ ...prev, [item.field]: text }))
            }
          />
        ) : (
          <TouchableOpacity
            style={styles.input}
            onPress={() => handleDropdownToggle(item.field)}
          >
            <Text style={styles.inputText}>
              {dropdowns[item.field] || `Select ${item.label}`}
            </Text>
          </TouchableOpacity>
        )}
        {renderDropdown(item.field)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formFields}
        keyExtractor={(item) => item.field}
        renderItem={renderFormFields}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.backButton}>{"< Back"}</Text>
            <Text style={styles.skipButton}>Skip {">>"}</Text>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Submitted Education Details:", dropdowns);
              onSave();
            }}
          >
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
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  backButton: {
    fontSize: 16,
    color: "#000",
  },
  skipButton: {
    fontSize: 16,
    color: "#000",
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
    fontSize: 16,
    color: "#7C7C7C",
  },
  dropdown: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#1A1B1D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fieldContainer: {
    marginBottom: 20,
  },
});

export default educationDetails;
