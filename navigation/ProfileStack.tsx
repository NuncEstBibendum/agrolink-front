import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModifyEmailScreen from "../screens/ProfileStack/ModifyEmailScreen";
import ModifyPasswordScreen from "../screens/ProfileStack/ModifyPasswordScreen";
import ProfileScreen from "../screens/ProfileStack/ProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileStack: React.FunctionComponent = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="ProfileScreen"
  >
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="ModifyEmailScreen" component={ModifyEmailScreen} />
    <Stack.Screen
      name="ModifyPasswordScreen"
      component={ModifyPasswordScreen}
    />
  </Stack.Navigator>
);

export default ProfileStack;
