import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Common/Button";
import { CustomTextInput } from "../../components/Common/TextInput";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import commonstyles from "../CommonStyles.styles";
import styles from "./ResetPasswordScreen.styles";
import { TitleBar } from "../../components/Common/TitleBar";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AuthStackProps } from "../../types/navigation/AuthStack";
import { useAuth } from "../../hooks/useAuth";

interface ExtendedRoute extends RouteProp<ParamListBase, string> {
  params: { token: string };
}
const ResetPasswordScreen: React.FunctionComponent = () => {
  const route: ExtendedRoute = useRoute();
  const navigationLogin = useNavigation<AuthStackProps<"AuthScreen">>();
  const { resetPassword } = useAuth();

  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await resetPassword(pwd1, pwd2, route.params.token);
      navigationLogin.navigate("AuthScreen");
    } catch (e) {
      console.log("error", e);
      setErrorMessage("Le mot de passe est incorrect.");
    }
    setIsLoading(false);
  };

  return (
    <View style={commonstyles.mainContainer}>
      <VerticalSpacer height={16} />
      <View style={commonstyles.body}>
        <TitleBar title="Nouveau mot de passe" />
        <VerticalSpacer height={30} />
        <View style={styles.form}>
          <Text style={styles.subtitle}>
            {`Veuillez créer un nouveau mot de passe.`}
          </Text>
          <VerticalSpacer height={28} />
          <CustomTextInput
            placeholder="Nouveau mot de passe"
            autoComplete="password"
            onChangeText={(text) => setPwd1(text)}
            label="Nouveau mot de passe"
            hasError={errorMessage !== ""}
          />
          <VerticalSpacer height={3} />
          <VerticalSpacer height={28} />
          <CustomTextInput
            placeholder="Confirmer mot de passe"
            autoComplete="password"
            onChangeText={(text) => setPwd2(text)}
            label="Confirmer mot de passe"
            hasError={errorMessage !== ""}
          />
          <VerticalSpacer height={3} />
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
      </View>
      <View style={commonstyles.footer}>
        <Button
          title="Confirmer"
          type="primary"
          handlePress={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
