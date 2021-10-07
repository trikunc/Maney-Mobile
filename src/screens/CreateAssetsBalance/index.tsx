import React, { memo, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import colors from "@utils/colors";
import FONTS from "@utils/fonts";
import { widthScreen } from "@utils/dimensions";
import ROUTES from "@utils/routes";
import { useNavigation } from "@react-navigation/native";
import { format } from "@utils/formatNumber";
import HeaderButton from "@elements/Header/HeaderButton";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CalculatorItem from "@components/CalculatorItem";

const CreateAssetsBalance = memo(({ route }: any) => {
  const navigation = useNavigation();

  const [walletBalance, setWalletBalance] = useState<any>(0);
  const [walletTmpBalance, setWalletTmpBalance] = useState<any>("");
  const [isEnter, setIsEnter] = useState<any>(false);

  const [currency, setCurrency] = useState<any>("USD");
  const [goBack, setGoBack] = useState<string>("");

  React.useEffect(() => {
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateAssets);
    }
    setWalletBalance(route.params?.balance || 0);
    setCurrency(route.params?.currency || "USD");
  }, [route.params?.route, route.params?.balance]);

  const [visible, setVisible] = useState(true);

  React.useLayoutEffect(() => {
    const textDoneStyle = { color: colors.purplePlum };

    const onDone = () => {
      console.log('balance:', walletBalance)
      const balance = { balance: walletBalance };
      navigation.navigate(goBack, balance);
    };

    navigation.setOptions({
      headerRight: () => (
        isEnter && <HeaderButton
          onPress={onDone}
          titleStyle={textDoneStyle}
          title={"Done"}
        />
      ),
    });
  }, [walletBalance, goBack]);

  const onOpenKeyboard = () => {
    setVisible(true);
  };

  const onCloseKeyboard = () => {
    setVisible(false);
  };

  const onTextChange = (text: string) => {
    setWalletTmpBalance(text);
  };

  const onHandleCalculation = (value: number) => {
    setWalletBalance(value);
  };

  const onAcceptKeyboard = useCallback(() => {
    setVisible(false);
    setIsEnter(true);
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle={"dark-content"}
      />
      <TouchableWithoutFeedback
        onPress={onOpenKeyboard}
        style={styles.inputBox}
      >
        <Text style={styles.textBalance}>
          {visible ? walletTmpBalance : format(walletBalance)}
        </Text>
        {currency !== null && (
          <View style={styles.currencyView}>
            <Text style={styles.textCurrency}>{currency}</Text>
          </View>
        )}
      </TouchableWithoutFeedback>
      <CalculatorItem
        onClose={onCloseKeyboard}
        onRequestClose={onCloseKeyboard}
        onTextChange={onTextChange}
        onCalc={onHandleCalculation}
        onAccept={onAcceptKeyboard}
        visible={visible}
      />
    </View>
  );
});

export default CreateAssetsBalance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.whisper,
    justifyContent: "center",
    alignItems: "center",
    height: 73,
    marginTop: 20,
  },
  currencyView: {
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.grey5,
    marginRight: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    position: "absolute",
    top: 12,
    left: 16,
  },
  textCurrency: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontSize: 14,
    color: colors.grey1,
  },
  textBalance: {
    fontFamily: FONTS.MUKTA.Bold,
    fontWeight: "700",
    fontSize: 34,
    color: colors.bleuDeFrance,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "red",
    width: 0,
    height: 0,
    position: "absolute",
  },
  buttonView: {
    shadowColor: "rgba(0, 0, 0, 0.7)",
    shadowOffset: { width: -1, height: -1 },
    shadowRadius: 4,
    shadowOpacity: 0.05,
    borderTopWidth: 1,
    borderTopColor: colors.snow,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonDone: {
    width: "100%",
  },
  viewButton: {
    position: "absolute",
    bottom: 0,
    width: widthScreen,
  },
});
