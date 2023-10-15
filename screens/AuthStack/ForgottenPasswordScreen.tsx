import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Common/Button";
import { CustomTextInput } from "../../components/Common/TextInput";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import commonstyles from "../CommonStyles.styles";
import styles from "./ForgottenPasswordScreen.styles";
import { TitleBar } from "../../components/Common/TitleBar";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthStackProps } from "../../types/navigation/AuthStack";

const ForgottenPasswordScreen: React.FunctionComponent = () => {
  const { forgottenPassword } = useAuth();
  const navigationResetPasswordScreen =
    useNavigation<AuthStackProps<"EmailSentScreen">>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (email === "") {
      return;
    }
    setIsLoading(true);
    try {
      await forgottenPassword(email);
      setIsLoading(false);
      navigationResetPasswordScreen.navigate("EmailSentScreen", {
        email: email,
      });
    } catch (e) {
      setIsLoading(false);
      navigationResetPasswordScreen.navigate("EmailSentScreen", {
        email: email,
      });
    }
  };

  return (
    <View style={commonstyles.mainContainer}>
      <VerticalSpacer height={16} />
      <View style={commonstyles.body}>
        <TitleBar title="Mot de passe oublié" />
        <VerticalSpacer height={30} />
        <View style={styles.form}>
          <Text style={styles.subtitle}>
            Veuillez indiquer votre adresse email pour réinitialiser votre mot
            de passe
          </Text>
          <VerticalSpacer height={28} />
          <CustomTextInput
            placeholder="Adresse email"
            autoComplete="email"
            onChangeText={(text) => setEmail(text)}
            label="Adresse email"
          />
          <VerticalSpacer height={20} />
        </View>
      </View>
      <View style={commonstyles.footer}>
        <Button
          title="Modifier le mot de passe"
          type="primary"
          handlePress={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading || !email || !email.includes("@")}
        />
      </View>
    </View>
  );
};

export default ForgottenPasswordScreen;
