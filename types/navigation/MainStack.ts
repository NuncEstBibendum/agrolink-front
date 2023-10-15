import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { HomeStackListParams } from "./HomeStack";
import { ProfileStackListParams } from "./ProfileStack";

export type MainStackListParams = {
  HomeStack?: NavigatorScreenParams<HomeStackListParams>;
  ProfileStack?: NavigatorScreenParams<ProfileStackListParams>;
};

export type MainStack = Navigator & MainStackListParams;

export type MainStackProps<T extends keyof MainStackListParams> =
  NativeStackNavigationProp<MainStackListParams, T>;

export type MainStackRouteProp<T extends keyof MainStackListParams> = RouteProp<
  MainStackListParams,
  T
>;
