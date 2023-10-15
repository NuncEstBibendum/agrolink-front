import { View, Text, StyleSheet, Platform } from "react-native";
import { colors } from "../../constants/colors";
import { BackButton } from "./BackButton";

interface Props {
  title: string;
  hideBackButton?: boolean;
  fontSize?: number;
}
export const TitleBar = (props: Props) => {
  const { title, hideBackButton, fontSize } = props;
  return (
    <View style={styles.container}>
      {!hideBackButton && <BackButton />}
      <Text
        style={[
          styles.title,
          hideBackButton ? {} : { marginLeft: 18 },
          fontSize ? { fontSize: fontSize } : {},
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 15,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    transform: [{ translateY: 2 }],
    color: colors.blue[600],
  },
});
