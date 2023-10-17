import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Message } from "../../types/models/Message";
import { colors } from "../../constants/colors";
import { useAuth } from "../../hooks/useAuth";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { DecodedJwt } from "../../types/models/DecodedJwt";

interface Props {
  message: Message;
}
export const MessageComponent = (props: Props) => {
  const { message } = props;
  const { refetchInfo } = useAuth();

  const [myProfession, setMyProfession] = useState("");
  const [myId, setMyId] = useState("");

  const getInfos = async () => {
    try {
      const userInfos = await refetchInfo();
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (!accessToken) throw new Error("No accessToken found");
      const decodedJwt: DecodedJwt = jwtDecode(accessToken);
      setMyId(decodedJwt.sub);
      setMyProfession(userInfos.profession);
    } catch (e) {
      console.log("ERROR in getInfos:", JSON.stringify(e));
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
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginBottom: 16,
  },
  messageText: {
    fontSize: 14,
    color: colors.grey[800],
  },
});
