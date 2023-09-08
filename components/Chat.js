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
import { Bubble, GiftedChat } from "react-native-gifted-chat"; //find props from their repo

const Chat = ({ route, navigation, db }) => {
  const { name, userID } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }
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
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
    }
   }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      {/* <Text>Hello Chat Page!</Text>
     <Text>Color: {route.params.color}</Text> */}
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: name, userID,
        }}
      />
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