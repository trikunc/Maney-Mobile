import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "@utils/colors";
import TextInput from "@elements/TextInput";
import { useNavigation } from "@react-navigation/native";
import HeaderButton from "@elements/Header/HeaderButton";
import ROUTES from "@utils/routes";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import { widthScreen } from "@utils/dimensions";

const AddTransactionNote = memo(({ route }: any) => {
  const navigation = useNavigation();
  const [note, setNote] = useState<string>("");
  const [goback, setGoBack] =  useState<string>(ROUTES.CreateTransaction);
  const disabled = note === "";

  React.useLayoutEffect(() => {
    const textDoneStyle = disabled
      ? { color: colors.grey3 }
      : { color: colors.purplePlum };

    const onDone = () => {
      const noteContent = { note: note };
      navigation.navigate(goback, noteContent);
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
  }, [disabled, note]);

  React.useEffect(() => {
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateTransaction);
    }
    if (route.params?.note) {
      setNote(route.params?.note);
    }
  }, [route.params?.note]);

  const onChangeNote = useCallback((text) => {
    setNote(text);
  }, []);

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
            placeholder={"Write a note"}
            value={note}
            onChangeText={onChangeNote}
            autoFocus={true}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={"default"}
          />
        </View>
      </ScrollView>
    </View>
  );
});

export default AddTransactionNote;

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
  input: {
    width: "100%",
  },
  inputView: {
    paddingHorizontal: 32,
    marginTop: 40,
  },
});
