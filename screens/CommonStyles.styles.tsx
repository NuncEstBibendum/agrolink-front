import { StyleSheet, Platform } from "react-native";
import { colors } from "../constants/colors";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "ios" ? 24 : 0,
    position: "relative",
  },
  body: {
    paddingHorizontal: 14,
  },
  topContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 60,
  },
  topContainerPadding: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 60,
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  bottomContainer: {
    width: "100%",
    marginTop: "auto",
    justifyContent: "flex-end",
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    color: colors.white,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 34,
    paddingTop: 14,
    paddingHorizontal: 14,
  },
  footnoteContainer: {
    paddingBottom: 16,
    paddingTop: 24,
  },
  footnote: {
    fontSize: 14,
    color: colors.grey[500],
    textAlign: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default styles;
