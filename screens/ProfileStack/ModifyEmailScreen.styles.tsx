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
    width: "100%",
    paddingHorizontal: 14,
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
  footer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: colors.grey[100],
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
  error: {
    fontSize: 14,
    color: colors.red[500],
    width: 350,
    marginLeft: 12,
  },
  header: {
    width: "100%",
    backgroundColor: colors.white,
    paddingLeft: 14,
    paddingVertical: 22,
    borderBottomColor: colors.grey[100],
    borderBottomWidth: 1,
  },
});

export default styles;
