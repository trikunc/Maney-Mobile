/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React from "react";
import { ActivityIndicator } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import Navigator from "./navigation";
import { IThemeState } from "./store/models/reducers/theme";
import configureStore from "./store/index";
import { useFonts } from "expo-font";

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
};

const { persistor, store } = configureStore();

interface IState {
  themeReducer: IThemeState;
}

const RootNavigation: React.FC = () => {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark);
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const paperTheme = isDark ? PaperDarkTheme : PaperDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      {/* @ts-expect-error */}
      {<Navigator theme={combinedTheme} />}
    </PaperProvider>
  );
};

const MuktaBold =  require("./assets/fonts/muktabold.ttf");
const MuktaSemiBold = require("./assets/fonts/muktasemibold.ttf");
const MuktaRegular = require("./assets/fonts/muktaregular.ttf");
const MuktaMedium = require("./assets/fonts/muktamedium.ttf");

const Entrypoint: React.FC = () => {
  const [loaded, error] = useFonts({
    MuktaBold: MuktaBold,
    MuktaSemiBold: MuktaSemiBold,
    MuktaRegular: MuktaRegular,
    MuktaMedium: MuktaMedium,
  });

  if (!loaded) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default Entrypoint;
