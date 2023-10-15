import { StyleSheet } from "react-native";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { colors } from "../../constants/colors";

interface Props {
  title: string;
  type: "primary" | "secondary";
  handlePress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}
export const Button = (props: Props) => {
  const { title, type, handlePress, isLoading, disabled } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={
        disabled
          ? () => {
              return;
            }
          : handlePress
      }
      style={[
        styles.button,
        type === "primary"
          ? { backgroundColor: colors.blue[600], borderColor: colors.blue[600] }
          : { backgroundColor: colors.white, borderColor: colors.blue[600] },
        disabled
          ? {
              backgroundColor: "rgba(0,0,0,0.12)",
              borderColor: "rgba(0,0,0,0.12)",
            }
          : {},
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={type === "primary" ? colors.white : colors.blue[600]}
        />
      ) : (
        <Text
          style={[
            styles.text,
            type === "primary"
              ? { color: colors.white }
              : { color: colors.blue[600] },
            disabled ? { color: "rgba(0,0,0,0.26)" } : {},
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 15,
    borderWidth: 1,
    width: "100%",
    margin: 0,
  },
  text: {
    textAlign: "center",
    color: colors.white,
    textTransform: "uppercase",
  },
});
