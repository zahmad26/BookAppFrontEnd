import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import axios from "axios";

const ProfileScreen = (props) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDMzYzY0MWUyMTNhMWFiODhlNjc3NCIsImlhdCI6MTYxNzk1MzQwMCwiZXhwIjoxNjIwNTQ1NDAwfQ._K0ehmZK5LA_b0E8-6a89Se1GwJQod9AtUpiNIFyiY8"; //change based on props value

  useEffect(() => {
    getProfile(token);
  }, []);

  const getProfile = (token) => {
    console.log("API Call Working");
    axios
      .get(`http://localhost:5000/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setEmail(res.data.body.email);
        setFirstName(res.data.body.fname);
        setLastName(res.data.body.lname);
        setUserName(res.data.body.username);
      });
  };

  return (
    <SafeAreaView>
      {/* <ImageBackground source={BackGroundImage} style={styles.bg}> */}
      <ScrollView>
        <ImageBackground
          style={styles.bg}
          source={require("../assets/transparent.png")}
        >
          <View style={styles.container}>
            <Text style={styles.heading}>My Profile</Text>
            <Image
              style={styles.profileImg}
              source={require("../assets/profile.png")}
            />
            <Text style={styles.name}>{userName}</Text>

            <TextInput
              label="password "
              mode="outlined"
              style={styles.input}
              onChangeText={setFirstName}
              value={firstName}
            />
            <TextInput
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
            />
            <TextInput
              style={styles.input}
              onChangeText={setUserName}
              value={userName}
            />
            <TextInput style={styles.input} editable={false} value={email} />
            <TouchableOpacity style={styles.pwBtn}>
              <Text
                style={{ color: "#6B3F87", fontSize: 12, paddingBottom: 7 }}
              >
                CHANGE PASSWORD
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={{ color: "white", fontSize: 17 }}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {
            props.navigation.navigate("Splash") }} style={styles.logOutBtn}>
              <Text style={{ color: "#6B3F87", fontSize: 17 }}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* </ImageBackground> */}
      </ScrollView>
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
    fontSize: 26,
    marginTop: 52,
    color: "#000",
    fontFamily: "playfair-display",
  },
  name: {
    marginTop: 15,
    fontSize: 30,
  },
  profileImg: {
    marginTop: 14,
    width: 128,
    height: 128,
    borderRadius: 100,
  },
  input: {
    height: 45,
    width: 300,
    margin: 12,
    paddingLeft: 6,
    marginBottom: 5,
    borderRadius: 8,
    borderColor: "#A397AA",
    borderWidth: 1,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#6B3F87",
    padding: 10,
    height: 48,
    width: 280,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 40,
  },
  logOutBtn: {
    alignItems: "center",
    //backgroundColor: "#ffffff",
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
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

export default ProfileScreen;
