import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";
import GreenCheckCircle from "../../assets/svg/green-check.svg";

interface Props {
  text: string;
  onPress: () => void;
  paddingBottom?: number;
}
export const SuccessModal = (props: Props) => {
  const { text, onPress, paddingBottom } = props;
  return (
    <Modal transparent animationType="fade">
      <TouchableOpacity
        style={[styles.wrapper, { paddingBottom: paddingBottom || 96 }]}
        activeOpacity={1}
        onPress={onPress}
      >
        <View style={styles.container}>
          <View style={styles.checkContainer}>
            <GreenCheckCircle />
          </View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 14,
    zIndex: 0,
  },
  container: {
    backgroundColor: colors.green[300],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: colors.green[100],
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 16,
  },
});
