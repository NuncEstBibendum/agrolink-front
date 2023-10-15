import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import commonstyles from "../CommonStyles.styles";
import styles from "./HomeScreen.styles";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import { useAuth } from "../../hooks/useAuth";
import { TitleBar } from "../../components/Common/TitleBar";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen: React.FunctionComponent = () => {
  const { validateJwt, refetchInfo } = useAuth();

  const isFocused = useIsFocused();

  const [profession, setProfession] = useState("");

  const getInfos = async () => {
    try {
      const userInfos = await refetchInfo();
      setProfession(userInfos.profession);
    } catch (e) {
      console.log("ERROR in getInfos:", JSON.stringify(e));
    }
  };

  useEffect(() => {
    if (isFocused) {
      getInfos();
    }
  }, [isFocused]);

  return (
    <View style={commonstyles.mainContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <TitleBar
          hideBackButton
          title={
            profession === "agronomist"
              ? "Conversations en attente de réponse"
              : "Mes conversations"
          }
        />
        <View style={styles.mainContainer}>
          <VerticalSpacer height={25} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
