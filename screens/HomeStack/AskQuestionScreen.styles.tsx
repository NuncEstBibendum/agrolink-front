import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  scrollView: {
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
    gap: 10,
    flexWrap: "wrap",
    paddingTop: 10,
  },
  tag: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.grey[200],
  },
  tagSelected: {
    backgroundColor: colors.blue[500],
    color: colors.white,
  },
});

export default styles;
