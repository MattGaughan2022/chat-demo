import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [bgColor, setBgColor] = useState('#090C08');

  const chooseBg = (color) =>{
    setBgColor(color)
  }

 return (
   <View style={styles.container}>
    <ImageBackground source={require('../bkimg.png')} style={styles.image}>
     <View style={styles.content}>
     <Text style={styles.appTitle}>Chat App</Text>
      <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type username here'
          placeholderTextColor='#FFFFFF'
          color='#FFFFFF'
          fontWeight='600'
          require
          />
      <Text style={{color: '#FFFFFF'}}>Choose CHAT background color:</Text>
      <View style={styles.bgSection}>
        <TouchableOpacity 
          onPress={()=>{
            chooseBg('#090C08');
          }}
          style={[styles.squareButton,{backgroundColor: '#090C08'}]}/>
        <TouchableOpacity 
          onPress={()=>{
            chooseBg('#474056');
          }}
          style={[styles.squareButton,{backgroundColor: '#474056'}]}/>
        <TouchableOpacity 
          onPress={()=>{
            chooseBg('#8A95A5');
          }}
          style={[styles.squareButton,{backgroundColor: '#8A95A5'}]}/>
        <TouchableOpacity 
          onPress={()=>{
            chooseBg('#B9C6AE');
          }}
          style={[styles.squareButton,{backgroundColor: '#B9C6AE'}]}/>
      </View>
      {/* #090C08; #474056; #8A95A5; #B9C6AE */}
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Go to chat page"
        AccessibilityHint="Move you from the start page to the chat page."
        accessibilityRole="button"
        style={styles.button}
        onPress={() => navigation.navigate('Chat', {name: name, color: bgColor})}
      ><Text style={{color: '#FFFFFF'}}>Start Chatting</Text></TouchableOpacity>
     </View>
     </ImageBackground>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 textInput: {
   width: "78%",
   padding: 15,
   borderWidth: 1,
   marginTop: 15,
   marginBottom: 15,
   borderColor: 'white',
   fontSize: 16,
   fontWeight: 300,
   color: '#757083',
 },
 appTitle: {
   fontSize: 45,
   fontWeight: '600',
   color: '#FFFFFF',
 },
 content:{
   paddingTop: 80,
   justifyContent: 'center',
   alignItems: 'center',
 },
 image:{
  flex: 1,
 },
 button:{
  padding: 5,
  borderWidth: 2,
  borderColor: '#FFFFFF',
  backgroundColor: '#757083',
  fontWeight: 600,
  fontSize: 16,
 },
 bgSection:{
  paddingTop: 15,
  flexDirection: 'row',
  paddingBottom: 15,
 },
 squareButton: {
  padding: 35,
  borderWidth: 2,
  borderRadius: 22,
  borderColor: '#FFFFFF',
  
 }
});

export default Start;