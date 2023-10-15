import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AuthStackListParams } from "./AuthStack";
import { HomeStackListParams } from "./HomeStack";

export type Navigator = {
  AuthStack?: NavigatorScreenParams<AuthStackListParams>;
  HomeStack?: NavigatorScreenParams<HomeStackListParams>;
};

export type NavigatorProp<T extends keyof Navigator> =
  NativeStackNavigationProp<Navigator, T>;

export type NavigatorRouteProp<T extends keyof Navigator> = RouteProp<
  Navigator,
  T
>;
