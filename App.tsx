import 'react-native-gesture-handler';
import * as Sentry from 'sentry-expo';
import { LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { setTestDeviceIDAsync } from 'expo-ads-admob';
import firebase from 'firebase';
import { firebaseConfig } from './src/config/firebase';
import App from './src/Entrypoint';

// Firebase
firebase.initializeApp(firebaseConfig)

/* Enable when release */
// setTestDeviceIDAsync('EMULATOR');

// Log error
Sentry.init({
  dsn: "https://b1d17a2a1fd241f9afed9b94af99ff46@o1016961.ingest.sentry.io/5982475",
  enableInExpoDevelopment: true,
  debug: true,
});

enableScreens();

LogBox.ignoreAllLogs();
export default App;
