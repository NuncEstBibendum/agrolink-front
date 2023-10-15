import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { colors } from "../../constants/colors";
import { Dispatch, SetStateAction } from "react";
import BackArrow from "../../assets/svg/arrow-left.svg";

interface Props {
  children: React.ReactNode;
  hasBackButton?: boolean;
  title?: string;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
  isFullHeight?: boolean;
}
export const BottomPanel = (props: Props) => {
  const {
    children,
    hasBackButton,
    title,
    isModalVisible,
    setIsModalVisible,
    isFullHeight,
  } = props;
  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible && (
        <>
          <Modal transparent animationType="fade">
            <View style={styles.wrapper}>
              <TouchableOpacity
                style={styles.overlay}
                onPress={handleClose}
                activeOpacity={0.5}
              />
              <View
                style={[styles.container, isFullHeight ? { flex: 0.9 } : {}]}
              >
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={handleClose}
                    hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
                  >
                    {hasBackButton && <BackArrow />}
                  </TouchableOpacity>
                  {title && <Text style={styles.title}>{title}</Text>}
                </View>
                {children}
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: colors.black,
    opacity: 0.5,
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: colors.white,
    width: "100%",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    marginLeft: 18,
    fontSize: 20,
    lineHeight: 32,
  },
});
