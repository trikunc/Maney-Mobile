import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import colors from "@utils/colors";
import { widthScreen } from "@utils/dimensions";
// @ts-ignore
import { getBottomSpace } from "react-native-iphone-x-helper";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import ButtonPrimaryIcon from "@elements/Button/ButtonPrimaryIcon";
import { LOGIN_SCREEN } from "@svg/Login";
import { useDispatch } from "react-redux";
// @ts-ignore
import firebase from "firebase";
// @ts-ignore
import * as Google from "expo-google-app-auth";
// @ts-ignore
import * as Facebook from "expo-facebook";
import { apiSignIn } from "@api/index";
import {
  saveToken,
  saveUuidUser,
  getUuidUser,
  saveGuestFlag,
} from "../../utils/store/Store";
// @ts-ignore
import { navigateToBottomMain } from "@actions/navigationActions";
// @ts-ignore
import * as loginActions from "@actions/loginActions";
// @ts-ignore
import * as dashboardActions from "@actions/dashboardActions";
import LoadingView from "@elements/LoadingView";
import Page from "./components/Page";
import Dots from "./components/Dots";
import { LOGIN_DATA } from "@data/index";
import { ICON } from "@svg/Icon";
import Text from "@elements/Text";
import * as WebBrowser from "expo-web-browser";

const Login = memo(() => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [policyCheck, setPolicyCheck] = useState(false);

  const onCheckPolicy = useCallback(() => {
    setPolicyCheck(!policyCheck);
  }, [policyCheck]);

  const onPolicy = () => {
    WebBrowser.openBrowserAsync("https://codelink.ai/privacy-policy");
  };
  const onTerm = () => {
    WebBrowser.openBrowserAsync("https://codelink.ai/terms-conditions");
  };

  useEffect(() => {
    setData(LOGIN_DATA);
    setLoading(false);
  }, []);

  const checkLogin = async (firebaseToken: string) => {
    console.log('===Check Login Masuk===')
    const { user, token, typeWallets, categories, currencies } =
    await apiSignIn({
      firebaseToken,
      isGuest: false,
    });
    console.log('===Check Login Masuk=== user==', user)
    console.log('===Check Login Masuk=== token==', token)
    console.log('===Check Login Masuk=== typeWallets==', typeWallets)
    console.log('===Check Login Masuk=== categories==', categories)
    console.log('===Check Login Masuk=== currencies==', currencies)
    await saveToken(token);
    await saveGuestFlag(false);

    dispatch(
      loginActions.onLoginResponse(user, categories, currencies, typeWallets)
    );
    dispatch(dashboardActions.onDashboardRequest());
    navigateToBottomMain({});
  };

  const signInWithFacebookAsync = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "847156225947307",
        appName: "Maney",
      });

      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });

      const { token, type } = result;

      // if (type === 'success') {
      //   // Get the user's name using Facebook's Graph API
      //   // fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
      //   //   .then(response => console.log(response.json()))

      //   // Build Firebase credential with the Facebook access token.
      //   const credential = firebase.auth.FacebookAuthProvider.credential(token);

      //   // Sign in with credential from the Facebook user.
      //   firebase
      //   .auth()
      //   .signInWithCredential(credential)
      //   .catch(error => {
      //     console.error(error);
      //     // Handle Errors here.
      //   });
         
      // }

      console.log('result:', result);
      // console.log('result:', result);

      if (result.type === "success") {
        setLoading(true);

        const { token } = result;
        const facebookCredential =
          firebase.auth.FacebookAuthProvider.credential(token);

        // Sign-in the user with the credential
        await firebase.auth().signInWithCredential(facebookCredential);

        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
          return;
        }

        console.log('currentUser==', currentUser)
        
        const firebaseToken = await currentUser
        .getIdToken()
        .then((data) => data);
        
        console.log('firebaseToken==', firebaseToken)
        await checkLogin(firebaseToken);

        setLoading(false);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      // Handle error
      Alert.alert("Login facebook failed");
      return { error: true };
    }
  };

  const onLogInFacebook = useCallback(async () => {
    signInWithFacebookAsync();
  }, []);

  const signInWithGoogleAsync = async () => {
    try {
      /*** MUST-CONFIG ***/
      const result = await Google.logInAsync({
        androidClientId: "",
        iosClientId: "",
        iosStandaloneAppClientId: "",
        androidStandaloneAppClientId: "",
        scopes: ["profile"],
      });

      if (result.type === "success") {
        setLoading(true);

        const { idToken } = result;

        // Thong tin push len de xu ly login
        const googleCredential =
          firebase.auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        await firebase.auth().signInWithCredential(googleCredential);

        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
          return;
        }

        const firebaseToken = await currentUser
          .getIdToken()
          .then((data) => data);

        await checkLogin(firebaseToken);

        setLoading(false);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      setLoading(false);

      // DEBUG
      console.log("DEBUG ERROR: Login Google ", e);

      // Handle error
      Alert.alert("Login google failed");
      return { error: true };
    }
  };

  const onLoginGoogle = useCallback(async () => {
    try {
      signInWithGoogleAsync();
    } catch (e) {
      console.log("Error: Login Google ", e);
    }
  }, []);

  const onLoginApple = useCallback(() => {}, []);

  const onLoginAsGuest = useCallback(async () => {
    try {
      const uuid = await getUuidUser();
      // console.log("DEBUG: uuid", uuid);

      // DEBUG
      //const uuid = "8d2cda0f-c199-4132-a2b6-befdc77d5410";
      //const uuid = "5b9d01b5-e458-40b1-8b49-fd0504636a6f";

      // Send login request to server
      const { user, token, typeWallets, categories, currencies } =
        await apiSignIn({ uuid, isGuest: true });

      // Save token
      await saveToken(token);
      // Update uuid for new user case
      await saveUuidUser(user.uuid);
      await saveGuestFlag(true);

      // Update store
      dispatch(
        loginActions.onLoginResponse(user, categories, currencies, typeWallets)
      );
      dispatch(dashboardActions.onDashboardRequest());

      // Navigate to dashboard
      navigateToBottomMain({});
    } catch (e) {
      Alert.alert("Login Guest failed");
      console.log("Error: Login Guest", e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.emerald}
        barStyle={"light-content"}
      />
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              width: widthScreen * data.length,
            }}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            {data.map((item: any, index: number) => {
              return <Page {...item} key={index} />;
            })}
          </ScrollView>
          <View style={styles.contentView}>
            <Dots scrollX={scrollX} />
            <TouchableOpacity
              onPress={onCheckPolicy}
              activeOpacity={0.7}
              style={styles.check}
            >
              <View
                style={[
                  styles.checkBox,
                  {
                    backgroundColor: policyCheck
                      ? colors.emerald
                      : colors.white,
                    borderColor: policyCheck
                      ? colors.white
                      : colors.lightSlateGrey,
                    borderWidth: policyCheck ? 0 : 1,
                  },
                ]}
              >
                {ICON.check}
              </View>
              <Text>
                <Text>I Agree to </Text>
                <Text
                  size={16}
                  onPress={onPolicy}
                  style={styles.policyText}
                  bold
                  color={colors.emerald}
                >
                  Privacy Policy
                </Text>
                <Text> And </Text>
                <Text
                  size={16}
                  onPress={onTerm}
                  style={styles.policyText}
                  bold
                  color={colors.emerald}
                >
                  Term {"&"} Condition
                </Text>
              </Text>
            </TouchableOpacity>
            <ButtonPrimaryIcon
              disabled={!policyCheck}
              onPress={onLogInFacebook}
              style={styles.button}
              colorFocus={colors.navyBlue}
              colorBlur={colors.bleuDeFrance}
              iconLeft={LOGIN_SCREEN.facebook}
              underlayColor={colors.mayaBlue}
              title={"Login with Facebook"}
            />
            <ButtonPrimaryIcon
              disabled={!policyCheck}
              onPress={onLoginGoogle}
              style={styles.button}
              colorFocus={colors.bitterSweet}
              colorBlur={colors.redCrayola}
              iconLeft={LOGIN_SCREEN.google}
              underlayColor={colors.monaLisa}
              title={"Login with Google"}
            />
            {false && (
              <ButtonPrimaryIcon
                disabled={!policyCheck}
                onPress={onLoginApple}
                style={styles.button}
                colorFocus={colors.black}
                colorBlur={colors.grey1}
                iconLeft={LOGIN_SCREEN.apple}
                underlayColor={colors.timberGreen}
                title={"Login with Apple"}
              />
            )}
            <ButtonPrimaryIcon
              onPress={policyCheck ? onLoginAsGuest : () => {}}
              style={styles.buttonSkip}
              titleStyle={{
                color: policyCheck ? colors.emerald : colors.grey5,
              }}
              underlayColor={colors.white}
              title={"Login as Guest"}
            />
          </View>
        </>
      )}
    </View>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.emerald,
  },
  contentView: {
    width: widthScreen,
    alignItems: "center",
    paddingBottom: getBottomSpace(),
    backgroundColor: colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 24,
  },
  button: {
    marginTop: 24,
  },
  buttonSkip: {
    backgroundColor: "transparent",
    marginTop: 10,
    marginBottom: getBottomSpace() + 24,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
  },
  policyText: {
    textDecorationLine: "underline",
  },
});
