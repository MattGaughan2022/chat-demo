import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("#090C08");

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: bgColor,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  const chooseBg = (color) => {
    setBgColor(color);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../bkimg.png")} style={styles.image}>
        <View style={styles.content}>
          <Text style={styles.appTitle}>Chat App</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type username here"
            placeholderTextColor="#FFFFFF"
            color="#FFFFFF"
            fontWeight="600"
            require
          />
          <Text style={{ color: "#FFFFFF" }}>
            Choose CHAT background color:
          </Text>
          <View style={styles.bgSection}>
            <TouchableOpacity
              id="1"
              onPress={() => {
                chooseBg("#090C08");
              }}
              style={[
                styles.squareButton,
                { backgroundColor: "#090C08" },
                [bgColor == "#090C08" ? { borderColor: "green" } : null],
              ]}
            >
              {bgColor == "#090C08" ? (
                <Text style={{ color: "white", fontSize: 40 }}>X</Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              id="2"
              onPress={() => {
                chooseBg("#474056");
              }}
              style={[
                styles.squareButton,
                { backgroundColor: "#474056" },
                [bgColor == "#474056" ? { borderColor: "green" } : null],
              ]}
            >
              {bgColor == "#474056" ? (
                <Text style={{ color: "white", fontSize: 40 }}>X</Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              id="3"
              onPress={() => {
                chooseBg("#8A95A5");
              }}
              style={[
                styles.squareButton,
                { backgroundColor: "#8A95A5" },
                [bgColor == "#8A95A5" ? { borderColor: "green" } : null],
              ]}
            >
              {bgColor == "#8A95A5" ? (
                <Text style={{ color: "white", fontSize: 40 }}>X</Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              id="4"
              onPress={() => {
                chooseBg("#B9C6AE");
              }}
              style={[
                styles.squareButton,
                { backgroundColor: "#B9C6AE" },
                [bgColor == "#B9C6AE" ? { borderColor: "green" } : null],
              ]}
            >
              {bgColor == "#B9C6AE" ? (
                <Text style={{ color: "white", fontSize: 40 }}>X</Text>
              ) : null}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Go to chat page"
            AccessibilityHint="Move you from the start page to the chat page."
            accessibilityRole="button"
            style={styles.button}
            onPress={signInUser}
          >
            <Text style={{ color: "#FFFFFF" }}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    borderColor: "white",
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    paddingTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
  },
  button: {
    padding: 5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#757083",
    fontWeight: 600,
    fontSize: 16,
  },
  bgSection: {
    paddingTop: 15,
    flexDirection: "row",
    paddingBottom: 15,
  },
  squareButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 22,
    borderColor: "#FFFFFF",
  },
});

export default Start;
