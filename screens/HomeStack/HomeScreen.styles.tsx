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
  noConversationText: {
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 10,
  },
  tabContainer: {
    backgroundColor: colors.grey[200],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    justifyContent: "center",
  },
  tabText: {
    textAlign: "center",
  },
});

export default styles;
