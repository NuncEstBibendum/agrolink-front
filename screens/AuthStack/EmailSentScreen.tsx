import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Common/Button";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import commonstyles from "../CommonStyles.styles";
import styles from "./EmailSentScreen.styles";
import { TitleBar } from "../../components/Common/TitleBar";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AuthStackProps } from "../../types/navigation/AuthStack";
import { useAuth } from "../../hooks/useAuth";
import * as SecureStore from "expo-secure-store";

interface ExtendedRoute extends RouteProp<ParamListBase, string> {
  params: { email: string };
}
const EmailSentScreen: React.FunctionComponent = () => {
  const route: ExtendedRoute = useRoute();
  const navigationLogin = useNavigation<AuthStackProps<"AuthScreen">>();
  const { forgottenPassword } = useAuth();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleResendEmail = async () => {
    if (route.params.email === "" || !route.params.email.includes("@")) {
      return;
    }
    setIsResendLoading(true);
    await forgottenPassword(route.params.email);
    setIsResendLoading(false);
  };

  return (
    <View style={commonstyles.mainContainer}>
      <VerticalSpacer height={16} />
      <View style={commonstyles.body}>
        <TitleBar title="Mot de passe oublié" />
        <VerticalSpacer height={30} />
        <View style={styles.form}>
          <Text style={styles.subtitle}>
            {`Un email vient de vous être envoyé si l'adresse ${route.params.email} correspond bien à un compte utilisateur. Merci d'ouvrir le lien présent dans ce mail depuis votre smartphone afin de réinitialiser votre mot de passe.`}
          </Text>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
      </View>
      <View style={commonstyles.footer}>
        <Button
          title="Renvoyer un mail"
          type="secondary"
          handlePress={handleResendEmail}
          isLoading={isResendLoading}
          disabled={isResendLoading}
        />
        <VerticalSpacer height={11} />
        <Button
          title="Retour à l'écran de connexion"
          type="primary"
          handlePress={() => navigationLogin.navigate("AuthScreen")}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

export default EmailSentScreen;
