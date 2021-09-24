import React, { memo, useState, useCallback } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { FREQUENCY } from "@data/index";

interface Props {
  onChangeFrequency?: (item: any) => void;
}

const ModalFrequency = memo(({ onChangeFrequency }: Props) => {
  const [frequency, setFrequency] = useState<object>({});

  const onPress = (item) => {
    setFrequency(item);
  };

  const onPressDone = () => {
    onChangeFrequency && onChangeFrequency(frequency);
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={() => onPress(item)}
        >
          <Text
            color={index === frequency.id ? colors.emerald : colors.grey4}
            size={16}
            lineHeight={22}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    },
    [frequency.id]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonDone}
        activeOpacity={0.7}
        onPress={onPressDone}
      >
        <Text bold size={17} lineHeight={22} right color={colors.purplePlum}>
          Done
        </Text>
      </TouchableOpacity>
      <FlatList
        data={FREQUENCY}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
});

export default ModalFrequency;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  item: {
    height: 50,
    marginBottom: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 12,
  },
  buttonDone: {
    width: 70,
    alignSelf: "flex-end",
    paddingTop: 16,
  },
});
