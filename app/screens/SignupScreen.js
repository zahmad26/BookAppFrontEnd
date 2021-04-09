import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react'
import { StyleSheet,Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

function SignUpScreen(props){

  return (
 <ImageBackground style={styles.background}
    source = {require("../assets/transparent.png")}>
    <View style = {styles.container}>
      <Text style ={styles.logo}>Sign Up</Text>
      <View style = {styles.inputView}>
        <TextInput
          style = {styles.inputText}
          placeholder = "Email"
          placeholderTextColor= '#808080'
          onChangeText = {text => this.setState({email:text})}/>
      </View>
      <View style = {styles.inputView}>
        <TextInput
          style = {styles.inputText}
          placeholder = "Username"
          placeholderTextColor = '#808080'
          onChangeText = {text => this.setState({password:text})}
        />
        </View>
        <View style = {styles.inputView}>
        <TextInput
          secureTextEntry
          style = {styles.inputText}
          placeholder = "Password"
          placeholderTextColor = '#808080'
          onChangeText = {text => this.setState({password:text})}
        />
        </View>
        <View style = {styles.inputView}>
        <TextInput
          secureTextEntry
          style = {styles.inputText}
          placeholder = "Confirm Password"
          placeholderTextColor = '#808080'
          onChangeText = {text => this.setState({password:text})}
        />
        </View>
        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signText}>SIGN UP</Text>
        </TouchableOpacity>
          <Text style ={styles.already}>Already have an Account?</Text>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>SIGN IN</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    
    </View>
   </ImageBackground> 
  
    
  );
  }



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
   
  },

  background:{
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: 'stretch', // or 'stretch',
    justifyContent: 'center',

  },

  logo:{
    fontSize: 45,
    color: '#000000',
    marginBottom: 40,
    textAlign: "center"
  },
  inputView:{
    width:"70%",
    backgroundColor:"#FFFFFF",
    borderRadius:7,
    borderWidth: 1,
    height:45,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },

  inputText:{
    height: 50,
    color: "black",
    fontSize: 11
  },
  already:{
    color: "black",
    fontSize:12,
    marginTop: 20,
    marginBottom: -15
  },

  signupBtn:{
    width: "50%",
    backgroundColor: "#6b3f87",
    borderRadius: 10,
    height: 50,
    alignItems:"center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 10
    

  },

  signText:{
    color:"white",
    fontWeight: "bold",
    fontSize: 16,

  },

  loginBtn:{
    width: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 50,
    alignItems:"center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 10,
    borderBottomWidth:2,
    borderTopWidth:2,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderTopColor:"#6b3f87",
    borderRightColor:"#6b3f87",
    borderLeftColor: "#6b3f87",
    borderBottomColor: "#6b3f87",
  },

  loginText:{
    color: "#6b3f87",
    fontWeight: "bold",
    fontSize: 16,
    fontStyle: "normal"

    
  },
 /* backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
    opacity: 1

 
}*/});
export default SignUpScreen;