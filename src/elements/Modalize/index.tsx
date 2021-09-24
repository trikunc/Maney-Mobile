import React, { useEffect, useRef } from "react";
import { ViewStyle, Modal, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import colors from "@utils/colors";

interface Props {
  title?: string;
  modalHeight?: number;
  onOpen?: any;
  visible?: boolean;
  show?: boolean;
  data?: any;
  renderItem?: any;
  ListHeaderComponent?: any;
  ListFooterComponent?: any;
  HeaderComponent?: any;
  onOverlayPress?: any;
  keyExtractor?: any;
  onPress?: any;
  onClose?: any;
  contentContainerStyle?: ViewStyle;
  styleFlatList?: ViewStyle;
  handleStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
  disableScrollIfPossible?: boolean;
  numColumns?: number;
  adjustToContentHeight?: boolean;
}

export default ({
  modalHeight,
  adjustToContentHeight,
  visible,
  show,
  ListHeaderComponent,
  ListFooterComponent,
  HeaderComponent,
  data,
  renderItem,
  onOverlayPress,
  contentContainerStyle,
  styleFlatList,
  modalStyle,
  handleStyle,
  keyExtractor,
  onClose,
  showsVerticalScrollIndicator,
  bounces,
  disableScrollIfPossible,
  numColumns,
  ...props
}: Props) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    visible === true && ref.current.open();
  }, []);

  useEffect(() => {
    visible === false && ref.current.close();
  }, [visible]);

  return (
    <Modal statusBarTranslucent={true} transparent={true} visible={visible}>
      <Modalize
        {...props}
        ref={ref}
        flatListProps={{
          contentContainerStyle: contentContainerStyle,
          ListHeaderComponent: ListHeaderComponent,
          ListFooterComponent: ListFooterComponent,
          numColumns: numColumns,
          style: styleFlatList ? styleFlatList : styles.styleFlatList,
          data: data,
          keyExtractor: keyExtractor,
          renderItem: renderItem,
          showsVerticalScrollIndicator: showsVerticalScrollIndicator
            ? showsVerticalScrollIndicator
            : false,
          bounces: bounces,
        }}
        disableScrollIfPossible={
          disableScrollIfPossible ? disableScrollIfPossible : false
        }
        HeaderComponent={HeaderComponent}
        handleStyle={handleStyle ? handleStyle : styles.handleStyle}
        modalStyle={modalStyle ? modalStyle : styles.modalStyle}
        modalHeight={modalHeight}
        onOverlayPress={onOverlayPress}
        onClose={onClose}
        adjustToContentHeight={adjustToContentHeight}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: colors.white,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  handleStyle: {
    height: 0,
  },
  headerModal: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtTitle: {
    fontSize: 28,
    lineHeight: 42,
  },
  svgView: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  styleFlatList: {
    paddingHorizontal: 24,
  },
});
