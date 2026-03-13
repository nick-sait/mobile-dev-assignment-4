import Field from "@/components/ui/Field";
import LogInValidation from "@/components/validationSchemas/LogInValidation";
import { Colors } from "@/constants/theme";
import {
  MaterialIcons
} from "@expo/vector-icons";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const s = CreateStyles(theme);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <Text style={s.header}>Log-In Page</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmpassword: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            Alert.alert("Success", "Employee has log-in successfully.");
            resetForm();
          }}
          validationSchema={LogInValidation}
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
              {/* Email Field */}
              <Field
                label="Email"
                errors={errors.email}
                touched={touched.email}
                required={true}
              >
                <MaterialIcons
                  name="mail"
                  size={24}
                  color={theme.lightText}
                />
                <TextInput
                  value={values.email}
                  placeholder="Enter your email"
                  placeholderTextColor={theme.lightText}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={s.input}
                />
              </Field>

              {/* Password Field */}
              <Field label="Password" errors={errors.password} touched={touched.password} required={true}>
                <MaterialIcons name="password" size={24} color={theme.lightText} />
                <TextInput
                  value={values.password}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.lightText}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry={!showPassword}
                  style={[s.input, { flex: 1 }]}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color={theme.lightText}
                  />
                </TouchableOpacity>
              </Field>

              {/* Confirm Password Field */}
              <Field label="Confirm Password" errors={errors.confirmpassword} touched={touched.confirmpassword} required={true}>
                <MaterialIcons name="password" size={24} color={theme.lightText} />
                <TextInput
                  value={values.confirmpassword}
                  placeholder="Confirm your password"
                  placeholderTextColor={theme.lightText}
                  onChangeText={handleChange("confirmpassword")}
                  onBlur={handleBlur("confirmpassword")}
                  secureTextEntry={!showConfirmPassword}
                  style={[s.input, { flex: 1 }]}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color={theme.lightText}
                  />
                </TouchableOpacity>
              </Field>

              <TouchableOpacity
                onPress={() => {
                  setTouched({
                    email: true,
                    password: true,
                    confirmpassword: true,
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
