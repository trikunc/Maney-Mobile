import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Text from "./Text";

import { CategoryFragment } from "@constant/Types";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";

interface ListItemProps {
  item: CategoryFragment;
  onPress?(): void;
}

const Category = ({ item, onPress }: ListItemProps) => {
  const { icon, name } = item;

  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          borderBottomColor: theme["line-background-color"],
        },
      ]}
    >
      {icon && (
        <Image
          style={styles.imageIcon}
          source={IMAGE_ICON_CATEGORY[`${icon}`]}
        />
      )}
      <Text marginLeft={12} marginTop={4}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginLeft: 36,
    borderBottomWidth: 1,
    height: 54,
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
});
