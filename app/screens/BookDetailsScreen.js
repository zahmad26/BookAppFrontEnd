import React, { useState, useEffect, setState, Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import StarRating from "react-native-star-rating";
import ip from "../config";
import { FontAwesome } from "@expo/vector-icons";

const BookDetailsScreen = (props) => {
  const screenProps = props.route.params;
  const [id, setID] = useState(screenProps.id);
  const [token, setToken] = useState(screenProps.token);
  const [book, setBook] = useState({});
  const [isFavorite, setFavorite] = useState(false);
  let starCount = 3.5;

  useEffect(() => {
    axios
      .get(`http://${ip}:5000/api/books/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.header.error == 0) {
          if (
            res.data.body.favourites.filter((book) => book.bookID === id)
              .length === 1
          ) {
            setFavorite(true);
          } else {
            setFavorite(false);
          }
        } else {
          console.log("Could not get data", res.data.header.message);
        }
      })
      .catch((err) => {
        console.log("get favorites failed", err);
      });
    axios
      .get(`http://${ip}:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("book", res.data.book);
        if (res.data.book) {
          //console.log(res.data.book);
          setBook(res.data.book);
        } else {
          console.log("Could not get data");
        }
      })
      .catch((err) => {
        console.log("get book failed", err);
      });
  }, []);

  function onStarRatingPress(rating) {
    starCount = rating;
  }
  const favoriteHandler = (isFav) => {
    isFav
      ? axios
          .put(
            `http://${ip}:5000/api/books/favourites/remove`,
            { id: id },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            //console.log("remove fav data", res.data);
            if (res.data.header.error == 0) {
              setFavorite(false);
            } else {
              console.log(res.data.header.message);
            }
          })
          .catch((err) => {
            console.log("remove fav failed", err);
          })
      : axios
          .put(
            `http://${ip}:5000/api/books/favourites/add`,
            { id: id },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            //console.log("add fav data", res.data);
            if (res.data.header.error == 0) {
              setFavorite(true);
            } else {
              console.log(res.data.header.message);
            }
          })
          .catch((err) => {
            console.log("add fav failed", err);
          });
  };

  return (
    <SafeAreaView style={styles.sf}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#3E155A",
            borderBottomLeftRadius: 45,
            borderBottomRightRadius: 45,
          }}
        >
          <View
            style={{
              marginTop: 56,
              flex: 1,
              flexDirection: "row",
              // alignItems: "center",
            }}
          >
            <View style={styles.imgContainer}>
              <Image style={styles.bookImg} source={{ uri: book.url }} />
            </View>
            <View style={styles.bookmarkContainer}>
              {isFavorite ? (
                <TouchableOpacity
                  onPress={() => {
                    //console.log("unfav button pressed");
                    favoriteHandler(isFavorite);
                  }}
                >
                  <FontAwesome
                    name="bookmark"
                    size={40}
                    color="white"
                    style={{ alignSelf: "auto", marginLeft: 10 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    //console.log("fav button pressed");
                    favoriteHandler(isFavorite);
                  }}
                >
                  <FontAwesome
                    name="bookmark-o"
                    size={40}
                    color="white"
                    style={{ alignSelf: "auto", marginLeft: 10 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={styles.name}>{book.title}</Text>

          <Text style={styles.secname}>{book.author}</Text>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "white",
                  fontSize: 15,
                  fontFamily: "open-sans",
                  paddingLeft: 62,
                }}
              >
                {book.rating}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontFamily: "open-sans",
                }}
              >
                0
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "right",
                  color: "white",
                  fontSize: 15,
                  fontFamily: "open-sans",
                  paddingRight: 50,
                }}
              >
                300
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 5, marginBottom: 20 }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#A397AA",
                  fontSize: 15,
                  fontFamily: "open-sans",
                  paddingLeft: 43,
                }}
              >
                {" "}
                Rating{" "}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#A397AA",
                  fontSize: 15,
                  fontFamily: "open-sans",
                }}
              >
                Reviews
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "right",
                  color: "#A397AA",
                  fontSize: 15,
                  fontFamily: "open-sans",
                  paddingRight: 43,
                }}
              >
                Pages
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.c}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontFamily: "open-sans",
              color: "#6B3F87",
              paddingBottom: 8,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              paddingRight: 15,
              paddingLeft: 15,
              justifyContent: "center",
              fontFamily: "open-sans",
              textAlign: "center",
              color: "#000",
            }}
          >
            {book.description}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 17,
              paddingTop: 20,
              paddingBottom: 15,
              fontFamily: "open-sans",
              color: "#6B3F87",
            }}
          >
            Rate It
          </Text>
          <StarRating
            disabled={false}
            maxStars={5}
            starSize={25}
            rating={4}
            fullStarColor={"#eb5e0b"}
            selectedStar={(rating) => onStarRatingPress(rating)}
          />
          <Text
            style={{
              paddingTop: 15,
              color: "black",
              fontSize: 17,
              paddingBottom: 10,
              fontFamily: "open-sans",
              color: "#6B3F87",
            }}
          >
            Reviews
          </Text>
          <View
            style={{ flexDirection: "row", marginTop: 5, marginBottom: 20 }}
          >
            <View style={{ flex: 1, paddingLeft: 20 }}>
              <Image
                style={styles.profileImg}
                source={require("../assets/profile.png")}
              />
            </View>
            <View style={{ flex: 1, paddingRight: 200, paddingTop: 2 }}>
              <TextInput
                style={styles.input}
                editable={true}
                placeholder={"Leave a Review"}
              />
            </View>
          </View>

          <View
            style={{ flexDirection: "row", marginTop: 5, marginBottom: 20 }}
          >
            <View style={{ flex: 1, paddingLeft: 20 }}>
              <Image
                style={styles.profileImg}
                source={require("../assets/profile.png")}
              />
            </View>
            <View style={{ flex: 1, paddingRight: 200, paddingTop: 2 }}>
              <Text style={styles.inp}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                venenatis vulputate libero, id vestibulum ante convallis id.
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
  imgContainer: {
    flex: 0.8,
    alignSelf: "center",
    paddingLeft: "30%",
  },
  bookmarkContainer: {
    flex: 0.2,
    paddingRight: "9%",
  },
  name: {
    marginTop: 24,
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: "open-sans",
    marginLeft: 24,
    marginRight: 24,
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
    fontFamily: "open-sans",
  },

  secname: {
    marginTop: 15,
    fontSize: 17,
    textAlign: "center",
    color: "#fff",
    fontFamily: "open-sans",
  },
  bookImg: {
    borderRadius: 8,
    width: 146,
    height: 233,
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
    fontFamily: "open-sans",
  },
  inp: {
    height: 80,
    width: 220,
    margin: 12,
    paddingLeft: 6,
    marginBottom: 5,
    fontFamily: "open-sans",
  },
  c: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "white",
    padding: 8,
    paddingBottom: 50,
  },
  progressBar: {
    flexDirection: "row",
    height: 10,
    width: "68%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
  profileImg: {
    marginTop: 14,
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

export default BookDetailsScreen;
