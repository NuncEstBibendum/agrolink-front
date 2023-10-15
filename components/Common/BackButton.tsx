import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { TouchableOpacity, Image } from "react-native";
import BackArrow from "../../assets/svg/arrow-left.svg";

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <BackArrow style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
  );
};
