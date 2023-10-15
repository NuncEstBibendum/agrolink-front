import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Navigator } from "./Navigator";

export type AuthStackListParams = {
  AuthScreen: undefined;
  RegisterScreen: undefined;
  ForgottenPasswordScreen: undefined;
  ResetPasswordScreen: { token: string };
  EmailSentScreen: { email: string };
};

export type AuthStack = Navigator & AuthStackListParams;

export type AuthStackProps<T extends keyof AuthStack> =
  NativeStackNavigationProp<AuthStack, T>;

export type AuthStackRouteProp<T extends keyof AuthStack> = RouteProp<
  AuthStack,
  T
>;
