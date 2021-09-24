import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from "@utils/colors";

interface Props {
  style?: object;
  onPress?: () => void
  icon?: any;
}

const CalculatorButton = ({style,onPress,icon}:Props) => {

  const [focus, setFocus] = useState(false);

  const onPressIn = () => {
    setFocus(true);
  };

  const onPressOut = () => {
    setFocus(false);
  };

  const backgroundColor = focus
    ? { backgroundColor: colors.honeyDrew }
    : { backgroundColor: colors.snow };

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.container,backgroundColor,style]}>
        <View>{icon}</View>
      </TouchableOpacity>
    );
}

export default CalculatorButton

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width:90,
    height:48,
    marginRight:12,
    marginBottom:8,
    backgroundColor:colors.snow,
    borderRadius:16,
  },
});
