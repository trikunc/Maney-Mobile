import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Modal, TouchableOpacity } from "react-native";
import colors from "@utils/colors";
import { Calculator } from "@components/Calculator";
import { widthScreen } from "@utils/dimensions";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";
import { heightScreen } from "@utils/dimensions";

interface Props {
  style?: object;
  value?: number;
  visible?: boolean;
  onTextChange?: (text: string) => void;
  onCalc?: (number: number) => void;
  onAccept?: () => void;
  onClose?: () => void;
  onRequestClose?: () => void;
}

export default ({
  style,
  value,
  visible,
  onTextChange,
  onCalc,
  onClose,
  onAccept,
  onRequestClose,
  ...props
}: Props) => {
  const [show, setShow] = useState(false);
  const showAnimation = useSharedValue(0);

  const styleAnimated = useAnimatedStyle(() => {
    let translateY = interpolate(
      showAnimation.value,
      [0, 1],
      [0, heightScreen],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateY: translateY,
        },
      ],
    };
  });

  useEffect(() => {
    if (visible === true) {
      setShow((prev) => true);
      showAnimation.value = withTiming(0, { duration: 300 });
    }
    if (visible === false) {
      showAnimation.value = withTiming(1, { duration: 300 });
      setTimeout(() => {
        setShow((prev) => false);
      }, 500);
    }
  }, [visible, setShow]);

  return (
    <Modal
      visible={show}
      onRequestClose={onRequestClose}
      transparent
      animationType={"none"}
    >
      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPress={onClose}
        activeOpacity={1}
      />
      <Animated.View style={[styles.keyBoardView, styleAnimated]}>
        <Calculator
          style={styles.keyBoard}
          hasAcceptButton
          value={value}
          hideDisplay={true}
          displayColor={colors.emerald}
          borderColor={colors.white}
          onTextChange={onTextChange}
          onCalc={onCalc}
          onAccept={onAccept}
        />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  keyBoardView: {
    position: "absolute",
    bottom: 0,
    width: widthScreen,
    borderTopColor: colors.parisWhite,
  },
  keyBoard: {
    paddingTop: 16,
    paddingBottom: getBottomSpace() + 12,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 1, height: 5 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    elevation: 5,
  },
});
