import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import commonstyles from "../CommonStyles.styles";
import styles from "./HomeScreen.styles";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import { useAuth } from "../../hooks/useAuth";
import { TitleBar } from "../../components/Common/TitleBar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  getAllAnsweredConversations,
  getAllUnansweredConversations,
  getUserConversations,
} from "../../services/message.service";
import { Button } from "../../components/Common/Button";
import { HomeStackProps } from "../../types/navigation/HomeStack";
import { Conversation } from "../../types/models/Conversation";
import { ConversationCard } from "../../components/Conversation/ConversationCard";
import { colors } from "../../constants/colors";

const HomeScreen: React.FunctionComponent = () => {
  const { validateJwt, refetchInfo } = useAuth();

  const isFocused = useIsFocused();
  const navigationNewQuestion =
    useNavigation<HomeStackProps<"AskQuestionScreen">>();

  const [isLoading, setIsLoading] = useState(false);
  const [profession, setProfession] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "answered">("pending");

  const getInfos = async () => {
    setIsLoading(true);
    setConversations([]);
    try {
      const userInfos = await refetchInfo();
      setProfession(userInfos.profession);
      if (userInfos.profession === "agronomist" && activeTab === "pending") {
        const res = await getAllUnansweredConversations();
        setConversations(res);
      } else if (
        userInfos.profession === "agronomist" &&
        activeTab === "answered"
      ) {
        const res = await getAllAnsweredConversations();
        setConversations(res);
      } else if (userInfos.profession === "farmer") {
        const res = await getUserConversations();
        setConversations(res);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("ERROR in getInfos:", JSON.stringify(e));
    }
  };

  useEffect(() => {
    if (isFocused) {
      getInfos();
    }
  }, [isFocused, activeTab]);

  return (
    <View style={commonstyles.mainContainer}>
      <TitleBar
        hideBackButton
        title={
          profession === "agronomist"
            ? "Questions des utilisateurs"
            : "Mes conversations"
        }
      />
      {profession === "agronomist" && (
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabContainer,
              activeTab === "pending"
                ? { backgroundColor: colors.blue[500] }
                : {},
            ]}
            onPress={() => setActiveTab("pending")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "pending" ? { color: colors.white } : {},
              ]}
            >
              En attente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabContainer,
              activeTab === "answered"
                ? { backgroundColor: colors.blue[500] }
                : {},
            ]}
            onPress={() => setActiveTab("answered")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "answered" ? { color: colors.white } : {},
              ]}
            >
              Répondues
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {!isLoading ? (
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
        ) : (
          <View style={{ height: 450 }}>
            <ActivityIndicator style={{ flex: 1 }} color={colors.blue[500]} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
