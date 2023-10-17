import { useState, useEffect } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthStack/AuthScreen";
import ForgottenPasswordScreen from "../screens/AuthStack/ForgottenPasswordScreen";
import PasswordSentScreen from "../screens/AuthStack/PasswordSentScreen";
import { useAuth } from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import { DecodedJwt } from "../types/models/DecodedJwt";
import { colors } from "../constants/colors";
import { useRoute } from "@react-navigation/native";
import ResetPasswordScreen from "../screens/AuthStack/ResetPasswordScreen";
import EmailSentScreen from "../screens/AuthStack/EmailSentScreen";
import RegisterScreen from "../screens/AuthStack/RegisterScreen";

interface Route {
  params?: {
    screen?: string;
  };
}

const Stack = createNativeStackNavigator();

const AuthStack: React.FunctionComponent = () => {
  const route: Route = useRoute();
  const { accessToken, loaded } = useAuth();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    if (loaded) {
      if (accessToken) {
        if (
          new Date((jwt_decode(accessToken) as DecodedJwt).exp) < new Date()
        ) {
          setInitialRoute("AuthScreen");
          return;
        }
      }
      if (route?.params?.screen) {
        setInitialRoute(route.params.screen);
        return;
      }
      setInitialRoute("AuthScreen");
    }
  }, [accessToken, loaded]);

  return initialRoute !== null ? (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="ForgottenPasswordScreen"
        component={ForgottenPasswordScreen}
      />
      <Stack.Screen name="PasswordSentScreen" component={PasswordSentScreen} />
      <Stack.Screen name="EmailSentScreen" component={EmailSentScreen} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  ) : (
    <View
      style={{ backgroundColor: colors.white, width: "100%", height: "100%" }}
    />
  );
};

export default AuthStack;
