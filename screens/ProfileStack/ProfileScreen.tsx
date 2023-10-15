import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import commonstyles from "../CommonStyles.styles";
import styles from "./ProfileScreen.styles";
import * as SecureStore from "expo-secure-store";
import { DecodedJwt } from "../../types/models/DecodedJwt";
import jwt_decode from "jwt-decode";
import { useAuth } from "../../hooks/useAuth";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import UserIcon from "../../assets/svg/user.svg";
import ArrowRight from "../../assets/svg/arrow-right.svg";
import ExternalLinkIcon from "../../assets/svg/external-link.svg";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import { Button } from "../../components/Common/Button";
import { ProfileStackProps } from "../../types/navigation/ProfileStack";
import { AuthStackProps } from "../../types/navigation/AuthStack";
import { colors } from "../../constants/colors";
import { SuccessModal } from "../../components/Common/SuccessModal";
import { Asset } from "expo-asset";
import { CGU } from "../../components/Common/CGU";
import { BottomPanel } from "../../components/Common/BottomPanel";
import { TitleBar } from "../../components/Common/TitleBar";

interface ExtendedRoute extends RouteProp<ParamListBase, string> {
  params: { isPasswordModified?: boolean; isEmailModified?: boolean };
}
const ProfileScreen: React.FunctionComponent = () => {
  const { logout } = useAuth();
  const route: ExtendedRoute = useRoute();
  const navigationUnavailablityScreen =
    useNavigation<ProfileStackProps<"UnavailabilityScreen">>();
  const navigationModifyEmailScreen =
    useNavigation<ProfileStackProps<"ModifyEmailScreen">>();
  const navigationModifyPasswordScreen =
    useNavigation<ProfileStackProps<"ModifyPasswordScreen">>();
  const navigationAuthScreen = useNavigation<AuthStackProps<"AuthStack">>();
  const navigationContractsSignedScreen =
    useNavigation<ProfileStackProps<"SignedContractsScreen">>();

  const [userInfos, setUserInfos] = useState<DecodedJwt | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [profilePicture, setProfilePicture] = useState<any>({
    uri: "",
    hash: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCguOpen, setIsCguOpen] = useState(false);

  const getUserInfos = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      const decodedJwt: DecodedJwt = jwt_decode(accessToken);
      setUserInfos(decodedJwt);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigationAuthScreen.navigate("AuthStack", { screen: "AuthScreen" });
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  useEffect(() => {
    if (route?.params?.isPasswordModified) {
      setIsModalVisible(true);
    }
    if (route?.params?.isEmailModified) {
      setIsModalVisible(true);
    }
  }, [route?.params?.isPasswordModified, route?.params?.isEmailModified]);

  return (
    <View style={commonstyles.mainContainer}>
      <TitleBar hideBackButton title="Mon compte" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.mainContainer}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          <VerticalSpacer height={24} />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigationModifyEmailScreen.navigate("ModifyEmailScreen")
            }
          >
            <Text style={styles.linkText}>Modifier mon adresse email</Text>
            <ArrowRight />
          </TouchableOpacity>
          <VerticalSpacer height={8} />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigationModifyPasswordScreen.navigate("ModifyPasswordScreen")
            }
          >
            <Text style={styles.linkText}>Modifier mon mot de passe</Text>
            <ArrowRight />
          </TouchableOpacity>
          <VerticalSpacer height={20} />
          <Text style={styles.legalTitle}>Légal</Text>
          <VerticalSpacer height={8} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsCguOpen(true)}
          >
            <Text style={styles.linkText}>Conditions générales</Text>
            <ExternalLinkIcon />
          </TouchableOpacity>
          <VerticalSpacer height={50} />
          <Button
            title="Se déconnecter"
            type="secondary"
            handlePress={handleLogout}
          />
        </View>
        {isCguOpen && (
          <BottomPanel
            hasBackButton
            title={"Conditions générales d'utilisation"}
            setIsModalVisible={setIsCguOpen}
            isModalVisible={isCguOpen}
            isFullHeight={true}
          >
            <ScrollView>
              <CGU />
              <VerticalSpacer height={18} />
            </ScrollView>
          </BottomPanel>
        )}
      </ScrollView>
      {isModalVisible && (
        <SuccessModal
          text={"La modification a bien été prise en compte"}
          onPress={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
};

export default ProfileScreen;
