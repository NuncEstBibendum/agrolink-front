import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  logo: {
    width: "60%",
    resizeMode: "contain",
    height: 100,
    marginTop: 200,
    alignSelf: "center",
  },
  form: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
  },
  forgottenPassword: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  link: {
    color: colors.black,
  },
  error: {
    fontSize: 14,
    color: colors.red[500],
    width: 350,
  },
});

export default styles;
