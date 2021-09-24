import React, { memo, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "@utils/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import HeaderButton from "@elements/Header/HeaderButton";
import { ICON } from "@svg/Icon";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import LoadingView from "@elements/LoadingView";
import AnalysisPage from "./components/AnalysisPage";
import { useSelector } from "react-redux";
import { IMasterState } from "@store/models/reducers/master";
import ScrollableTab from "@elements/ScrollableTab";

interface IState {
  masterReducer: IMasterState;
}

const ChartAnalysis = memo(({ route }: any) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(true);
  const [frequency, setFrequency] = useState<object>({});
  const currency = useSelector(
    (state: IState) => state.masterReducer.user
  ).currency;

  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, [])
  );

  const initialized = async () => {
    try {
      setLoading(false);
    } catch (e) {}
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        route?.params?.type && route.params.type == "income"
          ? "Income Analysis"
          : "Expense Analysis",
      headerRight: () => <HeaderButton icon={ICON.calendar} />,
    });
  }, []);

  const onChangeFrequency = (frequency: any) => {
    close();
    setFrequency(frequency);
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle={"dark-content"}
      />
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <ScrollableTab
          titles={["November 2020", "December 2020", "January 2021"]}
        >
          <AnalysisPage
            balance={12123}
            currency={currency}
            typeTransaction={"expense"}
          />
          <AnalysisPage
            balance={12123}
            currency={currency}
            typeTransaction={"income"}
          />
        </ScrollableTab>
      )}
      {/* <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"none"}
      >
        <ModalSlideBottom onClose={close} transY={transY}>
          <ModalFrequency
            onChangeFrequency={(frequency) => onChangeFrequency(frequency)}
          />
        </ModalSlideBottom>
      </Modal> */}
    </View>
  );
});

export default ChartAnalysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
});
