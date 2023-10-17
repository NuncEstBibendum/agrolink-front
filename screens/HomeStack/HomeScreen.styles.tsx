import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  flatList: {
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
});

export default styles;
