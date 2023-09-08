import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

//firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//components
import Start from './components/Start';
import Chat from './components/Chat';
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

const Stack = createNativeStackNavigator();

export default function App() {

  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD-N3SdRqOA0zJ4qv_cx4Rj5ArYsTqcl6g",
    authDomain: "shopping-list-demo-dbd8a.firebaseapp.com",
    projectId: "shopping-list-demo-dbd8a",
    storageBucket: "shopping-list-demo-dbd8a.appspot.com",
    messagingSenderId: "633192329280",
    appId: "1:633192329280:web:4f94864d2fb8edfa9e2fa5"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        {/* initialRouteName="Start" */}
        <Stack.Screen 
        name="Welcome" 
        component={Welcome} 
        />
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          name="ShoppingLists">
          {props => <ShoppingLists db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
