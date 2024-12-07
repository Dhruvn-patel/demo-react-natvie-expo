import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

type ExamScore = {
  id: string;
  name: string;
  marks: string;
  total: string;
  percentage: string;
};

const eligibilityForm: React.FC = () => {
  const [castCategory, setCastCategory] = useState<string>("");
  const [is12thPass, setIs12thPass] = useState<boolean>(false);
  const [examScores, setExamScores] = useState<ExamScore[]>([]);
  const [newExamName, setNewExamName] = useState<string>("");
  const [marks, setMarks] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<string>("");
  const [regularExam, setRegularExam] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [cgpa, setCgpa] = useState<string>("");
  const [obtainMark, setObtainMark] = useState<string>("");

  const addExamScore = () => {
    if (!newExamName || !marks || !totalMarks) {
      Alert.alert("Error", "Please fill all the fields for the exam score.");
      return;
    }
    const percentage = (
      (parseFloat(marks) / parseFloat(totalMarks)) *
      100
    ).toFixed(2);
    const newScore: ExamScore = {
      id: `${new Date().getTime()}`,
      name: newExamName,
      marks,
      total: totalMarks,
      percentage: `${percentage}%`,
    };
    setExamScores([...examScores, newScore]);
    setNewExamName("");
    setMarks("");
    setTotalMarks("");
  };

  const removeExamScore = (id: string) => {
    setExamScores(examScores.filter((score) => score.id !== id));
  };

  const saveAndContinue = () => {
    if (!castCategory) {
      Alert.alert("Error", "Please select a caste category.");
      return;
    }
    if (examScores.length === 0) {
      Alert.alert("Error", "Please add at least one exam score.");
      return;
    }
    if (!rank || !cgpa || !obtainMark) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    // Handle form submission
    Alert.alert("Success", "Form submitted successfully!");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.backButton}>{"< Back"}</Text>
        <Text style={styles.skipButton}>Skip {">>"}</Text>
      </View>
      <Text style={styles.header}>Check Your Eligibility</Text>
      <Text style={styles.subHeader}>
        Fill up your latest passout education details
      </Text>
      <View style={styles.divider} />

      {/* Cast Category */}
      <Text style={styles.label}>Cast Category</Text>
      <TextInput
        style={styles.input}
        placeholder="General, OBC, SC, ST, EWS, P..."
        value={castCategory}
        onChangeText={setCastCategory}
      />

      {/* 12th Exam Passout */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>12th Exam Passout?</Text>
        <Switch
          value={is12thPass}
          onValueChange={(value) => setIs12thPass(value)}
        />
      </View>

      {/* Added Exam Scores */}
      {examScores.map((score) => (
        <View key={score.id} style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {score.name}: {score.marks}/{score.total} ({score.percentage})
          </Text>
          <TouchableOpacity
            onPress={() => removeExamScore(score.id)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Add Exam Score */}
      <TouchableOpacity style={styles.addButton} onPress={addExamScore}>
        <Text style={styles.addButtonText}>Add Last Exam Score</Text>
      </TouchableOpacity>

      {/* Regular/Entrance Exam */}
      <Text style={styles.label}>Regular/Entrance Exam</Text>
      <TextInput
        style={styles.input}
        placeholder="Select Exam"
        value={regularExam}
        onChangeText={setRegularExam}
      />

      {/* Rank */}
      <Text style={styles.label}>Rank:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Rank"
        keyboardType="numeric"
        value={rank}
        onChangeText={setRank}
      />

      {/* CGPA */}
      <Text style={styles.label}>CGPA / Percentile Point:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter CGPA or Percentile"
        keyboardType="numeric"
        value={cgpa}
        onChangeText={setCgpa}
      />

      {/* Obtain Mark */}
      <Text style={styles.label}>Obtain Mark:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Obtain Mark"
        keyboardType="numeric"
        value={obtainMark}
        onChangeText={setObtainMark}
      />

      {/* Save & Continue */}
      <TouchableOpacity style={styles.button} onPress={saveAndContinue}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: "#7C7C7C",
    marginVertical: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "#C8A2C8",
    width: "50%",
    alignSelf: "center",
    marginVertical: 10,
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 14,
    color: "#000",
  },
  removeButton: {
    backgroundColor: "#FF5C5C",
    padding: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#1A1B1D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1A1B1D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default eligibilityForm;
