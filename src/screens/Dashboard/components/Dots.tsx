import React, { memo } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { widthScreen } from '@utils/dimensions';
import colors from '@utils/colors';

interface DotsProps {
  scrollX: Animated.Value;
  style?: ViewStyle;
}

const Dots = memo((props: DotsProps) => {
  const { scrollX } = props;
  const slide = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 3, widthScreen * 3],
    outputRange: [4, 20, 50, 66],
    extrapolate: 'clamp',
  });
  const margin1 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [6, 4, 4, 4],
    extrapolate: 'clamp',
  });
  const margin2 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [4, 6, 4, 4],
    extrapolate: 'clamp',
  });
  const margin3 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [4, 4, 6, 4],
    extrapolate: 'clamp',
  });
  const margin4 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [4, 4, 4, 6],
    extrapolate: 'clamp',
  });
  const opacity1 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [1, 0.5, 0.5, 0.5],
    extrapolate: 'clamp',
  });
  const opacity2 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [0.5, 1, 0.5, 0.5],
    extrapolate: 'clamp',
  });
  const opacity3 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [0.5, 0.5, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity4 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [0.5, 0.5, 0.5, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Animated.View
          style={[
            styles.dotStyle,
            { opacity: opacity1, marginRight: margin1, marginLeft: margin1 },
          ]}
        />
        <Animated.View
          style={[
            styles.dotStyle,
            { opacity: opacity2, marginLeft: margin2, marginRight: margin2 },
          ]}
        />
        <Animated.View
          style={[
            styles.dotStyle,
            { opacity: opacity3, marginLeft: margin3, marginRight: margin3 },
          ]}
        />
        <Animated.View
          style={[
            styles.dotStyle,
            { opacity: opacity4, marginLeft: margin4, marginRight: margin4 },
          ]}
        />
        <Animated.View style={[styles.dotCenter, { left: slide }]} />
      </View>
    </View>
  );
});

export default Dots;

const styles = StyleSheet.create({
  dotStyle: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotCenter: {
    position: 'absolute',
    width: 10,
    height: 4,
    backgroundColor: colors.white,
    marginRight: 4,
    borderRadius: 4,
    alignContent: 'center',
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 8,
  },
  flexRow: {
    flexDirection: 'row',
  },
});
