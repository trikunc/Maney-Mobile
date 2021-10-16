import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { widthScreen } from "@utils/dimensions";
import WalletItem from "@components/WalletItem";
import Carousel from "react-native-snap-carousel";

interface Props {
  onClickAddWallet?: () => void;
  onPressWallet?: () => void;
  currency?: string;
}

const HeaderList = memo(
  ({ onClickAddWallet, onPressWallet, walletData, currency }: any) => {
    const ITEM_WIDTH = 296;

    const renderItem = ({ item }: any) => {
      return (
        <WalletItem
          onPressWallet={() => onPressWallet(item)}
          onClickAddWallet={onClickAddWallet}
          currency={currency}
          {...item}
        />
      );
    };

    return (
      <View>
        <Carousel
          data={walletData}
          renderItem={renderItem}
          firstItem={0}
          sliderWidth={widthScreen}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.containerCustomStyle}
          inactiveSlideShift={1}
          inactiveSlideScale={1}
          activeSlideAlignment={"start"}
          inactiveSlideOpacity={1}
        />
      </View>
    );
  }
);

export default HeaderList;

const styles = StyleSheet.create({
  containerCustomStyle: {
    paddingLeft: 16,
    marginTop: 16,
  },
});
