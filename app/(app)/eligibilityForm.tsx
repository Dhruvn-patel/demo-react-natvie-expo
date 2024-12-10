import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type ExamScore = {
  id: string;
  name: string;
  marks: string;
  total: string;
  percentage: string;
};

const eligibilityForm: React.FC = () => {
  const router = useRouter();
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

  // Validation messages
  const [validationErrors, setValidationErrors] = useState<any>({
    castCategory: "",
    examScores: "",
    rank: "",
    cgpa: "",
    obtainMark: "",
  });

  const addExamScore = () => {
    if (!newExamName || !marks || !totalMarks) {
      setValidationErrors((prev: any) => ({
        ...prev,
        examScores: "Please fill all the fields for the exam score.",
      }));
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
    setValidationErrors((prev: any) => ({
      ...prev,
      examScores: "",
    }));
  };

  const removeExamScore = (id: string) => {
    setExamScores(examScores.filter((score) => score.id !== id));
  };

  const saveAndContinue = () => {
    let isValid = true;
    let errors = {
      castCategory: "",
      examScores: "",
      rank: "",
      cgpa: "",
      obtainMark: "",
    };

    if (!castCategory) {
      isValid = false;
      errors.castCategory = "Please fill a caste category.";
    }

    // if (examScores.length === 0) {
    //   isValid = false;
    //   errors.examScores = "Please add at least one exam score.";
    // }

    if (!rank || !cgpa || !obtainMark) {
      isValid = false;
      if (!rank) errors.rank = "Please enter your rank.";
      if (!cgpa) errors.cgpa = "Please enter your CGPA or Percentile.";
      if (!obtainMark) errors.obtainMark = "Please enter your obtain marks.";
    }

    setValidationErrors(errors);

    console.log("isValid :>> ", isValid);
    if (isValid) {
      router.push("/(app)/home");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          {/* <Text style={styles.backButton}>{"< Back"}</Text>
          <Text style={styles.skipButton}>Skip {">>"}</Text> */}
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
        {validationErrors.castCategory ? (
          <Text style={styles.errorText}>{validationErrors.castCategory}</Text>
        ) : null}

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
        {validationErrors.rank ? (
          <Text style={styles.errorText}>{validationErrors.rank}</Text>
        ) : null}

        {/* CGPA */}
        <Text style={styles.label}>CGPA / Percentile Point:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter CGPA or Percentile"
          keyboardType="numeric"
          value={cgpa}
          onChangeText={setCgpa}
        />
        {validationErrors.cgpa ? (
          <Text style={styles.errorText}>{validationErrors.cgpa}</Text>
        ) : null}

        {/* Obtain Mark */}
        <Text style={styles.label}>Obtain Mark:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Obtain Mark"
          keyboardType="numeric"
          value={obtainMark}
          onChangeText={setObtainMark}
        />
        {validationErrors.obtainMark ? (
          <Text style={styles.errorText}>{validationErrors.obtainMark}</Text>
        ) : null}

        {/* Save & Continue */}
        <TouchableOpacity style={styles.button} onPress={saveAndContinue}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 30,
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
    marginBottom: 5,
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
  errorText: {
    fontSize: 12,
    color: "#FF5C5C",
    marginBottom: 10,
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
