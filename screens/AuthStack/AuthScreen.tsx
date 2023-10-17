import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Button } from "../../components/Common/Button";
import { CustomTextInput } from "../../components/Common/TextInput";
import { TitleBar } from "../../components/Common/TitleBar";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import { useAuth } from "../../hooks/useAuth";
import { AuthStackProps } from "../../types/navigation/AuthStack";
import commonstyles from "../CommonStyles.styles";
import styles from "./AuthScreen.styles";
import * as SecureStore from "expo-secure-store";
import { AppStackProps } from "../../types/navigation/AppStack";
import { ProfileStackProps } from "../../types/navigation/ProfileStack";
import { MainStackProps } from "../../types/navigation/MainStack";

const AuthScreen: React.FunctionComponent = () => {
  const navigationHome = useNavigation<AppStackProps<"MainStack">>();
  const navigationRegister = useNavigation<AuthStackProps<"RegisterScreen">>();
  const navigationForgottenPassword =
    useNavigation<AuthStackProps<"ForgottenPasswordScreen">>();
  const navigationModifyPasswordScreen =
    useNavigation<AppStackProps<"ProfileStack">>();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await login({ email: email, password: password });
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (accessToken) {
        setIsLoading(false);
        console.log("res", res);
        if (res.temporaryPassword) {
          navigationModifyPasswordScreen.navigate("ProfileStack", {
            screen: "ModifyPasswordScreen",
            params: { isTemporaryPassword: true },
          });
        } else {
          navigationHome.navigate("MainStack");
        }
      }
      if (!res.success) {
        setIsLoading(false);
        setErrorMessage("Identifiants incorrects.");
      }
    } catch (e) {
      console.log("ERROR:", JSON.stringify(e));
      setIsLoading(false);
      setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
    }
    setIsLoading(false);
  };

  return (
    <View style={commonstyles.mainContainer}>
      <VerticalSpacer height={16} />
      <View style={commonstyles.body}>
        {/* <LogoFullColor style={{ alignSelf: "center" }} /> */}
        <TitleBar title="Se connecter" hideBackButton />
        <VerticalSpacer height={30} />
        <View style={styles.form}>
          <Text style={styles.subtitle}>
            Veuillez saisir votre email et votre mot de passe pour vous
            connecter
          </Text>
          <VerticalSpacer height={28} />
          <CustomTextInput
            placeholder="Adresse email"
            autoComplete="email"
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage("");
            }}
            label="Adresse email"
            hasError={!!errorMessage}
            value={email}
          />
          <VerticalSpacer height={12} />
          <CustomTextInput
            placeholder="Mot de passe"
            autoComplete="password"
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
            }}
            label="Mot de passe"
            hasError={!!errorMessage}
            value={password}
          />
          {errorMessage && (
            <>
              <VerticalSpacer height={12} />
              <Text style={styles.error}>{errorMessage}</Text>
            </>
          )}
          <VerticalSpacer height={20} />
          <View style={styles.forgottenPassword}>
            <TouchableOpacity
              onPress={() =>
                navigationForgottenPassword.navigate("ForgottenPasswordScreen")
              }
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.link}>Mot de passe oublié</Text>
            </TouchableOpacity>
          </View>
          <VerticalSpacer height={20} />
          <Button
            title="Pas encore inscrit ?"
            type="secondary"
            handlePress={() => navigationRegister.navigate("RegisterScreen")}
          />
        </View>
      </View>
      <View style={commonstyles.footer}>
        <Button
          title="Se connecter"
          type="primary"
          handlePress={() => handleSubmit()}
          isLoading={isLoading}
          disabled={isLoading || !email || !password}
        />
      </View>
    </View>
  );
};

export default AuthScreen;
