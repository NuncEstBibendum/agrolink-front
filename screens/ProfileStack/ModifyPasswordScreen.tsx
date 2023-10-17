import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Common/Button";
import { CustomTextInput } from "../../components/Common/TextInput";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import commonstyles from "../CommonStyles.styles";
import styles from "./ModifyPasswordScreen.styles";
import { TitleBar } from "../../components/Common/TitleBar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { isValidPwd } from "../../utils/validation.utils";
import { ProfileStackProps } from "../../types/navigation/ProfileStack";

const ModifyPasswordScreen: React.FunctionComponent = () => {
  const navigationHome = useNavigation<ProfileStackProps<"ProfileScreen">>();

  const [pwd0, setPwd0] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { changePassword } = useAuth();

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!isValidPwd(pwd1)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 10 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial."
      );
    }
    if (pwd1 !== pwd2) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
    }
    if (isValidPwd(pwd1) && pwd1 === pwd2) {
      setIsLoading(true);
      const res = await changePassword(pwd0, pwd1, pwd2);
      setIsLoading(false);
      if (res.success) {
        navigationHome.navigate("ProfileScreen", { isPasswordModified: true });
      }
    }
    return;
  };

  return (
    <View style={commonstyles.mainContainer}>
      <View style={styles.header}>
        <TitleBar title="Modifier mon mot de passe" />
      </View>
      <View style={styles.form}>
        <VerticalSpacer height={28} />
        <CustomTextInput
          placeholder="Mot de passe actuel"
          autoComplete="password"
          onChangeText={(text) => setPwd0(text)}
          label="Mot de passe actuel"
          value={pwd0}
        />
        <VerticalSpacer height={12} />
        <CustomTextInput
          placeholder="Nouveau mot de passe"
          autoComplete="password"
          onChangeText={(text) => setPwd1(text)}
          label="Nouveau mot de passe"
          hasError={errorMessage !== ""}
          value={pwd1}
        />
        <VerticalSpacer height={12} />
        <CustomTextInput
          placeholder="Confirmer le mot de passe"
          autoComplete="password"
          onChangeText={(text) => setPwd2(text)}
          label="Confirmer le mot de passe"
          hasError={errorMessage !== ""}
          onBlur={() => {
            pwd1 !== pwd2
              ? setErrorMessage("Les mots de passe ne correspondent pas.")
              : setErrorMessage("");
          }}
          value={pwd2}
        />
        <VerticalSpacer height={3} />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <View style={styles.footer}>
        <Button
          title="Modifier le mot de passe"
          type="primary"
          handlePress={handleSubmit}
          isLoading={isLoading}
          disabled={
            isLoading ||
            pwd0 === "" ||
            pwd1 === "" ||
            pwd2 === "" ||
            errorMessage !== ""
          }
        />
      </View>
    </View>
  );
};

export default ModifyPasswordScreen;
