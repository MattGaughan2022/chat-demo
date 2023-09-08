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

const Stack = createNativeStackNavigator();

export default function App() {

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEvvGLi5MAFWtgMDjODdN4I68YHBNqL_g",
  authDomain: "chat-demo-62015.firebaseapp.com",
  projectId: "chat-demo-62015",
  storageBucket: "chat-demo-62015.appspot.com",
  messagingSenderId: "489558811826",
  appId: "1:489558811826:web:4275670d6a0f5608fad5ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
          {props => <Chat db={db} {...props} />}
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
