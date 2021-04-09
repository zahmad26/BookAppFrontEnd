// // import React from 'react';
// // import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// // const LoginScreen = () => {
// //     return (
// //         <View >

// //             <View style={styles.body}>
// //                 <Text style={styles.heading}>Sign In</Text>
// //                 <TextInput
// //                     style={styles.inputText}
// //                     placeholder="Username"
// //                     placeholderTextColor="#D3D3D3"
// //                     //  value={email}
// //                     autoFocus
// //                 //  onChangeText={onChangeEmail}

// //                 />
// //                 <TextInput
// //                     style={styles.inputText}
// //                     placeholder="Password"
// //                     placeholderTextColor="#D3D3D3"
// //                     secureTextEntry
// //                     autoFocus
// //                 //  onChangeText={onChangeEmail}

// //                 />
// //                 <TouchableOpacity
// //                     style={styles.loginBtn}

// //                 >
// //                     <Text style={styles.loginText}>SIGN IN</Text>
// //                 </TouchableOpacity>
// //                 <Text style={styles.noAcc}>Don't have an acocunt?</Text>
// //                 <TouchableOpacity
// //                     style={styles.signupBtn}

// //                 >
// //                     <Text style={styles.signupText}>SIGN UP</Text>
// //                 </TouchableOpacity>
// //             </View>
// //             <Image style={styles.background} source={require("../assets/background-01.png")} />
// //         </View>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     background: {
// //         position: 'absolute',
// //         marginTop: 0,
// //         top: 30,
// //         bottom: -100,
// //         left: -90,
// //         right: 0,
// //         opacity: 0.3,
// //         width:400,
// //         justifyContent:"center",
// //         alignItems:"center"
// //         //    height:10

// //     },
// //     body: {
// //         display: 'flex',
// //         flex: 1,
// //         top: -5,
// //         justifyContent: 'center',
// //         alignItems: 'center'
// //     },
// //     heading: {
// //         marginTop: 0,
// //         fontSize: 30,
// //         fontWeight: "bold",
// //         textAlign: "center",
// //         marginBottom: 6
// //     },
// //     inputText: {
// //         marginTop: 5,
// //         width: 200,
// //         height: 40,
// //         backgroundColor: "white",
// //         borderRadius: 10,
// //         borderWidth:1,
// //         paddingLeft: 5,
// //         justifyContent: 'space-around',
// //         marginTop: 9,
// //         marginBottom:9,
// //     },
// //     loginBtn: {
// //         backgroundColor: "#6b3f87",
// //         width: 200,
// //         height: 35,
// //         borderRadius: 5,
// //         marginTop:5,
// //         // marginBottom:5
// //     },
// //     loginText: {
// //         color: "white",
// //         textAlign: "center",
// //         paddingTop:7,
// //         fontWeight:"400",
// //         fontSize:14,
// //         // marginBottom:4
// //     },
// //     signupBtn:{
// //         // backgroundColor: "#6b3f87",
// //         marginTop:30,
// //         borderRadius:10,
// //         borderColor:"#3e155a",
// //         borderWidth:2,
// //         width: 200,
// //         height: 35,
// //         borderRadius: 5,

// //     },
// //     signupText:{
// //         textAlign:"center",
// //         paddingTop:4,
// //         color:"#3e155a",
// //         fontWeight:"500",
// //         fontSize:14
// //     },
// //     noAcc:{
// //         position: 'absolute',
// //         marginTop: 0,
// //         bottom:40,
// //     }
// // })

// // export default LoginScreen;
// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";

// const LoginScreen = () => {
//   return (
//     <View>

//       <View style={styles.body}>
//         <Text style={styles.heading}>Sign In</Text>
//         <TextInput
//           style={styles.inputText}
//           placeholder="Username"
//           placeholderTextColor="#D3D3D3"
//           //  value={email}
//           autoFocus
//           //  onChangeText={onChangeEmail}
//         />
//         <TextInput
//           style={styles.inputText}
//           placeholder="Password"
//           placeholderTextColor="#D3D3D3"
//           secureTextEntry
//           autoFocus
//           //  onChangeText={onChangeEmail}
//         />
//         <TouchableOpacity style={styles.loginBtn}>
//           <Text style={styles.loginText}>SIGN IN</Text>
//         </TouchableOpacity>
//         <Text style={styles.noAcc}>Don't have an acocunt?</Text>
//         <TouchableOpacity style={styles.signupBtn}>
//           <Text style={styles.signupText}>SIGN UP</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     opacity: 0.3,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     height: "100%",
//   },
//   body: {
//     display: "flex",
//     flex: 1,
//     top: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heading: {
//     marginTop: 10,
//     fontSize: 30,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 6,
//   },
//   inputText: {
//     marginTop: 50,
//     width: 200,
//     height: 40,
//     backgroundColor: "white",
//     borderRadius: 10,
//     borderWidth: 1,
//     paddingLeft: 5,
//     justifyContent: "space-around",
//     marginTop: 9,
//     marginBottom: 9,
//   },
//   loginBtn: {
//     backgroundColor: "#6b3f87",
//     width: 200,
//     height: 35,
//     borderRadius: 5,
//     marginTop: 5,
//     // marginBottom:5
//   },
//   signinText: {
//     color: "white",
//     textAlign: "center",
//     paddingTop: 7,
//     fontWeight: "400",
//     fontSize: 14,
//     // marginBottom:4
//   },
//   signupBtn: {
//     // backgroundColor: "#6b3f87",
//     marginTop: 30,
//     borderRadius: 10,
//     borderColor: "#3e155a",
//     borderWidth: 2,
//     width: 200,
//     height: 35,
//     borderRadius: 5,
//   },
//   signupText: {
//     textAlign: "center",
//     paddingTop: 4,
//     color: "#3e155a",
//     fontWeight: "500",
//     fontSize: 14,
//   },
//   noAcc: {
//     position: "absolute",
//     marginTop: 0,
//     bottom: 40,
//   },
// });

// export default LoginScreen;
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function App() {

  const login = () => {
    let body = { email: "sana12@gmail.com", password: "12345" };
    console.log('in Login', body);
    axios.post("http://localhost:5000/api/users/login", body).then((res) => {
      console.log("after api call", res);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setState({ email: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => this.setState({ password: text })}
        />
      </View>
      <TouchableOpacity onPress={login}>
        <Text style={styles.signin}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgot}>Don't have an account?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signup}>SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 50,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  forgot: {
    fontSize: 20,
    paddingTop: 40,
  },
  signup: {
    marginTop: 30,
    borderRadius: 10,
    borderColor: "#3e155a",
    borderWidth: 2,
    width: 250,
    height: 45,
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 10,
    color: "#3e155a",
    fontWeight: "500",
    fontSize: 14,
  },
  signin: {
    backgroundColor: "#6b3f87",
    width: 250,
    height: 45,
    borderRadius: 5,
    marginTop: 5,
    color: "white",
    textAlign: "center",
    paddingTop: 10,
    fontWeight: "400",
    fontSize: 14,
  },
});
