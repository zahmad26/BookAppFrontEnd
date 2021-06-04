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
import ip from "../config";
import { FontAwesome } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const screenProps = props.myProp.route.params;
  const token = screenProps.token;
  const id = screenProps.userId;
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  // let token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDMzYzY0MWUyMTNhMWFiODhlNjc3NCIsImlhdCI6MTYxNzk1MzQwMCwiZXhwIjoxNjIwNTQ1NDAwfQ._K0ehmZK5LA_b0E8-6a89Se1GwJQod9AtUpiNIFyiY8"; //change based on props value
  //console.log(props.myProp);
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    axios
      .get(`http://${ip}:5000/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.header.error == 0) {
          console.log("get profile success", res.data.body);
          setEmail(res.data.body.email);
          setFirstName(res.data.body.fname);
          setLastName(res.data.body.lname);
          setUserName(res.data.body.username);
        }
      })
      .catch((err) => {
        console.log("get profile failed", err);
      });
  };

  let user = {
    fname: firstName,
    lname: lastName,
    username: userName,
  };
  const updateProfile = () => {
    console.log("update Call Working");
    axios
      .put(`http://${ip}:5000/api/users/profile/update`, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.header.error != 1) {
          console.log(res.data.header.message, res.data.body);
        } else {
          console.log(res.data.header.message);
        }
      })
      .catch((err) => {
        console.log("Update profile failed", err);
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
            {/* <Image
              style={styles.profileImg}
              source={require("../assets/profile.png")}
            /> */}
            <FontAwesome
              name="user-circle-o"
              size={90}
              color="#6B3F87"
              style={styles.profile}
            />

            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              onChangeText={setFirstName}
              value={firstName}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUserName}
              value={userName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} editable={false} value={email} />
            <TouchableOpacity style={styles.pwBtn}>
              <Text
                style={{ color: "#6B3F87", fontSize: 12, paddingBottom: 7 }}
              >
                CHANGE PASSWORD
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                updateProfile();
              }}
              style={styles.saveButton}
            >
              <Text style={{ color: "white", fontSize: 17 }}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.myProp.navigation.navigate("Splash");
              }}
              style={styles.logOutBtn}
            >
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
    marginTop: 30,
  },
  heading: {
    fontSize: 30,
    marginTop: 30,
    color: "#000",
    fontFamily: "playfair-display",
    paddingBottom: 25,
  },
  name: {
    marginTop: 18,
    fontSize: 22,
    fontFamily: "open-sans",
    paddingBottom: 15,
    color: "#000",
  },
  profile: {},
  label: {
    fontSize: 11,
    alignSelf: "flex-start",
    paddingLeft: 35,
    paddingTop: 5,
    paddingBottom: 1,
    fontFamily: "open-sans",
    color: "#6B3F87",
  },
  input: {
    fontFamily: "playfair-display",
    fontSize: 18,
    height: 45,
    width: 300,
    margin: 1,
    paddingLeft: 7,
    marginBottom: 5,
    borderRadius: 8,
    borderColor: "#A397AA",
    borderWidth: 1,
    paddingBottom: 3,
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
