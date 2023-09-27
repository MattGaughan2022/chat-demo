import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat"; //find props from their repo

import { Avatar } from "react-native-elements";

import CustomActions from "./CustomActions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, userID } = route.params;
  const [messages, setMessages] = useState([]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  //action button ( '+' )
  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <View style={{ marginRight: 20, paddingBottom: 10 }}>
          <Avatar
            rounded
            source={{
              uri: "https://img.myloview.com/posters/default-avatar-profile-icon-vector-social-media-user-symbol-image-700-244492311.jpg",
            }}
          />
        </View>
      ),
    });
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            name: name,
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
      // if (currentMessage.3dModel) alternate custom views
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      {/* <Text>Hello Chat Page!</Text>
     <Text>Color: {route.params.color}</Text> */}
      <GiftedChat
        renderInputToolbar={renderInputToolbar}
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
        renderBubble={renderBubble}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: name,
          name,
          avatar:
            "https://img.myloview.com/posters/default-avatar-profile-icon-vector-social-media-user-symbol-image-700-244492311.jpg",
        }}
      />
      <View style={{ paddingBottom: 10 }}></View>
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
  },
});

export default Chat;
