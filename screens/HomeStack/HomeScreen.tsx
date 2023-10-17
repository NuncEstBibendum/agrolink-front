import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
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
import { Tabs } from "../../components/Common/Tabs";

const HomeScreen: React.FunctionComponent = () => {
  const { refetchInfo } = useAuth();

  const isFocused = useIsFocused();
  const navigationNewQuestion =
    useNavigation<HomeStackProps<"AskQuestionScreen">>();

  const [isLoading, setIsLoading] = useState(false);
  const [profession, setProfession] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeTab, setActiveTab] = useState<string>("pending");

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
      console.error("ERROR in getInfos:", JSON.stringify(e));
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: Conversation;
    index: number;
  }) => <ConversationCard key={item.id} conversation={item} />;

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
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      {!isLoading ? (
        <View style={styles.mainContainer}>
          <FlatList
            keyboardDismissMode="none"
            data={conversations}
            renderItem={({ item, index }) => renderItem({ item, index })}
            style={styles.flatList}
            onRefresh={() => getInfos()}
            refreshing={isLoading}
            contentContainerStyle={{ gap: 10 }}
            ListFooterComponent={
              <>
                {profession === "farmer" && (
                  <>
                    <VerticalSpacer height={20} />
                    <Button
                      title="Poser une question"
                      type="primary"
                      handlePress={() =>
                        navigationNewQuestion.navigate("AskQuestionScreen")
                      }
                    />
                  </>
                )}
              </>
            }
            ListEmptyComponent={
              <>
                {profession === "farmer" && (
                  <Text style={styles.noConversationText}>
                    Vous n'avez encore aucune conversation active. Poser une
                    question à nos agronomes en cliquant sur le bouton
                    ci-dessous.
                  </Text>
                )}
                {profession === "agronomist" && (
                  <Text style={styles.noConversationText}>
                    Aucune question en attente de réponse. Revenez consulter
                    cette liste plus tard.
                  </Text>
                )}
              </>
            }
          />
        </View>
      ) : (
        <View style={{ height: 450 }}>
          <ActivityIndicator style={{ flex: 1 }} color={colors.blue[500]} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
