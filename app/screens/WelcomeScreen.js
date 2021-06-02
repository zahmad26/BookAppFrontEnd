import React from "react";
import axios from "axios";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const WelcomeScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
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
          </View>
          <View>
            <Text style={styles.tagline}>Sleep is good. Books are better.</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Signup");
              }}
            >
              <Text style={styles.signup}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          >
            <Text style={styles.signin}>LOG IN</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
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
    marginTop: "78%",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 25,
    fontFamily: "open-sans",
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
    marginBottom: "20%",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 25,
    fontFamily: "open-sans",
  },
  tagline: {
    fontSize: 19,
    fontFamily: "playfair-display",
    marginTop: "5%",
    textAlign: "center",
  },
});

export default WelcomeScreen;
