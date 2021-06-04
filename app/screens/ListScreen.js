import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ip from "../config";

const ListScreen = (props) => {
  const screenProps = props.route.params;
  //console.log(screenProps);
  const catID = screenProps.id;
  const catName = screenProps.cname;
  const token = screenProps.token;
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://${ip}:5000/api/books/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("get all books", res.data.books);
        if (res.data) {
          //setData(res.data.books);
          let catBooks = res.data.books.filter((book) => {
            return book.category === catName;
          });
          setData(catBooks);
          //console.log("data array:", data);
        } else {
          console.log("Could not get data");
        }
      })
      .catch((err) => {
        console.log("get books failed", err);
      });
  }, []);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", paddingTop: 20, paddingBottom: 20 }}>
        <Text style={styles.heading}>{catName}</Text>
      </View>
      <FlatList
        style={{ marginLeft: 24, marginRight: 24 }}
        showsVerticalScrollIndicator={false}
        data={data}
        // keyExtractor={(i) => i.id}
        extraData={selectedId}
        renderItem={({ item, index }) => {
          // console.log(i);
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
                marginLeft: 9,
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
                <Image
                  style={styles.listedBook}
                  source={{
                    uri: item.url,
                  }}
                />
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
                    {item.totalRatings} ratings
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
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontFamily: "playfair-display",
    marginLeft: 24,
    marginTop: 32,
    textAlign: "center",
  },
  listedBook: {
    borderRadius: 8,
    width: 85,
    height: 123,
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
});

export default ListScreen;
