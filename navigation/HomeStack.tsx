import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeStack/HomeScreen";
import AskQuestionScreen from "../screens/HomeStack/AskQuestionScreen";
import ConversationScreen from "../screens/HomeStack/ConversationScreen";

const Stack = createNativeStackNavigator();

const HomeStack: React.FunctionComponent = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Group>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AskQuestionScreen" component={AskQuestionScreen} />
      <Stack.Screen name="ConversationScreen" component={ConversationScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default HomeStack;
