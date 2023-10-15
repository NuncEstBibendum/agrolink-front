import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  logo: {
    width: "60%",
    resizeMode: "contain",
    height: 100,
    marginTop: 150,
    alignSelf: "center",
  },
  form: {
    flex: 1,
    paddingHorizontal: 25,
    width: "100%",
  },
  subtitle: {
    color: colors.white,
    paddingHorizontal: 25,
    textAlign: "center",
  },
  link: {
    color: colors.white,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default styles;
