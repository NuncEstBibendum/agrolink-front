import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";

interface Props {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}
export const Tabs = (props: Props) => {
  const { activeTab, setActiveTab } = props;
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[
          styles.tabContainer,
          activeTab === "pending" ? { backgroundColor: colors.blue[500] } : {},
        ]}
        onPress={() => setActiveTab("pending")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "pending" ? { color: colors.white } : {},
          ]}
        >
          En attente
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabContainer,
          activeTab === "answered" ? { backgroundColor: colors.blue[500] } : {},
        ]}
        onPress={() => setActiveTab("answered")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "answered" ? { color: colors.white } : {},
          ]}
        >
          Répondues
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
