import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import commonstyles from "../CommonStyles.styles";
import styles from "./HomeScreen.styles";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import { useAuth } from "../../hooks/useAuth";
import { TitleBar } from "../../components/Common/TitleBar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  getAllUnansweredConversations,
  getUserConversations,
} from "../../services/message.service";
import { Button } from "../../components/Common/Button";
import { HomeStackProps } from "../../types/navigation/HomeStack";
import { Conversation } from "../../types/models/Conversation";
import { ConversationCard } from "../../components/Conversation/ConversationCard";

const HomeScreen: React.FunctionComponent = () => {
  const { validateJwt, refetchInfo } = useAuth();

  const isFocused = useIsFocused();
  const navigationNewQuestion =
    useNavigation<HomeStackProps<"AskQuestionScreen">>();

  const [profession, setProfession] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const getInfos = async () => {
    try {
      const userInfos = await refetchInfo();
      setProfession(userInfos.profession);
      if (userInfos.profession === "agronomist") {
        const res = await getAllUnansweredConversations();
        setConversations(res);
      } else if (userInfos.profession === "farmer") {
        const res = await getUserConversations();
        setConversations(res);
      }
    } catch (e) {
      console.log("ERROR in getInfos:", JSON.stringify(e));
    }
  };

  console.log("conversations", conversations);

  useEffect(() => {
    if (isFocused) {
      getInfos();
    }
  }, [isFocused]);

  return (
    <View style={commonstyles.mainContainer}>
      <TitleBar
        hideBackButton
        title={
          profession === "agronomist"
            ? "Conversations en attente de réponse"
            : "Mes conversations"
        }
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.mainContainer}>
          {conversations.length > 0 &&
            conversations.map((conversation) => (
              <ConversationCard
                key={conversation.id}
                conversation={conversation}
              />
            ))}
          {conversations.length === 0 && profession === "farmer" && (
            <View>
              <Text style={styles.noConversationText}>
                Vous n'avez encore aucune conversation active. Poser une
                question à nos agronomes en cliquant sur le bouton ci-dessous.
              </Text>
              <VerticalSpacer height={20} />
              <Button
                title="Poser une question"
                type="primary"
                handlePress={() =>
                  navigationNewQuestion.navigate("AskQuestionScreen")
                }
              />
            </View>
          )}
          {conversations.length === 0 && profession === "agronomist" && (
            <View>
              <Text style={styles.noConversationText}>
                Aucune question en attente de réponse. Revenez consulter cette
                liste plus tard.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
