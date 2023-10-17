import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import commonstyles from "../CommonStyles.styles";
import styles from "./ConversationScreen.styles";
import { TitleBar } from "../../components/Common/TitleBar";
import { useRoute } from "@react-navigation/native";
import { HomeStackRouteProp } from "../../types/navigation/HomeStack";
import {
  getConversationById,
  sendMessage,
} from "../../services/message.service";
import { Conversation } from "../../types/models/Conversation";
import { TagEnum } from "../../types/models/Tags";
import { textEllipsis } from "../../utils/format.utils";
import { MessageComponent } from "../../components/Conversation/MessageComponent";
import { Message } from "../../types/models/Message";
import { CustomTextInput } from "../../components/Common/TextInput";
import SendIcon from "../../assets/svg/send.svg";
import { getMostRecentMessage } from "../../utils/conversation.utils";
import { blogLinks } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";

const ConversationScreen: React.FunctionComponent = () => {
  const route = useRoute<HomeStackRouteProp<"ConversationScreen">>();
  const { conversationId } = route.params;
  const { profession } = useAuth();

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getConversation = async () => {
    try {
      const res = await getConversationById(conversationId);
      setConversation(res);
    } catch (e) {
      console.error("ERROR while getting conversation:", JSON.stringify(e));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      Keyboard.dismiss();
      const res = await sendMessage({ conversationId, message });
      setIsLoading(false);
      getConversation();
      setMessage("");
    } catch (e) {
      setIsLoading(false);
      console.error("ERROR while sending message:", JSON.stringify(e));
    }
  };

  const renderItem = ({ item, index }: { item: Message; index: number }) => (
    <View style={styles.messageContainer}>
      <MessageComponent key={item.id} message={item} />
    </View>
  );

  useEffect(() => {
    getConversation();
  }, []);

  if (!conversation) return null;

  const mostRecentMessage = getMostRecentMessage(conversation);

  const renderHeader = () =>
    !mostRecentMessage?.hasAnswer && profession === "farmer" ? (
      <>
        <Text style={styles.whileWaitingText}>
          En attendant une réponse, découvrez cet article de Blog 👇
        </Text>
        <TouchableOpacity
          style={styles.blogCard}
          onPress={() =>
            Linking.openURL(
              blogLinks[conversation.tags[0].name as keyof typeof blogLinks]
                .link
            )
          }
          activeOpacity={0.6}
        >
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: blogLinks[
                  conversation.tags[0].name as keyof typeof blogLinks
                ].imgUrl,
              }}
              width={400}
              height={200}
              resizeMode="cover"
            />
          </View>
          <View style={styles.blogCardTextContainer}>
            <View style={styles.blogCardTextHeader}>
              <View
                style={[
                  styles.tag,
                  { backgroundColor: conversation.tags[0].color },
                ]}
              >
                <Text style={styles.tagText}>
                  {TagEnum[conversation.tags[0].name as keyof typeof TagEnum]}
                </Text>
              </View>
              <Text>
                {
                  blogLinks[conversation.tags[0].name as keyof typeof blogLinks]
                    .date
                }
              </Text>
            </View>
            <Text style={styles.blogCardTitle}>
              {
                blogLinks[conversation.tags[0].name as keyof typeof blogLinks]
                  .title
              }
            </Text>
          </View>
        </TouchableOpacity>
      </>
    ) : null;

  return (
    <View style={commonstyles.mainContainer}>
      <TitleBar title={textEllipsis(conversation.title, 35)} />
      <View style={styles.tagsContainer}>
        {conversation.tags.map((tag) => (
          <View
            key={tag.id}
            style={[styles.tag, { backgroundColor: tag.color }]}
          >
            <Text style={styles.tagText}>
              {TagEnum[tag.name as keyof typeof TagEnum]}
            </Text>
          </View>
        ))}
      </View>
      <KeyboardAvoidingView style={styles.flatList} behavior="padding">
        <View style={{ flex: 0.88 }}>
          <FlatList
            keyboardDismissMode="none"
            data={conversation.messages}
            renderItem={({ item, index }) => renderItem({ item, index })}
            style={styles.flatList}
            contentContainerStyle={{
              paddingBottom: 40,
            }}
            onRefresh={() => getConversation()}
            refreshing={isLoading}
            inverted
            ListHeaderComponent={() => renderHeader()}
          />
        </View>
        <View style={styles.textInputContainer}>
          <CustomTextInput
            placeholder="Votre réponse..."
            autoComplete="off"
            onChangeText={(text) => setMessage(text)}
            style={{ flex: 1 }}
            value={message}
          />
          <TouchableOpacity
            style={styles.sendIconContainer}
            onPress={() => (!isLoading ? handleSubmit() : null)}
          >
            <SendIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ConversationScreen;
