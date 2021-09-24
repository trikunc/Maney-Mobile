import React, { memo, useCallback, useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Modal,
  Alert,
  Image,
} from "react-native";
import colors from "@utils/colors";
// @ts-ignore
import isEmpty from "lodash.isempty";
import AnimatedInput from "@components/AnimatedInput";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "@utils/routes";
import { format } from "@utils/formatNumber";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import Animated2Tab from "@elements/Animated2Tab";
import Text from "@elements/Text";
import { IMAGE_ICON } from "@assets/Icon";
import { ICON } from "@svg/Icon";
import { heightScreen, widthScreen } from "@utils/dimensions";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import DatePickerModalize from "@elements/DatePickerModalize";
import HeaderButton from "@elements/Header/HeaderButton";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { apiCreateTransaction } from "@api/index";
import CalculatorItem from "@components/CalculatorItem";
import ButtonBottomAnimated from "@elements/Button/ButtonBottom";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import * as dashboardActions from "@actions/dashboardActions";
import { IDataState } from "@store/models/reducers/data";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";
import { IMasterState } from "../../store/models/reducers/master";
import moment from "moment";
import {
  getPreviousCategory,
  getPreviousWallet,
  saveCategory,
  saveWallet,
} from "@utils/store/Store";
import useImagePicker from "@hooks/useImagePicker";
interface IState {
  dataReducer: IDataState;
  masterReducer: IMasterState;
}

const CreateTransaction = memo(({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState<string>("USD");
  const [balance, setBalance] = useState<number>(1);
  const [tmpBalance, setTmpBalance] = useState<string>("");
  const [category, setCategory] = useState<any>({});
  const [wallet, setWallet] = useState<any>({});
  const [date, setDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [note, setNote] = useState<string>("");
  const [image, setImage] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);
  const [walletFrom, setWalletFrom] = useState<any>({});
  const [walletTo, setWalletTo] = useState<any>({});

  const [tabActive, setTabActive] = useState<number>(0);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [visible, setVisible] = useState(true);
  const [goback, setGoback] = useState<string>(ROUTES.Dashboard);

  // const {
  //   open: imageOpen,
  //   visible: imageVisible,
  //   close: imageClose,
  //   transY: imageTransy,
  // } = useModalAnimation();

  const [takePhoto, choosePhoto] = useImagePicker(setImage);

  // TODO: List wallet to transfer
  // const wallets = useSelector((state: IState) => state.dataReducer.wallets);

  const user = useSelector((state: IState) => state.masterReducer.user);

  React.useEffect(() => {
    if (route.params?.route) {
      setGoback(route.params?.route);
    }
    // Update wallet
    updateCategory();
    // Update wallet
    updateWallet();
    // Set wallet from (transfer)
    if (route.params?.walletFrom) {
      setWalletFrom(route.params?.walletFrom);
    }
    // Set wallet to (transfer)
    if (route.params?.walletTo) {
      setWalletTo(route.params?.walletTo);
    }
    // Set note
    if (route.params?.note) {
      setNote(route.params?.note);
    }
    user && user.currency && setCurrency(user.currency.currency);
  }, [
    route.params?.category,
    route.params?.note,
    route.params?.wallet,
    route.params?.walletFrom,
    route.params?.walletTo,
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButton onPress={onGoBack} />,
    });
  }, []);

  /**
   * Update category
   */
  const updateWallet = async () => {
    if (route.params && route.params.wallet) {
      setWallet(route.params.wallet);
      return;
    }
    if (!isEmpty(wallet)) {
      return;
    }
    const previousWallet = await getPreviousWallet();
    if (previousWallet) {
      setWallet(previousWallet);
    }
  };

  /**
   * Update category
   */
  const updateCategory = async () => {
    if (route.params?.category) {
      setCategory(route.params?.category);
      return;
    }
    if (!isEmpty(category)) {
      return;
    }
    const previousCategory = await getPreviousCategory();
    if (previousCategory) {
      setCategory(previousCategory);
    }
  };

  /**
   * Navigate to previous screen
   */
  const onGoBack = () => {
    navigation.goBack();
  };

  /**
   * Navigate to select category screen
   */
  const onAddTransactionCategory = useCallback(() => {
    const params = {
      route: ROUTES.CreateTransaction,
      category: category,
      tabActive: tabActive,
    };
    navigation.navigate(ROUTES.AddTransactionCategory, params);
  }, [category, tabActive]);

  /**
   * Navigate to select wallet screen
   */
  const onAddTransactionWallet = useCallback(() => {
    navigation.navigate(ROUTES.AddTransactionWallets);
  }, []);

  /**
   * Navigate to select wallet screen
   */
  const onAddTransactionWalletFrom = useCallback(() => {
    const params = { type: 1 };
    navigation.navigate(ROUTES.AddTransactionWallets, params);
  }, []);

  /**
   * Navigate to select wallet screen
   */
  const onAddTransactionWalletTo = useCallback(() => {
    const params = { type: 2 };
    navigation.navigate(ROUTES.AddTransactionWallets, params);
  }, []);

  /**
   * Navigate to note screen
   */
  const onAddTransactionNote = useCallback(() => {
    const noteContent = { note: note };
    navigation.navigate(ROUTES.AddTransactionNote, noteContent);
  }, [note]);

  /**
   * Select date
   */
  const onSelectDate = () => {
    setShowDateModal(true);
  };

  const onChoseDate = (item: any) => {
    if (item.dateString) {
      setDate(item.dateString);
    } else {
      setDate(item);
    }
  };

  const onCreate = async () => {
    try {
      setIsLoading(true);
      switch (tabActive) {
        case 0:
          await apiCreateTransaction({
            balanceMinus: wallet.balance - balance,
            balance: balance,
            categoryId: category.id,
            walletId: wallet.id,
            date: date,
            note: note,
            type: "expense",
          });
          dispatch(dashboardActions.onDashboardRequest());
          setIsLoading(false);
          navigation.navigate(goback);
          break;
        case 1:
          await apiCreateTransaction({
            balanceAdd: wallet.balance + balance,
            balance: balance,
            categoryId: category.id,
            walletId: wallet.id,
            date: date,
            note: note,
            type: "income",
          });
          dispatch(dashboardActions.onDashboardRequest());
          setIsLoading(false);
          navigation.navigate(goback);
          break;
        case 2:
          if (walletFrom.id == walletTo.id) {
            setIsLoading(false);
            setTimeout(() => {
              Alert.alert("Wallet overlap");
            }, 200);
          } else {
            await apiCreateTransaction({
              //balance: balance,
              walletFromId: walletFrom.id,
              walletToId: walletTo.id,
              balance: balance,
              balanceAdd: walletTo.balance + balance,
              balanceMinus: walletFrom.balance - balance,
              categoryId: 52,
              date: date,
              note: note,
              type: "transfer",
            });
            dispatch(dashboardActions.onDashboardRequest());
            setIsLoading(false);
            navigation.navigate(goback);
          }
          break;
        default:
          await apiCreateTransaction({
            balanceMinus: wallet.balance - balance,
            balance: balance,
            categoryId: category.id,
            walletId: wallet.id,
            date: date,
            note: note,
            type: "expense",
          });
          dispatch(dashboardActions.onDashboardRequest());
          setIsLoading(false);
          navigation.navigate(goback);
          break;
      }
      // Store category and wallet for transaction later
      saveCategory(category);
      saveWallet(wallet);
    } catch (e) {
      console.log("DEBUG ERROR: Create transaction:", e);
      // Handle error
      setIsLoading(false);
    }
  };

  const onOpenKeyboard = () => {
    setVisible(true);
  };

  const onCloseKeyboard = () => {
    setVisible(false);
  };

  const onTextChange = (text: string) => {
    setTmpBalance(text);
  };

  const onHandleCalculation = (value: number) => {
    setBalance(value);
  };

  const disableButtonCreate = () => {
    if (!category || !category.id) {
      return true;
    }
    // (!walletTo.name || !walletFrom.name)
    if (!wallet.name) {
      return true;
    }
    if (isEmpty(date)) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle={"dark-content"}
      />
      <View style={styles.tabView}>
        {/* 
        * hind transfer
        {
          wallets.length > 1 ?
            <AnimatedTab
              onPressTab1={() => setTabActive(0)}
              onPressTab2={() => setTabActive(1)}
              onPressTab3={() => setTabActive(2)}
              titleTab1={"Expenses"}
              titleTab2={"Income"}
              titleTab3={"Transfer"}
            />
            :
            <Animated2Tab
              onPressTab1={() => setTabActive(0)}
              onPressTab2={() => setTabActive(1)}
              titleTab1={"Expenses"}
              titleTab2={"Income"}
            />
        } */}
        <Animated2Tab
          onPressTab1={() => {
            setTabActive(0);
            setCategory({});
          }}
          onPressTab2={() => {
            setTabActive(1);
            setCategory({});
          }}
          titleTab1={"Expenses"}
          titleTab2={"Income"}
        />
      </View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={onOpenKeyboard}>
          <View style={styles.inputView}>
            {tabActive === 0 ? (
              <Text size={34} lineHeight={41} bold color={colors.red}>
                -{visible ? tmpBalance : format(balance)}
              </Text>
            ) : tabActive === 1 ? (
              <Text size={34} lineHeight={41} bold color={colors.bleuDeFrance}>
                +{visible ? tmpBalance : format(balance)}
              </Text>
            ) : (
              <Text size={34} lineHeight={41} bold color={colors.emerald}>
                {visible ? tmpBalance : format(balance)}
              </Text>
            )}
            {currency !== null && (
              <View style={styles.currencyView}>
                <Text size={14} color={colors.grey1}>
                  {currency}
                </Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        {tabActive == 2 ? (
          <View style={styles.contentView}>
            <AnimatedInput
              onPress={onAddTransactionWalletFrom}
              imageIcon={
                walletFrom && walletFrom.icon
                  ? IMAGE_ICON[`${walletFrom.icon}`]
                  : IMAGE_ICON.wallet
              }
              value={walletFrom && walletFrom.name ? walletFrom.name : ""}
              placeholder={"From wallet"}
            />
            <AnimatedInput
              onPress={onAddTransactionWalletTo}
              imageIcon={
                walletTo && walletTo.icon
                  ? IMAGE_ICON[`${walletTo.icon}`]
                  : IMAGE_ICON.wallet
              }
              value={walletTo && walletTo.name ? walletTo.name : ""}
              placeholder={"To wallet"}
              nonBorder={true}
            />
            <AnimatedInput
              onPress={onSelectDate}
              icon={ICON.calendar}
              value={date}
              placeholder={"Date"}
            />
            <AnimatedInput
              onPress={onAddTransactionNote}
              icon={ICON.note}
              value={note}
              placeholder={"Note"}
            />
          </View>
        ) : (
          <>
            <View style={styles.contentView}>
              <AnimatedInput
                onPress={onAddTransactionCategory}
                imageIcon={
                  category.icon
                    ? IMAGE_ICON_CATEGORY[`${category.icon}`]
                    : IMAGE_ICON_CATEGORY.ic008
                }
                value={category.name ? category.name : ""}
                placeholder={"Category"}
              />
              <AnimatedInput
                onPress={onAddTransactionWallet}
                imageIcon={
                  wallet && wallet.icon
                    ? IMAGE_ICON[`${wallet.icon}`]
                    : IMAGE_ICON.wallet
                }
                value={wallet && wallet.name ? wallet.name : ""}
                placeholder={"Wallet"}
                nonBorder={true}
              />
              <AnimatedInput
                onPress={onSelectDate}
                icon={ICON.calendar}
                value={date}
                placeholder={"Date"}
              />
              <AnimatedInput
                onPress={onAddTransactionNote}
                icon={ICON.note}
                value={note}
                placeholder={"Note"}
              />
            </View>
            <View style={styles.contentView}>
              <AnimatedInput
                icon={ICON.calendar}
                value={"Attach Photo"}
                color={colors.bleuDeFrance}
                // onPress={imageOpen}
              />
              {image && (
                <View style={[styles.imageView, { padding: 16 }]}>
                  <Image
                    resizeMode="contain"
                    source={image}
                    style={styles.image}
                  />
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
      <ButtonBottomAnimated
        visible={visible}
        disabled={disableButtonCreate()}
        title={"Create"}
        onPress={onCreate}
      />
      <Modal visible={isLoading} statusBarTranslucent transparent>
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color={colors.redCrayola} />
        </View>
      </Modal>
      {/* <Modal visible={imageVisible} transparent onRequestClose={imageClose}>
        <ModalSlideBottom onClose={imageClose} transY={imageTransy}>
          <ModalImagePicker
            takePhoto={takePhoto}
            choosePhoto={choosePhoto}
            close={imageClose}
          />
        </ModalSlideBottom>
      </Modal> */}
      <DatePickerModalize
        visible={showDateModal}
        onSelect={onChoseDate}
        onApply={() => setShowDateModal(false)}
        maxDate={new Date()}
      />
      <CalculatorItem
        onClose={onCloseKeyboard}
        onRequestClose={onCloseKeyboard}
        onTextChange={onTextChange}
        onCalc={onHandleCalculation}
        onAccept={onCloseKeyboard}
        visible={visible}
      />
    </View>
  );
});

export default CreateTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  contentView: {
    marginHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingRight: 21,
    paddingLeft: 18,
    marginBottom: 18,
  },
  tabView: {
    backgroundColor: colors.white,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  inputView: {
    paddingVertical: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 70,
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
  loadingScreen: {
    flex: 1,
    backgroundColor: "rgba(51, 51, 51, 0.7)",
    height: heightScreen,
    width: widthScreen,
    justifyContent: "center",
    alignItems: "center",
  },
  imageView: {
    maxHeight: 266,
  },
  image: {
    width: "100%",
    maxWidth: 700,
    maxHeight: 234,
    borderRadius: 32,
  },
});
