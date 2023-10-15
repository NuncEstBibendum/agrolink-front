import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Navigator } from "./Navigator";

export type HomeStackListParams = {
  HomeScreen: undefined;
};

export type HomeStack = Navigator & HomeStackListParams;

export type HomeStackProps<T extends keyof HomeStack> =
  NativeStackNavigationProp<HomeStack, T>;

export type HomeStackRouteProp<T extends keyof HomeStack> = RouteProp<
  HomeStack,
  T
>;
