import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AuthStackListParams } from "./AuthStack";
import { MainStackListParams } from "./MainStack";

export type AppStackListParams = {
  AuthStack?: NavigatorScreenParams<AuthStackListParams>;
  MainStack?: NavigatorScreenParams<MainStackListParams>;
};

export type AppStack = Navigator & AppStackListParams;

export type AppStackProps<T extends keyof AppStackListParams> =
  NativeStackNavigationProp<AppStackListParams, T>;

export type AppStackRouteProp<T extends keyof AppStackListParams> = RouteProp<
  AppStackListParams,
  T
>;
