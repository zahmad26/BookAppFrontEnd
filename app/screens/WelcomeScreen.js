import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.png")}
    >
      <View>
        <Image
          source={require("../assets/logo-whitebg.png")}
          style={styles.logo}
          resizeMode="contain"
        ></Image>
        <Text style={styles.tagline}>Sleep is good. Books are better.</Text>
        <TouchableOpacity>
          <Text style={styles.signup}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.signin}>SIGN IN</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 220,
    height: 70,
    marginLeft: "19%",
    marginTop: "25%",
  },
  signup: {
    backgroundColor: "#eb5e0b",
    borderWidth: 2,
    borderColor: "#eb5e0b",
    color: "white",
    width: "75%",
    borderRadius: 10,
    textAlign: "center",
    marginTop: "88%",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 25,
    fontFamily: "normal",
  },
  signin: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    color: "white",
    width: "75%",
    borderRadius: 10,
    textAlign: "center",
    marginTop: "8%",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 25,
    fontFamily: "normal",
  },
  tagline: {
    fontSize: 19,
    fontFamily: "Roboto",
    marginTop: "20%",
    marginLeft: "10%",
  },
});

export default WelcomeScreen;
