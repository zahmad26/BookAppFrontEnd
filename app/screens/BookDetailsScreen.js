import React, { useRef, useState, useEffect, setState, Component } from 'react';
import axios from "axios";
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
    Animated
} from "react-native";
import StarRating from 'react-native-star-rating';

const BookDetailsScreen = () => {
    let starCount = 3.5;


    function onStarRatingPress(rating) {
        starCount = rating
    }


    return (
        <SafeAreaView style={styles.sf}>

            <ScrollView>
                <View style={{
                    backgroundColor: "#3E155A",
                    borderBottomLeftRadius: 45,
                    borderBottomRightRadius: 45,
                }}>
                    <View style={{ marginTop: 56, alignItems: "center" }}>

                        <Image
                            style={styles.bookImg}
                            source={require("../assets/jane.jpg")}
                        />
                    </View>
                    <Text style={styles.name}>Jane Eyre</Text>
                    <Text style={styles.secname}>Charlotte Bronte</Text>

                    <View style={{ flexDirection: 'row', marginTop: 20 }} >
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', color: 'white', fontSize: 15, fontFamily:'open-sans' }}>         4.3 </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontFamily:'open-sans' }}>2,500</Text>
                        </View>
                        <View style={{ flex: 1 }}>

                            <Text style={{ textAlign: 'right', color: 'white', fontSize: 15, fontFamily:'open-sans' }}>2000       .</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 20 }} >
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', color: '#A397AA', fontSize: 15, fontFamily:'open-sans' }}>      Rating </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', color: '#A397AA', fontSize: 15, fontFamily:'open-sans' }}>Reviews</Text>
                        </View>
                        <View style={{ flex: 1 }}>

                            <Text style={{ textAlign: 'right', color: '#A397AA', fontSize: 15, fontFamily:'open-sans' }}>Pages      .</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.c}>
                    <View style={styles.progressBar}>
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: "#eb5e0b" }]} />
                    </View>
                    <Text style={{ paddingBottom: 20, fontFamily:'open-sans' }}> 100% complete </Text>
                    <TouchableOpacity style={styles.continutebtn}>
                        <Text style={{ color: "white", fontSize: 19,fontFamily:'open-sans' }}>CONTINUE READING</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "black", fontSize: 17, paddingTop: 20, paddingBottom: 15, fontFamily:'open-sans' }}>Rate It</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        starSize={25}
                        rating={4}
                        fullStarColor={'#eb5e0b'}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                    />

                    <Text style={{
                        textAlign: "center",
                        marginTop: 30,
                        fontSize: 16,
                        fontFamily: "open-sans",
                        color: "#6B3F87",
                        paddingBottom:8
                    }}>Description</Text>
                    <Text style={{ paddingRight: 15, paddingLeft: 15, justifyContent: 'center', fontFamily:'open-sans' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam venenatis vulputate libero, id vestibulum ante convallis id.
                          </Text>

                    <Text style={{ paddingTop: 15, color: 'black', fontSize: 17, paddingBottom: 10, fontFamily:'open-sans' }}>Reviews</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 20 }} >
                        <View style={{ flex: 1, paddingLeft: 20 }}>
                            <Image
                                style={styles.profileImg}
                                source={require("../assets/profile.png")}
                            />
                        </View>
                        <View style={{ flex: 1, paddingRight: 200, paddingTop: 2 }}>
                            <TextInput style={styles.input} editable={true} placeholder={"Leave a Review"} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 20 }} >
                        <View style={{ flex: 1, paddingLeft: 20 }}>
                            <Image
                                style={styles.profileImg}
                                source={require("../assets/profile.png")}
                            />
                        </View>
                        <View style={{ flex: 1, paddingRight: 200, paddingTop: 2 }}>
                            <Text style={styles.inp}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Etiam venenatis vulputate libero, id vestibulum ante convallis id.
                          </Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    sf: {
        //backgroundColor: "#3e155a",
    },
    container: {
        // flex: 2,
        backgroundColor: "#3e155a",
        alignItems: "center",
        justifyContent: "center",
    },

    name: {
        marginTop: 24,
        fontSize: 20,
        textAlign: "center",
        color: "#fff",
        fontFamily: "open-sans",
    },
    continutebtn: {
        paddingTop: 15,
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
        fontFamily: 'open-sans'
    },

    secname: {
        marginTop: 15,
        fontSize: 15,
        textAlign: "center",
        color: "#fff",
        fontFamily: "open-sans",
    },
    bookImg: {
        width: 152,
        height: 210,
       // borderRadius: 180,
      },
    bg: {
        width: "100%",
        height: "100%",
        color: "#6b3f87",
        resizeMode: "stretch", // or 'stretch',
        justifyContent: "center",

        // resizeMode: "cover",
        //justifyContent: "center"
    },
    input: {
        height: 50,
        width: 220,
        margin: 12,
        paddingLeft: 6,
        marginBottom: 5,
        borderRadius: 8,
        borderColor: "#A397AA",
        borderWidth: 1, 
        fontFamily:'open-sans'
    },
    inp: {
        height: 80,
        width: 220,
        margin: 12,
        paddingLeft: 6,
        marginBottom: 5,
        fontFamily:'open-sans'

    },
    c: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: 'white',
        padding: 8,
        paddingBottom: 50
    },
    progressBar: {
        flexDirection: 'row',
        height: 10,
        width: '68%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,

    },
    profileImg: {
        marginTop: 14,
        width: 50,
        height: 50,
        borderRadius: 100,
    },
}

);

export default BookDetailsScreen;