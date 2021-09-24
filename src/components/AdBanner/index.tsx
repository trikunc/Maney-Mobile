import React from "react";
import { View, StyleSheet } from "react-native";
import { widthScreen } from "@utils/dimensions";
import { AdMobBanner } from "expo-ads-admob";
import adMobUnitId from "@utils/adMobUnitId";

export default () => {
  return (
    <View style={styles.container}>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={adMobUnitId.mainAdUnitId}
        servePersonalizedAds
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    alignItems: "center",
  },
});
