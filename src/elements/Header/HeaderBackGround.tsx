import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '@utils/colors';

interface PropsHeader {
  style?: any;
}

const HeaderBackGround = memo((props: PropsHeader) => {
  const { style } = props;
  return <View style={[styles.container, style]} />;
});

export default HeaderBackGround;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
