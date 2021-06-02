import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";

const LoginScreen = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(true);
  const errMessage = "Incorrect Email or Password";

  let user = {
    email: email,
    password: password,
  };

  const login = () => {
    console.log("in Login", user);
    axios
    .post("http://localhost:5000/api/users/login", user)
      .then((res) => {
        console.log("after api call", res);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(errMessage);
        setLoggedIn(false);
      });
  };

  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.bg}
        source={require("../assets/transparent.png")}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Log In</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
          />
          <Text style={{ color: "red", fontSize: 17, paddingTop: 2 }}>
            {loggedIn ? "" : errMessage}
          </Text>

          <TouchableOpacity onPress={() => {
            props.navigation.navigate("Tabs") }} style={styles.signInButton} onPress={login}>
            <Text style={{ color: "white", fontSize: 17, paddingTop: 2 }}>
              LOG IN
            </Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 30, fontSize: 14 }}>
            {" "}
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate("Signup") }} style={styles.signUpBtn}>
            <Text style={{ color: "#6B3F87", fontSize: 17 }}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 36,
    marginTop: 30,
    marginBottom: 10,
    fontFamily:'playfair-display'
  },

  input: {
    height: 45,
    width: 300,
    margin: 12,
    paddingLeft: 6,
    borderRadius: 8,
    borderColor: "#A397AA",
    borderWidth: 1,
  },
  signInButton: {
    alignItems: "center",
    backgroundColor: "#6B3F87",
    padding: 10,
    marginTop: 24,
    marginBottom: 0,
    height: 48,
    width: 280,
    borderRadius: 8,
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 14 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    elevation: 30,
  },
  signUpBtn: {
    alignItems: "center",
    //backgroundColor: "#ffffff",
    padding: 10,
    marginTop: 24,
    marginBottom: 34,
    height: 48,
    width: 280,
    borderRadius: 8,
    borderColor: "#6B3F87",
    borderWidth: 2,
  },
  bg: {
    width: "100%",
    height: "100%",
    // flex: 1,
    resizeMode: "stretch", // or 'stretch',
    justifyContent: "center",

    // resizeMode: "cover",
    //justifyContent: "center"
  },
  // bg: {
  //   position:'absolute',
  //   bottom:0
  //   // flex: 1,
  //   // justifyContent: "center"
  // },
  pwBtn: {
    alignItems: "center",
    padding: 10,
    height: 48,
    width: 280,
  },
});

export default LoginScreen;
