import colors from "@utils/colors";
import * as React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Text from "@elements/Text";

export interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  icon?: any;
  color?: any;
  onPress?: (event: GestureResponderEvent) => void;
}

export class Button extends React.Component<ButtonProps> {
  constructor(props: any) {
    super(props);
    this.state = { focus: false };
  }
  render() {
    const { style, icon, onPress, color } = this.props;

    const backgroundColor = this.state.focus
      ? { backgroundColor: colors.honeyDrew }
      : { backgroundColor: colors.snow };

    return (
      <TouchableOpacity
        style={[styles.container, backgroundColor, style]}
        onPress={onPress}
        activeOpacity={0.7}
        onPressIn={() => this.setState({ focus: true })}
        onPressOut={() => this.setState({ focus: false })}
      >
        <Text bold color={color ? color : colors.grey1} size={22}>
          {icon}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 48,
    backgroundColor: colors.snow,
    borderRadius: 16,
  },
});
