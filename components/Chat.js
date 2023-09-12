import { useEffect, useState } from 'react';
import {
  collection, getDocs, addDoc,
  onSnapshot, query, orderBy
} from "firebase/firestore";
import {
  StyleSheet, View, KeyboardAvoidingView,
  Platform, Text, TextInput, Alert,
  TouchableOpacity
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat"; //find props from their repo

import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, userID } = route.params;
  const [messages, setMessages] = useState([]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }
  //alter render prop
  const renderInputToolbar = (props) => {
    if (isConnected===true) return <InputToolbar {...props} />;
    else return null;
  }
  //alter render prop
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  // where("uid", "==", userID));

  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {

      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          });
        });
        cachedMessages(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMessages();
    
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      {/* <Text>Hello Chat Page!</Text>
     <Text>Color: {route.params.color}</Text> */}
      {(isConnected === true) ?
        <GiftedChat
          renderInputToolbar={renderInputToolbar}
          renderBubble={renderBubble}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: name, userID,
          }}
        /> : null}
      <View style={{ paddingBottom: 10 }}></View>
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .95,
  }
});

export default Chat;