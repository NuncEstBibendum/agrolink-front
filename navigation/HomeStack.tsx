import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeStack/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeStack: React.FunctionComponent = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Group>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default HomeStack;
