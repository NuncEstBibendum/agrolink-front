import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AuthStackListParams } from "./AuthStack";
import { MainStackListParams } from "./MainStack";
import { ProfileStackListParams } from "./ProfileStack";

export type AppStackListParams = {
  AuthStack?: NavigatorScreenParams<AuthStackListParams>;
  MainStack?: NavigatorScreenParams<MainStackListParams>;
  ProfileStack?: NavigatorScreenParams<ProfileStackListParams>;
};

export type AppStack = Navigator & AppStackListParams;

export type AppStackProps<T extends keyof AppStackListParams> =
  NativeStackNavigationProp<AppStackListParams, T>;

export type AppStackRouteProp<T extends keyof AppStackListParams> = RouteProp<
  AppStackListParams,
  T
>;
