import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Common/Button";
import { CustomTextInput } from "../../components/Common/TextInput";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import commonstyles from "../CommonStyles.styles";
import styles from "./ModifyEmailScreen.styles";
import { TitleBar } from "../../components/Common/TitleBar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/validation.utils";
import { changeEmail } from "../../services/user.service";
import { ProfileStackProps } from "../../types/navigation/ProfileStack";

const ModifyEmailScreen: React.FunctionComponent = () => {
  const { login, email: currentEmail } = useAuth();
  const navigationProfileScreen =
    useNavigation<ProfileStackProps<"ProfileScreen">>();

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!isValidEmail(email)) {
      setErrorMessage(
        "L'adresse email n'est pas valide. Veuillez saisir une adresse email valide."
      );
    }
    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      setErrorMessage("Les adresses email ne correspondent pas.");
    }
    if (
      isValidEmail(email) &&
      email.toLowerCase() === confirmEmail.toLowerCase()
    ) {
      setIsLoading(true);
      const resChangeEmail = await changeEmail({
        oldEmail: currentEmail,
        email: email,
        confirmEmail: confirmEmail,
        password: password,
      });
      setIsLoading(false);
      const resSignin = await login({ email: email, password: password });
      console.log("resSignin", resSignin);
      if (resChangeEmail?.status === 200 && resSignin) {
        navigationProfileScreen.navigate("ProfileScreen", {
          isEmailModified: true,
        });
      }
    }
    return;
  };

  return (
    <View style={commonstyles.mainContainer}>
      <View style={styles.header}>
        <TitleBar title="Modifier mon adresse email" />
      </View>
      <VerticalSpacer height={30} />
      <View style={styles.form}>
        <CustomTextInput
          placeholder={currentEmail}
          autoComplete="email"
          onChangeText={() => {}}
          label="Adresse email actuelle"
          disabled
          value={currentEmail}
        />
        <VerticalSpacer height={12} />
        <CustomTextInput
          placeholder="Nouvelle adresse email"
          autoComplete="email"
          onChangeText={(text) => setEmail(text)}
          label="Nouvelle adresse email"
          hasError={errorMessage !== ""}
          value={email}
        />
        <VerticalSpacer height={12} />
        <CustomTextInput
          placeholder="Confirmer votre nouvelle adresse"
          autoComplete="email"
          onChangeText={(text) => setConfirmEmail(text)}
          label="Confirmer votre nouvelle adresse"
          hasError={errorMessage !== ""}
          onBlur={() => {
            email.toLowerCase() !== confirmEmail.toLowerCase()
              ? setErrorMessage("Les adresses email ne correspondent pas.")
              : setErrorMessage("");
          }}
          value={confirmEmail}
        />
        <VerticalSpacer height={12} />
        <CustomTextInput
          placeholder="Mot de passe"
          autoComplete="password"
          onChangeText={(text) => setPassword(text)}
          label="Mot de passe"
          value={password}
        />
        <VerticalSpacer height={3} />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <View style={styles.footer}>
        <Button
          title="Modifier l'adresse email"
          type="primary"
          handlePress={handleSubmit}
          isLoading={isLoading}
          disabled={
            isLoading ||
            email === "" ||
            confirmEmail === "" ||
            errorMessage !== ""
          }
        />
      </View>
    </View>
  );
};

export default ModifyEmailScreen;
