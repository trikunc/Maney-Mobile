import colors from "@utils/colors";
import { heightScreen } from "@utils/dimensions";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { sub } from "react-native-reanimated";

interface ModalSlideBottomProps {
  children: any;
  onClose: () => void;
  transparent?: boolean;
  transY: Animated.Node<number>;
}

const ModalSlideBottom = (props: ModalSlideBottomProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            props.transparent === false ? "transparent" : colors.transparent,
        },
      ]}
      onPress={props.onClose}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [
              {
                translateY: sub(0, props.transY),
              },
            ],
          },
        ]}
      >
        {props.children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ModalSlideBottom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modal: {
    position: "absolute",
    bottom: -heightScreen,
    backgroundColor: colors.white,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
