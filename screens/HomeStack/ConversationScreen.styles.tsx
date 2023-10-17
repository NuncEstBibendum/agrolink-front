import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.grey[100],
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.grey[100],
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  container: {
    backgroundColor: colors.white,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    gap: 8,
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 16,
  },
  tag: {
    backgroundColor: colors.grey[200],
    borderRadius: 4,
    padding: 4,
  },
  tagText: {
    color: colors.grey[800],
  },
  messageContainer: {
    marginHorizontal: 8,
  },
  textInputContainer: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
    flexDirection: "row",
    gap: 10,
    padding: 8,
  },
  sendIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
    paddingLeft: 8,
  },
});

export default styles;
