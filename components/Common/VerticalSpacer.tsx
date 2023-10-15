import { View } from "react-native";

interface Props {
  height: number;
}
export const VerticalSpacer = (props: Props) => {
  const { height } = props;
  return <View style={{ height }} />;
};
