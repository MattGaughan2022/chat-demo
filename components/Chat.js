import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat"; //find props from their repo

const Chat = ({route, navigation}) => {
    const {name} = route.params;
    
    const [messages, setMessages]=useState([]);

    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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

    useEffect(()=> {
      setMessages([
        {
          _id: 1,
          text: "Hello Developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            // avatar: "placeholder.png",
          },
        },
        {
          _id: 2,
          text: 'this is a system message',
          createdAt: new Date(),
          system: true,
        }
      ]);
    }, []);

    useEffect(()=> {
        navigation.setOptions({ title: name });
    }, []);

 return (
   <View style={[styles.container, {backgroundColor: route.params.color}]}>
     {/* <Text>Hello Chat Page!</Text>
     <Text>Color: {route.params.color}</Text> */}
     <GiftedChat
      renderBubble={renderBubble}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
    <View style={{paddingBottom: 10}}></View>
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 } 
});

export default Chat;