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
import Dracula from "../assets/dracula.png";
import Huck from "../assets/huck.png";
import Oliver from "../assets/oliver-t.png";
import axios from "axios";
import ip from "../config";

const AuthorScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(books);
  //console.log("ID", props.route.params);
  const [author, setAuthor] = useState([]);
  const [aBooks, setBooks] = useState([]);
  let authorName = "Anne Doe";
  let authorRating = "4.3";
  let totalRatings = "500";
  let numOfBooks = "15";
  useEffect(() => {
    getAuthor();
  }, []);
  
  const getAuthor = async () => {
    await axios
      .get(`http://${ip}:5000/api/authors/${props.route.params.id}`, {
        headers: { Authorization: `Bearer ${props.route.params.token}` },
      })
      .then((res) => {
        //console.log("author", res.data.author);
        if (res.data.author) {
          console.log("author", res.data.author);
          setAuthor(res.data.author);
          getBooks();
        } else {
          console.log("Could not get data");
        }
      });
  };

  const getBooks = async () => {
    await axios
      .get(`http://${ip}:5000/api/books/`, {
        headers: { Authorization: `Bearer ${props.route.params.token}` },
      })
      .then((res) => {
        //console.log("author", res.data.author);
        if (res.data.books) {
          //console.log("books", res.data.books);
          setBooks(
            res.data.books.filter((book) => {
              if (book.authorID == author._id) return book;
            })
          );
          //console.log("author books",aBooks)
        } else {
          console.log("Could not get data");
        }
      });
  };
  var books = [
    {
      id: "1",
      name: "Dracula",
      url: Dracula,
      author: "Bram Stoker",
      rating: "4.2",
      totalRatings: "8,750",
      favourite: true,
    },
    {
      id: "2",
      name: "Huck",
      url: Huck,
      author: "Mark Twain",
      rating: "4.3",
      totalRatings: "3,530",
      favourite: false,
    },
    {
      id: "3",
      name: "Oliver Twist",
      url: Oliver,
      author: "Charles Dickens",
      rating: "4.7",
      totalRatings: "2,357",
      favourite: true,
    },
    {
      id: "4",
      name: "Dracula",
      url: Dracula,
      author: "Bram Stoker",
      rating: "4.2",
      totalRatings: "8,750",
      favourite: true,
    },

    {
      id: "5",
      name: "Huck",
      url: Huck,
      author: "Mark Twain",
      rating: "4.3",
      totalRatings: "3,530",
      favourite: false,
    },
    {
      id: "6",
      name: "Oliver",
      url: Oliver,
      author: "Charles Dickens",
      rating: "4.7",
      totalRatings: "2,357",
      favourite: false,
    },
  ];

  const favoriteHandler = (item) => {
    console.log("I am pressed");
    console.log("Item", item);

    const updatedBooks = books.map((book) => {
      if (book.id === item.id) {
        console.log("here");
        book.favourite = !book.favourite;
        console.log("Updated", item);
      }
      return book;
    });

    setData(updatedBooks);
  };
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
              <Text style={styles.details}>Rating</Text>
            </View>
            <View>
              <Text style={styles.details}>{totalRatings}</Text>
              <Text style={styles.details}>Total Ratings</Text>
            </View>
            <View>
              <Text style={styles.details}>{numOfBooks}</Text>
              <Text style={styles.details}>Books</Text>
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
        {aBooks.length > 0 && aBooks.map((item) => {
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
                onPress={() => navigation.navigate("Book Details",{
                  id:item.bookID,
                  token:token
                })}
              >
                <Image style={styles.listedBook} source={{uri:item.url}} />
              </TouchableOpacity>
              <View>
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
                onPress={() => favoriteHandler(item)}
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
});

export default AuthorScreen;
