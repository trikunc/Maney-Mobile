import React, { memo, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "@utils/colors";
import TextInput from "@elements/TextInput";
import { useNavigation } from "@react-navigation/native";
import HeaderButton from "@elements/Header/HeaderButton";
import ROUTES from "@utils/routes";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";

const CreateAssetsName = memo(({ route }: any) => {
  const navigation = useNavigation();
  const [walletName, setWalletName] = useState<string>("");
  const disabled = walletName === "";
  const [goBack, setGoBack] = useState<string>("");

  React.useEffect(() => {
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateAssets);
    }
    console.log('route: ', route.params)
    setWalletName(route.params?.name || "");
  }, []);

  React.useLayoutEffect(() => {
    const textDoneStyle = disabled
      ? { color: colors.grey3 }
      : { color: colors.purplePlum };

    const onDone = () => {
      const name = { name: walletName };
      navigation.navigate(goBack, name);
    };

    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          onPress={onDone}
          titleStyle={textDoneStyle}
          title={"Done"}
        />
      ),
    });
  }, [disabled, walletName]);

  const onSubmitEditing = () => {};

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle={"dark-content"}
      />
      <ScrollView scrollEnabled={false}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={"Enter your wallet name"}
            value={walletName}
            onChangeText={(text) => setWalletName(text)}
            autoFocus={true}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={"default"}
          />
        </View>
      </ScrollView>
    </View>
  );
});

export default CreateAssetsName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textInput: {
    alignSelf: "center",
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.seLago,
    paddingHorizontal: 16,
  },
  inputView: {
    paddingHorizontal: 32,
    marginTop: 40,
  },
  input: {
    width: "100%",
  },
});
