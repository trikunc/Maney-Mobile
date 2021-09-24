import React, { memo, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { IMAGE_ICON } from "@assets/Icon";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";
import CategoryTypeItem from "@components/CategoryTypeItem";

interface Props {
  style?: object;
  id?: string;
  name?: string;
  icon?: string;
  children?: Array<any>;
  isCategoriesChose?: number;
  onChooseItem?: (item: any) => void;
  onChooseCategories?: (category: any) => void;
}

export default memo(
  ({
    style,
    name,
    icon,
    children,
    isCategoriesChose,
    onChooseCategories,
  }: Props) => {
    const [show, setShow] = useState(false);
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          onPress={() => {
            setShow(!show);
          }}
          activeOpacity={0.7}
          style={[styles.setRow, styles.content]}
        >
          <View style={styles.setRow}>
            <Image
              style={styles.imageIcon}
              source={IMAGE_ICON_CATEGORY[`${icon}`]}
            />
            <Text
              size={17}
              lineHeight={22}
              semiBold
              color={colors.grey1}
              marginLeft={12}
            >
              {name}
            </Text>
          </View>
          <Image source={IMAGE_ICON.arrowDown} />
        </TouchableOpacity>
        {show && (
          <View style={styles.box}>
            {children &&
              children.map((item: any, index: number) => {
                return (
                  <CategoryTypeItem
                    isChose={isCategoriesChose}
                    // @ts-expect-error
                    onPress={() => onChooseCategories(item)}
                    {...item}
                    key={index}
                  />
                );
              })}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.snow,
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    paddingLeft: 12,
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
});
