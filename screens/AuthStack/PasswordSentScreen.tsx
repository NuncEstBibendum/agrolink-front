import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import { BackButton } from "../../components/Common/BackButton";
import { Button } from "../../components/Common/Button";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import { AuthStackProps } from "../../types/navigation/AuthStack";
import commonstyles from "../CommonStyles.styles";
import styles from "./PasswordSentScreen.styles";

const PasswordSentScreen: React.FunctionComponent = () => {
  const navigationLoginScreen = useNavigation<AuthStackProps<"AuthScreen">>();

  return (
    <View style={commonstyles.mainContainer}>
      <BackButton />
      <KeyboardAvoidingView style={styles.form} behavior="position">
        <VerticalSpacer height={30} />
        <Text style={styles.subtitle}>
          Un lien de réinitialisation vous a été envoyé par email, si votre
          adresse est bien associée à un compte. Merci de consulter votre boîte
          de réception ainsi que les spams.
        </Text>
        <VerticalSpacer height={30} />
        <Button
          title="Retour à l'écran de connexion"
          type="primary"
          handlePress={() => navigationLoginScreen.navigate("AuthScreen")}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default PasswordSentScreen;
