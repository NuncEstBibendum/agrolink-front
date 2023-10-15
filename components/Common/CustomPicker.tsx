import { Picker } from "@react-native-picker/picker";
import {
  Platform,
  ActionSheetIOS,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants/colors";

export interface Item {
  label: string;
  value: any;
}
interface Props {
  items: Item[];
  label?: string;
  value: Item;
  onValueChange: (value: Item) => void;
}
export const CustomPicker = (props: Props) => {
  const { items, label, value, onValueChange } = props;

  const showIosActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Annuler"].concat(items.map((item) => item.label)),
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          onValueChange(items[buttonIndex - 1]);
        }
      }
    );
  };

  return (
    <>
      {Platform.OS === "android" ? (
        <View style={styles.container}>
          {label && (
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{label}</Text>
            </View>
          )}
          <View style={styles.picker}>
            <Picker
              style={styles.input}
              selectedValue={value}
              onValueChange={(value, index) => {
                onValueChange(value);
              }}
            >
              {items.map((item) => (
                <Picker.Item label={item.label} value={item} key={item.value} />
              ))}
            </Picker>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          {label && (
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{label}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={showIosActionSheet}
            style={styles.iosPicker}
          >
            <Text>{value.label}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: colors.white,
    zIndex: 1,
    top: -9,
    left: 16,
    paddingHorizontal: 4,
  },
  label: {
    color: colors.grey[600],
    fontSize: 12,
  },
  picker: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
  input: {
    padding: 15,
    backgroundColor: colors.white,
    width: "100%",
  },
  iosPicker: {
    padding: 15,
    backgroundColor: colors.white,
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
  text: {
    textAlign: "center",
    color: colors.white,
  },
});
