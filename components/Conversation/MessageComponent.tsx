import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Message } from "../../types/models/Message";
import { colors } from "../../constants/colors";
import { useAuth } from "../../hooks/useAuth";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { DecodedJwt } from "../../types/models/DecodedJwt";
import ThumbsUpIcon from "../../assets/svg/thumbs-up.svg";
import ThumbsUpFillIcon from "../../assets/svg/thumbs-up-fill.svg";
import ThumbsDownIcon from "../../assets/svg/thumbs-down.svg";
import ThumbsDownFillIcon from "../../assets/svg/thumbs-down-fill.svg";
import { sendReactionToMessage } from "../../services/message.service";

interface Props {
  message: Message;
}
export const MessageComponent = (props: Props) => {
  const { message } = props;
  const { profession: myProfession } = useAuth();

  const [myId, setMyId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getInfos = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (!accessToken) throw new Error("No accessToken found");
      const decodedJwt: DecodedJwt = jwtDecode(accessToken);
      setMyId(decodedJwt.sub);
    } catch (e) {
      console.error("ERROR in getInfos:", JSON.stringify(e));
    }
  };

  const handlePressReaction = async (reaction: boolean | null) => {
    setIsLoading(true);
    try {
      await sendReactionToMessage({
        messageId: message.id,
        reaction,
      });
      message.isLiked = reaction;
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error("ERROR in handlePressReaction:", JSON.stringify(e));
    }
  };

  const isMyMessageOrOtherAgronomist = () => {
    if (myId === message.user.id) return true;
    if (
      myProfession === "agronomist" &&
      message.user.profession === "agronomist"
    )
      return true;
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <View
      style={[
        styles.wrapper,
        isMyMessageOrOtherAgronomist() ? { justifyContent: "flex-end" } : {},
      ]}
    >
      <View
        style={[
          styles.container,
          isMyMessageOrOtherAgronomist()
            ? { backgroundColor: colors.blue[500], alignSelf: "flex-end" }
            : {},
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isMyMessageOrOtherAgronomist() ? { color: colors.white } : {},
          ]}
        >
          {message.text}
        </Text>
      </View>
      {message.isLiked &&
        message.user.profession === "agronomist" &&
        myProfession === "farmer" && (
          <View style={styles.reactionsContainer}>
            <TouchableOpacity
              onPress={() => !isLoading && handlePressReaction(null)}
            >
              <ThumbsUpFillIcon width={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => !isLoading && handlePressReaction(false)}
            >
              <ThumbsDownIcon width={20} />
            </TouchableOpacity>
          </View>
        )}
      {!message.isLiked &&
        message.isLiked !== null &&
        message.user.profession === "agronomist" &&
        myProfession === "farmer" && (
          <View style={styles.reactionsContainer}>
            <TouchableOpacity
              onPress={() => !isLoading && handlePressReaction(true)}
            >
              <ThumbsUpIcon width={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => !isLoading && handlePressReaction(null)}
            >
              <ThumbsDownFillIcon width={18} />
            </TouchableOpacity>
          </View>
        )}
      {message.isLiked === null &&
        message.user.profession === "agronomist" &&
        myProfession === "farmer" && (
          <View style={styles.reactionsContainer}>
            <TouchableOpacity
              onPress={() => !isLoading && handlePressReaction(true)}
            >
              <ThumbsUpIcon width={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => !isLoading && handlePressReaction(false)}
            >
              <ThumbsDownIcon width={20} />
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  container: {
    maxWidth: "80%",
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginBottom: 8,
    marginTop: 8,
    flex: 1,
  },
  messageText: {
    fontSize: 14,
    color: colors.grey[800],
  },
  reactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "20%",
    flex: 1,
    paddingHorizontal: 8,
  },
});
