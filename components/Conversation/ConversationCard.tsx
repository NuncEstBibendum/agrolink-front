import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Conversation } from "../../types/models/Conversation";
import { colors } from "../../constants/colors";
import { getTimeBetweenDateAndNow } from "../../utils/date.utils";
import { getMostRecentMessage } from "../../utils/conversation.utils";
import TagIcon from "../../assets/svg/tag.svg";
import ConversationIcon from "../../assets/svg/conversation.svg";
import { VerticalSpacer } from "../Common/VerticalSpacer";
import { TagEnum } from "../../types/models/Tags";
import { useNavigation } from "@react-navigation/native";
import { HomeStackProps } from "../../types/navigation/HomeStack";

interface Props {
  conversation: Conversation;
}
export const ConversationCard = (props: Props) => {
  const { conversation } = props;
  const navigationConversation =
    useNavigation<HomeStackProps<"ConversationScreen">>();

  const mostRecentMessage = getMostRecentMessage(conversation);

  if (!mostRecentMessage) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {conversation.author && (
          <Text style={styles.headerText}>{conversation.author.name} · </Text>
        )}
        <Text style={styles.headerText}>
          {`Il y a ${getTimeBetweenDateAndNow(
            new Date(mostRecentMessage.createdAt)
          )} · `}
        </Text>
        <View style={styles.iconTextContainer}>
          <TagIcon width={15} height={15} />
          <Text style={styles.headerText}>{conversation.tags.length}</Text>
        </View>
      </View>
      <VerticalSpacer height={10} />
      <Text style={styles.title}>{conversation.title}</Text>
      <VerticalSpacer height={4} />
      <Text style={styles.message}>{mostRecentMessage.text}</Text>
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
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[
          styles.iconTextContainer,
          { justifyContent: "center", paddingTop: 16 },
        ]}
        onPress={() =>
          navigationConversation.navigate("ConversationScreen", {
            conversationId: conversation.id,
          })
        }
      >
        <ConversationIcon />
        <Text style={styles.conversationButton}>Voir la conversation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  headerText: {
    color: colors.grey[500],
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    color: colors.grey[800],
  },
  horizontalLine: {
    marginTop: 16,
    borderBottomColor: colors.grey[200],
    borderBottomWidth: 1,
  },
  conversationButton: {
    marginLeft: 8,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  tag: {
    backgroundColor: colors.grey[200],
    borderRadius: 4,
    padding: 4,
  },
  tagText: {
    color: colors.grey[800],
  },
});
