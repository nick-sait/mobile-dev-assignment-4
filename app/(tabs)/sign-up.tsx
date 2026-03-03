import {  StyleSheet, Appearance, Text } from "react-native";
import { Colors } from "@/constants/theme";

import { SafeAreaView } from "react-native-safe-area-context";

// WILL BE EMPLOYEE INFORMATION FORM

export default function SignUpScreen() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const s = CreateStyles(theme);

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.header}>SIGN UP SCREEN</Text>
    </SafeAreaView>
  );
}

function CreateStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center"
    },
    header: {
      color: theme.text,
      fontSize: 20
    }
  });
}