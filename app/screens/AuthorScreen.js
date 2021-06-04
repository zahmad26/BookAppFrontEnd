import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ip from "../config";

const AuthorScreen = (props) => {
  const { navigation } = props;
  //console.log("ID", props.route.params);
  const screenProps = props.route.params;
  const token = screenProps.token;
  const id = screenProps.id;
  const [author, setAuthor] = useState([]);
  const [numOfBooks, setNum] = useState(15);
  const [data, setData] = useState([]);
  let totalRatings = "500";
  useEffect(() => {
    axios
      .get(`http://${ip}:5000/api/books/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("get all books", res.data.books);
        if (res.data) {
          let authBooks = res.data.books.filter((book) => {
            return book.authorID === props.route.params.id;
          });
          setData(authBooks);
          setNum(authBooks.length);
          //console.log("data array:", data);
        } else {
          console.log("Could not get data");
        }
      })
      .catch((err) => {
        console.log("get author books failed", err);
      });
    axios
      .get(`http://${ip}:5000/api/authors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.author) {
          console.log("author", res.data.author);
          setAuthor(res.data.author);
        } else {
          console.log("Could not get data");
        }
      })
      .catch((err) => {
        console.log("get author failed", err);
      });
  }, []);
  // const favoriteHandler = (item) => {
  //   console.log("I am pressed");
  //   console.log("Item", item);

  //   const updatedBooks = books.map((book) => {
  //     if (book.id === item.id) {
  //       console.log("here");
  //       book.favourite = !book.favourite;
  //       console.log("Updated", item);
  //     }
  //     return book;
  //   });

  //   setData(updatedBooks);
  // };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#3E155A",
            borderBottomLeftRadius: 45,
            borderBottomRightRadius: 45,
          }}
        >
          <View style={{ marginTop: 56, alignItems: "center" }}>
            <Image style={styles.profileImg} source={{ uri: author.url }} />
            <Text style={styles.name}>{author.aname}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 24,
            }}
          >
            <View>
              <Text style={styles.details}>{author.rating}</Text>
              <Text style={[styles.details, styles.detailsBottom]}>Rating</Text>
            </View>
            <View>
              <Text style={styles.details}>{totalRatings}</Text>
              <Text style={[styles.details, styles.detailsBottom]}>
                Total Ratings
              </Text>
            </View>
            <View>
              <Text style={styles.details}>{numOfBooks}</Text>
              <Text style={[styles.details, styles.detailsBottom]}>Books</Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 16,
              fontFamily: "open-sans",
              color: "#6B3F87",
            }}
          >
            About the Author
          </Text>
          <Text
            style={{
              margin: 24,

              textAlign: "center",

              marginTop: 16,
            }}
          >
            {author.description}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "open-sans",
              color: "#6B3F87",
            }}
          >
            Books by this Author
          </Text>
        </View>
        {data && data.map((item) => {
            return (
              <View
                key={item.bookID}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 24,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={[styles.explore, { marginRight: 0 }]}
                  onPress={() =>
                    navigation.navigate("Book Details", {
                      id: item.bookID,
                      token: token,
                    })
                  }
                >
                  <Image style={styles.listedBook} source={{ uri: item.url }} />
                </TouchableOpacity>
                <View
                  style={{
                    flexGrow: 1,
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans",
                      fontSize: 12,
                      paddingTop: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "open-sans",
                      fontSize: 12,
                      color: "#9E9E9E",
                      paddingTop: 2,
                    }}
                  >
                    {item.author}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="star-sharp"
                      size={14}
                      color="#EB5E0B"
                      style={{ paddingTop: 6 }}
                    />
                    <Text
                      style={{
                        fontFamily: "open-sans",
                        fontSize: 10,
                        paddingLeft: 5,
                        paddingTop: 8,
                      }}
                    >
                      {item.rating}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "open-sans",
                        fontSize: 10,
                        paddingLeft: 25,
                        paddingTop: 8,
                      }}
                    >
                      10 ratings
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name={item.favourite ? "heart" : "heart-outline"}
                  size={35}
                  color="#3E155A"
                  style={{ marginTop: 8 }}
                  // onPress={() => setSelectedId(item, index)}
                />
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    //justifyContent: "center",
  },
  name: {
    marginTop: 24,
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: "open-sans",
  },
  details: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 14,
    marginBottom: 7,
  },
  profileImg: {
    marginTop: 14,
    width: 152,
    height: 152,
    borderRadius: 100,
  },
  listedBook: {
    borderRadius: 8,
    width: 75,
    height: 113,
  },
  bg: {
    width: "100%",
    height: "100%",
    // flex: 1,
    resizeMode: "stretch", // or 'stretch',
    justifyContent: "center",
  },
  explore: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#6A2898",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 8,
    marginRight: 24,
  },
  detailsBottom: {
    color: "#A397AA",
  },
});

export default AuthorScreen;
