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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { changePassword } = useAuth();

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!isValidPwd(oldPassword)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 10 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial."
      );
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
    }
    if (isValidPwd(newPassword) && newPassword === confirmNewPassword) {
      setIsLoading(true);
      try {
        const res = await changePassword(
          oldPassword,
          newPassword,
          confirmNewPassword
        );
        setIsLoading(false);
        if (res.success) {
          navigationHome.navigate("ProfileScreen", {
            isPasswordModified: true,
          });
        }
      } catch (e) {
        setIsLoading(false);
        console.log("ERROR:", JSON.stringify(e));
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
          onChangeText={(text) => setOldPassword(text)}
          label="Mot de passe actuel"
          value={oldPassword}
        />
        <VerticalSpacer height={12} />
        <CustomTextInput
          placeholder="Nouveau mot de passe"
          autoComplete="password"
          onChangeText={(text) => setNewPassword(text)}
          label="Nouveau mot de passe"
          hasError={errorMessage !== ""}
          value={newPassword}
        />
        <VerticalSpacer height={12} />
        <CustomTextInput
          placeholder="Confirmer le mot de passe"
          autoComplete="password"
          onChangeText={(text) => setConfirmNewPassword(text)}
          label="Confirmer le mot de passe"
          hasError={errorMessage !== ""}
          onBlur={() => {
            newPassword !== confirmNewPassword
              ? setErrorMessage("Les mots de passe ne correspondent pas.")
              : setErrorMessage("");
          }}
          value={confirmNewPassword}
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
            oldPassword === "" ||
            newPassword === "" ||
            confirmNewPassword === "" ||
            errorMessage !== ""
          }
        />
      </View>
    </View>
  );
};

export default ModifyPasswordScreen;
