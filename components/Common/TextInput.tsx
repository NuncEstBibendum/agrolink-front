import { StyleSheet, Text, View } from "react-native";
import { TextInput, Platform } from "react-native";
import { colors } from "../../constants/colors";

interface Props {
  placeholder: string;
  autoComplete:
    | "birthdate-day"
    | "birthdate-full"
    | "birthdate-month"
    | "birthdate-year"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-day"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "email"
    | "gender"
    | "name"
    | "name-family"
    | "name-given"
    | "name-middle"
    | "name-middle-initial"
    | "name-prefix"
    | "name-suffix"
    | "password"
    | "password-new"
    | "postal-address"
    | "postal-address-country"
    | "postal-address-extended"
    | "postal-address-extended-postal-code"
    | "postal-address-locality"
    | "postal-address-region"
    | "postal-code"
    | "street-address"
    | "sms-otp"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-device"
    | "username"
    | "username-new"
    | "off"
    | undefined;
  onChangeText: (text: string) => void;
  label?: string;
  hasError?: boolean;
  onBlur?: () => void;
  numberOfLines?: number;
  disabled?: boolean;
  notPressable?: boolean;
  value?: string;
  style?: any;
  ref?: any;
}
export const CustomTextInput = (props: Props) => {
  const {
    placeholder,
    onChangeText,
    autoComplete,
    label,
    hasError,
    onBlur,
    numberOfLines,
    disabled,
    notPressable,
    style,
    ref,
    value,
  } = props;
  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.label,
              hasError ? { color: colors.red[500] } : {},
              disabled ? { color: "#98A2B3" } : {},
            ]}
          >
            {label}
          </Text>
        </View>
      )}
      <TextInput
        ref={ref}
        placeholder={placeholder}
        onChange={(text) => onChangeText(text.nativeEvent.text)}
        style={[
          styles.input,
          hasError ? { borderColor: colors.red[500] } : {},
          numberOfLines ? { textAlignVertical: "top" } : {},
          numberOfLines && Platform.OS === "ios"
            ? { minHeight: 20 * numberOfLines }
            : {},
          disabled ? { borderStyle: "dashed" } : {},
        ]}
        autoComplete={autoComplete}
        secureTextEntry={autoComplete === "password"}
        keyboardType={autoComplete === "email" ? "email-address" : "default"}
        onBlur={onBlur}
        numberOfLines={numberOfLines}
        multiline={numberOfLines ? true : false}
        editable={!(disabled || notPressable)}
        placeholderTextColor={disabled ? colors.black : colors.grey[300]}
        value={value ? value : ""}
      />
    </View>
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
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey[300],
    padding: 15,
    backgroundColor: colors.white,
  },
  text: {
    textAlign: "center",
    color: colors.white,
  },
});
