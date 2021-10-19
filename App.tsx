import "react-native-gesture-handler";
import * as Sentry from "sentry-expo";
import { LogBox } from "react-native";
import { enableScreens } from "react-native-screens";
import firebase from "firebase";
import { firebaseConfig } from "./src/config/firebase";
import App from "./src/Entrypoint";
import { patchFlatListProps } from "react-native-web-refresh-control";

// Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}

/* Enable when release */
// setTestDeviceIDAsync('EMULATOR');

patchFlatListProps();

// Log error
Sentry.init({
  dsn:
    "https://b1d17a2a1fd241f9afed9b94af99ff46@o1016961.ingest.sentry.io/5982475",
  enableInExpoDevelopment: true,
  debug: true,
});

enableScreens();

LogBox.ignoreAllLogs();
export default App;