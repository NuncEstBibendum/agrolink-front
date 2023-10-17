import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import commonstyles from "../CommonStyles.styles";
import styles from "./AskQuestionScreen.styles";
import { TitleBar } from "../../components/Common/TitleBar";
import { CustomTextInput } from "../../components/Common/TextInput";
import { VerticalSpacer } from "../../components/Common/VerticalSpacer";
import { TagEnum } from "../../types/models/Tags";
import { Button } from "../../components/Common/Button";
import { sendFirstMessage } from "../../services/message.service";
import { useNavigation } from "@react-navigation/native";
import { HomeStackProps } from "../../types/navigation/HomeStack";

const AskQuestionScreen: React.FunctionComponent = () => {
  const tagEnumValues = Object.keys(TagEnum).map((key) => ({
    label: TagEnum[key as keyof typeof TagEnum],
    value: key,
  }));
  const navigationHome = useNavigation<HomeStackProps<"HomeScreen">>();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const isButtonDisabled = () => {
    return (
      title.length === 0 ||
      message.length === 0 ||
      tags.length === 0 ||
      isLoading
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await sendFirstMessage({
        title,
        message,
        tags,
      });
      setIsLoading(false);
      navigationHome.navigate("HomeScreen");
    } catch (e) {
      setIsLoading(false);
      console.error("ERROR while sending a new question:", JSON.stringify(e));
    }
  };

  return (
    <View style={commonstyles.mainContainer}>
      <TitleBar title={"Poser une question"} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <CustomTextInput
              autoComplete="off"
              placeholder="Titre de votre question"
              label="Titre"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <VerticalSpacer height={20} />
            <CustomTextInput
              autoComplete="off"
              placeholder="Votre question"
              label="Votre question"
              onChangeText={(text) => setMessage(text)}
              numberOfLines={8}
              value={message}
            />
            <VerticalSpacer height={20} />
            <Text>Sélectionnez une ou plusieurs catégories</Text>
            <View style={styles.tagsContainer}>
              {tagEnumValues.map((tag) => (
                <TouchableOpacity
                  key={tag.value}
                  style={[
                    styles.tag,
                    tags.includes(tag.value) && styles.tagSelected,
                  ]}
                  onPress={() => toggleTag(tag.value)}
                >
                  <Text style={tags.includes(tag.value) && styles.tagSelected}>
                    {tag.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <VerticalSpacer height={20} />
            <Button
              title="Envoyer ma question"
              type="primary"
              handlePress={() => handleSubmit()}
              disabled={isButtonDisabled()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AskQuestionScreen;
