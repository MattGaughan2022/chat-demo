import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//async/localstorage, cookies, sessionstorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from '@react-native-community/netinfo';
import { LogBox, Alert } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

//firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork, setLogLevel, initializeFirestore } from "firebase/firestore";

//components
import Start from './components/Start';
import Chat from './components/Chat';

import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  
  //offline functionality
  const connectionStatus = useNetInfo();

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
 // db = getFirestore(app);

const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
})

  

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
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
