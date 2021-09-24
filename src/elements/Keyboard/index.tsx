import colors from "@utils/colors";
import React, { useState} from 'react';
import { StyleSheet,PanResponder, View } from 'react-native';
import CalculatorButton from "@elements/Keyboard/CalculatorButton";
import {ICON_KEYBOARD} from "@svg/KeyBoard";

require("@utils/calculator/swisscalc.lib.format.js");
require("@utils/calculator/swisscalc.lib.operator.js");
require("@utils/calculator/swisscalc.lib.operatorCache.js");
require("@utils/calculator/swisscalc.lib.shuntingYard.js");
require("@utils/calculator/swisscalc.display.numericDisplay.js");
require("@utils/calculator/swisscalc.display.memoryDisplay.js");
require("@utils/calculator/swisscalc.calc.calculator.js");

interface Props{
  style?:object;
  onValue?: (value:any)=>void
}


export default ({style,onValue}:Props) => {
  const [value,setValue]= useState<number>(0);

  // Initialize calculator...
  const oc = global.swisscalc.lib.operatorCache;
  const calc = new global.swisscalc.calc.calculator();

  // Setup gestures...
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => { },
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) >= 50) {
        onBackspacePress();
      }
    },
  })

  const onDigitPress = (digit:any) => {
    calc.addDigit(digit);
    setValue(calc.getMainDisplay())
  }

  const onUnaryOperatorPress = (operator:any) => {
    calc.addUnaryOperator(operator);
    setValue(calc.getMainDisplay())
  }

  const onBinaryOperatorPress = (operator:any) => {
    calc.addBinaryOperator(operator);
    setValue(calc.getMainDisplay())
  }

  const onEqualsPress = () => {
    calc.equalsPressed();
    setValue(calc.getMainDisplay())
  }

  const onClearPress = () => {
    calc.clear();
    setValue(calc.getMainDisplay())
  }

  const onDeletePress = () => {
    calc.memoryClear();
    setValue(calc.getMainDisplay())
  }

  const onPlusMinusPress = () => {
    calc.negate();
    setValue(calc.getMainDisplay())
  }

  const onBackspacePress = () => {
    calc.backspace();
    setValue(calc.getMainDisplay())
  }

  return (
    <View style={[styles.container,style]}>
      <View>
        <View style={styles.setRowButton}>
          <CalculatorButton onPress={onClearPress} icon={ICON_KEYBOARD.clear}/>
          <CalculatorButton onPress={onPlusMinusPress} icon={ICON_KEYBOARD.plusMinus}/>
          <CalculatorButton onPress={onDeletePress} icon={ICON_KEYBOARD.delete} />
          <CalculatorButton style={styles.smallButton} onPress={() => {onBinaryOperatorPress(oc.AdditionOperator)}} icon={ICON_KEYBOARD.plus} />
        </View>
        <View style={styles.setRowButton}>
          <CalculatorButton onPress={() => {onDigitPress("7")}} icon={ICON_KEYBOARD.number7}/>
          <CalculatorButton onPress={() => {onDigitPress("8")}} icon={ICON_KEYBOARD.number8}/>
          <CalculatorButton onPress={() => {onDigitPress("9")}} icon={ICON_KEYBOARD.number9}/>
          <CalculatorButton style={styles.smallButton} onPress={() => {onBinaryOperatorPress(oc.SubtractionOperator)}} icon={ICON_KEYBOARD.minus}/>
        </View>
        <View style={styles.setRowButton}>
          <CalculatorButton onPress={() => {onDigitPress("4")}} icon={ICON_KEYBOARD.number4}/>
          <CalculatorButton onPress={() => {onDigitPress("5")}} icon={ICON_KEYBOARD.number5}/>
          <CalculatorButton onPress={() => {onDigitPress("6")}} icon={ICON_KEYBOARD.number6}/>
          <CalculatorButton style={styles.smallButton} onPress={() => {onBinaryOperatorPress(oc.MultiplicationOperator)}} icon={ICON_KEYBOARD.multiply}/>
        </View>
        <View style={styles.setRowButton}>
          <CalculatorButton onPress={() => {onDigitPress("1")}} icon={ICON_KEYBOARD.number1}/>
          <CalculatorButton onPress={() => {onDigitPress("2")}} icon={ICON_KEYBOARD.number2}/>
          <CalculatorButton onPress={() => {onDigitPress("3")}} icon={ICON_KEYBOARD.number3}/>
          <CalculatorButton style={styles.smallButton} onPress={() => {onBinaryOperatorPress(oc.DivisionOperator)}} icon={ICON_KEYBOARD.divide}/>
        </View>
        <View style={styles.setRowButton}>
          <CalculatorButton onPress={() => {onDigitPress("0")}} icon={ICON_KEYBOARD.number0} style={{flex: 2}}/>
          <CalculatorButton onPress={() => {onDigitPress(".")}} icon={ICON_KEYBOARD.dot}/>
          <CalculatorButton style={styles.checkButton} onPress={onEqualsPress} icon={ICON_KEYBOARD.checkMark}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent:'center',
    alignItems:'center',
  },
  setRowButton:{
    flexDirection: "row",
    paddingLeft:16
  },
  smallButton:{
    width:67,
  },
  checkButton:{
    width:67,
    backgroundColor:colors.purplePlum,
  }
});
