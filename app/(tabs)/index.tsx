import {
  StyleSheet,
  Appearance,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
  Feather,
} from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import EmployeFormValidation from "@/components/validationSchemas/EmployeeFormValidation";
import { Formik } from "formik";
import Field from "@/components/ui/Field";
import OptionModal from "@/components/ui/OptionModal";

export default function HomeScreen() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const s = CreateStyles(theme);

  // -------------- States --------------------
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ---------------- Dropdown options --------------
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Non-binary", value: "Non-binary" },
    { label: "Prefer not to say", value: "Prefer not to say" },
  ];

  const jobTitleOptions = [
    { label: "CEO", value: "CEO" },
    { label: "CFO", value: "CFO" },
    { label: "Human Resources", value: "Human Resources" },
    { label: "Janitor", value: "Janitor" },
  ];

  // -------- Formatters ----------------
  const formatCurrency = (value: string) => {
    if (!value) return "";

    const number = Number(value.replace(/,/g, ""));
    if (isNaN(number)) return "";

    return number.toLocaleString("en-CA");
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <Text style={s.header}>Employee Form</Text>
        <Formik
          initialValues={{
            name: "",
            gender: "",
            dateOfBirth: null,
            jobTitle: "",
            salary: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            Alert.alert("Success", "Employee form submitted successfully.");
            resetForm();
          }}
          validationSchema={EmployeFormValidation}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setTouched,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <View style={s.main}>
              {/* Name Field */}
              <Field
                label="Name"
                errors={errors.name}
                touched={touched.name}
                required={true}
              >
                <MaterialIcons
                  name="account-circle"
                  size={24}
                  color={theme.lightText}
                />
                <TextInput
                  value={values.name}
                  placeholder="Enter your name"
                  placeholderTextColor={theme.lightText}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  style={s.input}
                />
              </Field>

              {/* Gender */}
              <Field
                label="Gender"
                errors={errors.gender}
                touched={touched.gender}
                required={true}
              >
                <Pressable
                  onPress={() => setShowGenderModal(true)}
                  style={s.button}
                >
                  <MaterialCommunityIcons
                    name="gender-male"
                    size={24}
                    color={theme.lightText}
                  />
                  <Text
                    style={{
                      color: values.gender ? theme.text : theme.lightText,
                    }}
                  >
                    {values.gender ? values.gender : "Select Gender"}
                  </Text>
                </Pressable>
              </Field>

              {/* Shows when user presses fake input button */}
              <OptionModal
                showModal={showGenderModal}
                setShowModal={setShowGenderModal}
                onSelect={(value: string) => {
                  setFieldValue("gender", value);
                  setShowGenderModal(false);
                }}
                options={genderOptions}
              />

              {/* Date of birth */}
              <Field
                label="Date of Birth"
                required={true}
                errors={errors.dateOfBirth}
                touched={touched.dateOfBirth}
              >
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  style={s.button}
                >
                  <Fontisto name="date" size={20} color={theme.lightText} />
                  <Text
                    style={{
                      color: values.dateOfBirth ? theme.text : theme.lightText,
                    }}
                  >
                    {values.dateOfBirth
                      ? formatDate(values.dateOfBirth)
                      : "Select a date"}
                  </Text>
                </Pressable>
              </Field>

              {/* DOB picker */}
              {showDatePicker && (
                <DateTimePicker
                  value={values.dateOfBirth || new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS === "android") {
                      setShowDatePicker(false);
                    }

                    if (selectedDate) {
                      setFieldValue("dateOfBirth", selectedDate);
                    }
                  }}
                />
              )}

              {/* Job Title */}
              <Field
                label="Job Title"
                errors={errors.jobTitle}
                touched={touched.jobTitle}
                required={true}
              >
                <Pressable
                  onPress={() => setShowJobModal(true)}
                  style={s.button}
                >
                  <Feather name="briefcase" size={24} color={theme.lightText} />
                  <Text
                    style={{
                      color: values.jobTitle ? theme.text : theme.lightText,
                    }}
                  >
                    {values.jobTitle ? values.jobTitle : "Select Job Title"}
                  </Text>
                </Pressable>
              </Field>

              {/* Shows when user presses fake input button */}
              <OptionModal
                showModal={showJobModal}
                setShowModal={setShowJobModal}
                onSelect={(value: string) => {
                  setFieldValue("jobTitle", value);
                  setShowJobModal(false);
                }}
                options={jobTitleOptions}
              />

              {/* Salary */}
              <Field
                label="Salary"
                errors={errors.salary}
                touched={touched.salary}
                required={true}
              >
                <MaterialIcons
                  name="attach-money"
                  size={24}
                  color={theme.lightText}
                />
                <TextInput
                  keyboardType="numeric"
                  value={formatCurrency(values.salary)}
                  placeholder="Enter Salary"
                  placeholderTextColor={theme.lightText}
                  onChangeText={(text) => {
                    const rawValue = text.replace(/[^0-9]/g, "");
                    setFieldValue("salary", rawValue);
                  }}
                  onBlur={handleBlur("salary")}
                  style={s.input}
                />
              </Field>

              <TouchableOpacity
                onPress={() => {
                  setTouched({
                    name: true,
                    gender: true,
                    dateOfBirth: true,
                    jobTitle: true,
                    salary: true,
                  });
                  handleSubmit();
                }}
                style={s.submitBtn}
              >
                <Text style={s.submitTxt}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function CreateStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 20,
    },
    main: {
      flex: 1,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      color: theme.text,
      fontSize: 20,
      textAlign: "center",
      marginBottom: 20,
    },
    input: {
      paddingHorizontal: 10,
      color: theme.text,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderRadius: 10,
      paddingVertical: 10,
    },
    submitBtn: {
      width: "95%",
      backgroundColor: theme.text,
      paddingVertical: 10,
      borderRadius: 20,
    },
    submitTxt: {
      color: theme.background,
      textAlign: "center",
    },
  });
}
