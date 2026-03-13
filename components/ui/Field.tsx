import { View, Text, Appearance, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

export default function Field({
  label,
  errors,
  touched,
  children,
  required = true,
}: {
  label: string;
  errors: any;
  touched: any;
  children?: React.ReactNode;
  required: boolean;
}) {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const s = CreateStyles(theme);
  return (
    <View style={s.fieldContainer}>
      <View style={s.headerContainer}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Text style={s.label}>{label}</Text>
          {required && <Text style={{ color: "#ffa9a9" }}>*</Text>}
        </View>
        {touched && errors && (
          <Text style={s.errors}>{errors}</Text>
        )}
      </View>
      <View style={s.input}>{children}</View>
    </View>
  );
}

function CreateStyles(theme: any) {
  return StyleSheet.create({
    fieldContainer: {
      width: "100%",
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    label: {
      color: theme.text,
      fontWeight: "light",
      fontSize: 14,
      marginBottom: 6,
    },
    errors: {
      color: "#ffa0a0",
      fontSize: 12,
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.input,
      borderRadius: 6,
      paddingHorizontal: 10,
      color: theme.text,
    },
  });
}
