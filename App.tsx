import "react-native-gesture-handler";
import * as Sentry from "sentry-expo";
import { LogBox } from "react-native";
import { enableScreens } from "react-native-screens";
import firebase from "firebase";
import { firebaseConfig } from "./src/config/firebase";
import App from "./src/Entrypoint";
import { patchFlatListProps } from "react-native-web-refresh-control";

// Firebase
firebase.initializeApp(firebaseConfig);

/* Enable when release */
// setTestDeviceIDAsync('EMULATOR');

patchFlatListProps();

// Log error
Sentry.init({
  dsn:
    "https://be700e1df8104cb28479551ad9ff6849@o489325.ingest.sentry.io/5551375",
  enableInExpoDevelopment: true,
  debug: true,
});

enableScreens();

LogBox.ignoreAllLogs();
export default App;
