import { Pressable, View, Text, Appearance, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import { ReactNativeModal } from "react-native-modal";

export default function OptionModal({
  options,
  onSelect,
  showModal,
  setShowModal,
}: {
  options: any;
  onSelect: any;
  showModal: any;
  setShowModal: any;
}) {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const s = CreateStyles(theme);
  return (
    <ReactNativeModal
      style={s.container}
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      onBackButtonPress={() => setShowModal(false)}
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
    >
      <View style={s.main}>
        <Text style={s.header}>Select an option</Text>
        {options.map((o: any) => {
          return (
            <Pressable 
                style={s.button}
                onPress={() => onSelect(o.value)} key={o.label}>
              <Text style={s.buttonText}>{o.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </ReactNativeModal>
  );
}

function CreateStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
    main: {
        backgroundColor: theme.foreground,
        borderRadius: 10
    },
    header: {
        color: theme.text,
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 10,
    },
    button: {
        padding: 12
    },
    buttonText: {
        color: theme.text
    }
  });
}
