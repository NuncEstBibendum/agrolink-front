import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
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
import { CustomPicker, Item } from "../../components/Common/CustomPicker";

const RegisterScreen: React.FunctionComponent = () => {
  const navigationHome = useNavigation<AppStackProps<"MainStack">>();
  const navigationLogin = useNavigation<AuthStackProps<"AuthScreen">>();
  const navigationForgottenPassword =
    useNavigation<AuthStackProps<"ForgottenPasswordScreen">>();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState<Item>({
    label: "Sélectionner une profession",
    value: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await register({
        email,
        password,
        name,
        profession: profession.value,
      });
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (accessToken) {
        setIsLoading(false);
        navigationHome.navigate("MainStack");
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
        <TitleBar title="S'inscrire" hideBackButton />
        <VerticalSpacer height={30} />
        <View style={styles.form}>
          <Text style={styles.subtitle}>
            Veuillez saisir votre email, votre nom, votre mot de passe et
            sélectionnez votre profession pour vous inscrire
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
            placeholder="Nom"
            autoComplete="name"
            onChangeText={(text) => setName(text)}
            label="Nom"
            value={name}
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
          <VerticalSpacer height={12} />
          <CustomPicker
            items={[
              { label: "Agriculteur", value: "farmer" },
              { label: "Agronome", value: "agronomist" },
            ]}
            label="Profession"
            onValueChange={(item) => setProfession(item)}
            value={profession}
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
            title="Déjà un compte chez nous ?"
            type="secondary"
            handlePress={() => navigationLogin.navigate("AuthScreen")}
          />
        </View>
      </View>
      <View style={commonstyles.footer}>
        <Button
          title="S'inscrire"
          type="primary"
          handlePress={() => handleSubmit()}
          isLoading={isLoading}
          disabled={isLoading || !email || !password}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
