import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Navigator } from "./Navigator";

export type ProfileStackListParams = {
  ProfileScreen:
    | { isPasswordModified?: boolean; isEmailModified?: boolean }
    | undefined;
  UnavailabilityScreen: undefined;
  ModifyEmailScreen: undefined;
  ModifyPasswordScreen: undefined;
  SignedContractsScreen: undefined;
};

export type ProfileStack = Navigator & ProfileStackListParams;

export type ProfileStackProps<T extends keyof ProfileStack> =
  NativeStackNavigationProp<ProfileStack, T>;

export type ProfileStackRouteProp<T extends keyof ProfileStack> = RouteProp<
  ProfileStack,
  T
>;
