import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.grey[100],
  },
  header: {
    width: "100%",
    backgroundColor: colors.blue[100],
    paddingLeft: 14,
    paddingVertical: 22,
  },
  title: {
    fontSize: 24,
    color: colors.white,
  },
  strong: {
    textTransform: "capitalize",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.grey[100],
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  profilePictureContainer: {
    width: "50%",
    alignSelf: "center",
  },
  profileIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: colors.blue[300],
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  downloadText: {
    fontSize: 10,
    lineHeight: 15,
    color: colors.blue[200],
    marginTop: 12,
    textAlign: "center",
  },
  linkText: {
    fontSize: 14,
    color: colors.black,
  },
  button: {
    width: "100%",
    backgroundColor: colors.white,
    padding: 16,
    flexDirection: "row",
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grey[100],
  },
  legalTitle: {
    fontSize: 14,
    color: colors.grey[500],
  },
  error: {
    fontSize: 14,
    color: colors.red[500],
    textAlign: "center",
    marginTop: 12,
  },
  termsContainer: {
    padding: 8,
    borderColor: colors.blue[300],
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
  },
  terms: {
    fontSize: 14,
    color: colors.blue[300],
  },
});

export default styles;
