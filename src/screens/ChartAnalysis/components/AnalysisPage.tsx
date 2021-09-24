import React, { memo, useCallback, useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { heightScreen, widthScreen } from "@utils/dimensions";
//@ts-ignore
import HighchartsReactNative from "@lib/highcharts-react-native";
import colors from "@utils/colors";
import { ICON } from "@svg/Icon";
import Text from "@elements/Text";
import { currencyFormat } from "@utils/formatNumber";
import CategoryTransactionItem from "./CategoryTransactionItem";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ROUTES from "@utils/routes";
import SvgChartPie from "@svg/Icon/SvgChartPie";
import SvgChartBar from "@svg/Icon/SvgChartBar";
import keyExtractor from "@utils/keyExtractor";
import LoadingView from "@elements/LoadingView";
import { CHART_DATA } from "@data/index";
import { CURRENCY } from "@store/models";

interface Props {
  data?: any;
  currency: CURRENCY;
  typeTransaction: string;
  balance: number;
}

const FakeData = [
  {
    title: "Wages",
    icon: "food",
    amount: 2000,
  },
  {
    title: "Sales",
    icon: "shopping",
    amount: 10,
  },
  {
    title: "Housing",
    icon: "housing",
    amount: 10,
  },
  {
    title: "Wages",
    icon: "income",
    amount: 10,
  },
];

const AnalysisPage = memo(
  ({ data, currency, typeTransaction, balance }: Props) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState<boolean>(true);
    const [tabActive, setTabActive] = useState(0);
    const [chartData, setChartData] = useState<any>([]);

    const transX = useRef(new Animated.Value(0)).current;

    useFocusEffect(
      React.useCallback(() => {
        initialized();
      }, [chartData])
    );

    const initialized = async () => {
      try {
        setLoading(false);
      } catch (e) {}
    };

    useEffect(() => {
      if (tabActive === 0) {
        Animated.parallel([
          //@ts-ignore
          Animated.spring(transX, {
            toValue: 0,
            //@ts-ignore
            duration: 100,
            useNativeDriver: false,
          }).start(),
          //@ts-ignore
          Animated.spring(transX, {
            toValue: 0,
            //@ts-ignore
            duration: 100,
            useNativeDriver: false,
          }).start(),
        ]);
      } else if (tabActive === 1) {
        Animated.parallel([
          //@ts-ignore
          Animated.spring(transX, {
            toValue: 0,
            //@ts-ignore
            duration: 165 / 2,
            useNativeDriver: false,
          }).start(),
          //@ts-ignore
          Animated.spring(transX, {
            toValue: 165 / 2,
            //@ts-ignore
            duration: 100,
            useNativeDriver: false,
          }).start(),
        ]);
      }
    }, [tabActive]);

    const optionsChartPie = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Sale<br>$500",
        align: "center",
        verticalAlign: "middle",
        y: 20,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
            distance: -35,
            style: {
              fontWeight: "regular",
              color: "white",
            },
            filter: {
              property: "percentage",
              operator: ">",
              value: 4,
            },
          },
        },
      },
      series: [
        {
          name: "Share",
          innerSize: "50%",
          data: CHART_DATA,
        },
      ],
    };

    const optionsChartBar = {
      chart: {
        type: "column",
        scrollablePlotArea: {
          minWidth: widthScreen,
          scrollPositionX: 10,
        },
      },
      xAxis: {
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "",
        },
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "Expense",
          color: colors.redCrayola,
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6],
        },
      ],
    };

    const onPressChartPie = () => {
      setTabActive(0);
    };

    const onPressChartBar = () => {
      setTabActive(1);
    };

    const listHeaderComponent = useCallback(() => {
      return (
        <View style={styles.box}>
          <View style={styles.setRow}>
            {ICON[`${typeTransaction}`]}
            <Text size={16} marginLeft={8} capitalize>
              {typeTransaction}
            </Text>
            <View style={styles.iconView}>{ICON.rightArrow}</View>
          </View>
          <Text
            color={
              typeTransaction === "expense"
                ? colors.redCrayola
                : colors.bleuDeFrance
            }
            bold
            size={22}
            lineHeight={37}
          >
            {currencyFormat(balance, currency)}
          </Text>
          {tabActive === 0 ? (
            <View style={styles.chart}>
              <HighchartsReactNative
                useSSL={false}
                useCDN={false}
                styles={styles.chartView}
                options={optionsChartPie}
              />
            </View>
          ) : (
            <View style={styles.chart}>
              <HighchartsReactNative
                useSSL={false}
                useCDN={false}
                styles={styles.chartView}
                options={optionsChartBar}
              />
            </View>
          )}
          <View style={styles.tabBar}>
            <Animated.View
              style={[styles.tab, { transform: [{ translateX: transX }] }]}
            />
            <TouchableOpacity onPress={onPressChartPie} style={styles.tabStyle}>
              <SvgChartPie
                color={tabActive === 0 ? colors.white : colors.grey3}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressChartBar} style={styles.tabStyle}>
              <SvgChartBar
                color={tabActive === 1 ? colors.white : colors.grey3}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }, [typeTransaction, currency, balance, tabActive]);

    const renderItem = useCallback(({ item, index }) => {
      const onHandleChartTransaction = () => {
        navigation.navigate(ROUTES.ChartTransaction);
      };
      return (
        <CategoryTransactionItem
          onPress={onHandleChartTransaction}
          style={[styles.item, { marginLeft: index % 2 ? 16 : 0 }]}
          totalBalance={balance}
          percent={60}
          currency={currency}
          {...item}
        />
      );
    }, []);

    return (
      <View style={styles.container}>
        {loading ? (
          <LoadingView isLoading={loading} />
        ) : (
          <FlatList
            data={FakeData}
            ListHeaderComponent={listHeaderComponent}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={keyExtractor}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            numColumns={2}
          />
        )}
      </View>
    );
  }
);

export default AnalysisPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthScreen,
  },
  chart: {
    height: heightScreen / 2.2,
    width: widthScreen / 1.1,
    alignSelf: "center",
  },
  box: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    transform: [{ rotate: "90deg" }],
    marginLeft: 12,
  },
  item: {
    marginTop: 16,
  },
  contentContainerStyle: {
    backgroundColor: colors.snow,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: getBottomSpace() + 16,
  },
  tabBar: {
    position: "absolute",
    width: 159,
    height: 33,
    backgroundColor: colors.snow,
    top: 16,
    right: 8,
    borderRadius: 20,
    flexDirection: "row",
  },
  tab: {
    width: "50%",
    height: "100%",
    backgroundColor: colors.emerald,
    borderRadius: 20,
    position: "absolute",
  },
  tabStyle: {
    width: "50%",
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chartView: {
    flex: 1,
    marginTop: 20,
  },
});
