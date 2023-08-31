import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({route, navigation}) => {
    const {name} = route.params;
    

    useEffect(()=> {
        navigation.setOptions({ title: name });
        
    }, []);

 return (
   <View style={[styles.container, {backgroundColor: route.params.color}]}>
     <Text>Hello Chat Page!</Text>
     <Text>Color: {route.params.color}</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;