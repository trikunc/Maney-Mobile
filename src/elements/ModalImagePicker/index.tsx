import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";

interface ModalImagePickerProps {
  takePhoto: () => void;
  choosePhoto: () => void;
  close: () => void;
}

export default memo(
  ({ takePhoto, choosePhoto, close }: ModalImagePickerProps) => {
    return (
      <View style={styles.container}>
        <Text
          bold
          size={24}
          lineHeight={28}
          marginBottom={12}
          style={styles.title}
        >
          Add Attachment
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.modalText}
          onPress={takePhoto}
        >
          <Text size={18} lineHeight={22}>
            Take Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.modalText}
          onPress={choosePhoto}
        >
          <Text size={18} lineHeight={22}>
            Choose Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.modalText}
          onPress={close}
        >
          <Text size={18} lineHeight={22} color={colors.grey3}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey1,
  },
  modalText: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.snow,
  },
});
