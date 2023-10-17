import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useAuth } from "../hooks/useAuth";
import { View } from "react-native";
import { colors } from "../constants/colors";
import jwt_decode from "jwt-decode";
import { DecodedJwt } from "../types/models/DecodedJwt";
import ProfileStack from "./ProfileStack";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { accessToken, loaded, validateJwt, logout } = useAuth();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const checkJwt = async () => {
    const res = await validateJwt();
    if (!res) {
      await logout();
    }
  };

  useEffect(() => {
    if (loaded) {
      if (accessToken) {
        try {
          checkJwt();
        } catch (e) {
          console.error("ERROR:", e);
          logout();
        }
        if (
          new Date((jwt_decode(accessToken) as DecodedJwt).exp) > new Date()
        ) {
          setInitialRoute("MainStack");
          return;
        }
      }
      logout();
      setInitialRoute("AuthStack");
    }
  }, [accessToken, loaded]);

  return initialRoute !== null ? (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
    </Stack.Navigator>
  ) : (
    <View
      style={{ backgroundColor: colors.white, width: "100%", height: "100%" }}
    />
  );
};

export default Navigator;
