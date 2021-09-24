import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import LoadingView from "@elements/LoadingView";
import keyExtractor from "@utils/keyExtractor";
import CurrencyItem from "./components/CurrencyItem";
import SearchBar from "@elements/SearchBar";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "@utils/routes";
import { useSelector, useDispatch } from "react-redux";
import { IMasterState } from "../../store/models/reducers/master";
import { CURRENCY } from "@store/models";
import changeAlias from "@utils/stringAlias";
import { onUpdateCurrencyRequest } from "../../store/actions/currencyAction";

interface IState {
  masterReducer: IMasterState;
}

const Currency = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  //const [currencies, setCurrencies] = useState<any>([]);
  const [currency, setCurrency] = useState<any>({});

  const [search, setSearch] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<Array<CURRENCY>>([]);

  const currencies = useSelector(
    (state: IState) => state.masterReducer.currencies
  );

  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, [])
  );

  const initialized = async () => {
    try {
      //setCurrencies(CURRENCIES);
      setDataSearch(currencies);
      setLoading(false);
    } catch (e) {}
  };

  const onPressSearch = useCallback((text) => {
    let data = dataSearch;
    if (text === "" || text === null || text === undefined) {
      setDataSearch(currencies);
    } else {
      data = [];
      currencies.map((item, index) => {
        if (
          changeAlias(item.name).includes(changeAlias(text)) ||
          changeAlias(item.currency).includes(changeAlias(text)) ||
          changeAlias(item.description).includes(changeAlias(text))
        ) {
          data.push(item);
        }
      });
      setDataSearch(data);
    }
    setSearch(text);
  }, []);

  const onPressCurrencyItem = useCallback(
    (item: CURRENCY) => {
      setCurrency(item);
      //const res = { currency: currency };
      dispatch(onUpdateCurrencyRequest(item.id));
      navigation.navigate(ROUTES.ProfileBottomTab);
    },
    [currency]
  );

  const renderCurrencyItem = useCallback(({ item }) => {
    return (
      <CurrencyItem
        onPress={() => onPressCurrencyItem(item)}
        style={styles.currencyItem}
        {...item}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <>
          <View style={styles.searchView}>
            <SearchBar
              placeholderTextColor={colors.greySuit}
              placeholder={"Search currency"}
              style={styles.searchBar}
              value={search}
              onChangeText={(text: string) => onPressSearch(text)}
            />
          </View>
          <FlatList
            data={dataSearch}
            renderItem={renderCurrencyItem}
            keyExtractor={keyExtractor}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
});

export default Currency;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchView: {
    marginTop: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: colors.greySuitOpacity,
    width: "100%",
    borderRadius: 10,
  },
  currencyItem: {
    marginTop: 22,
    marginHorizontal: 16,
  },
});
