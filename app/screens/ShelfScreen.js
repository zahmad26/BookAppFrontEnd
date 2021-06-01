import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Tab } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import Dracula from "../assets/dracula.png";
import Huck from "../assets/huck.png";
import Oliver from "../assets/oliver-t.png";

const ShelfScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(books);
  const [selectedId, setSelectedId] = useState(null);
  let books = [
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
  let shelfBooks = [
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
      <View
        style={{
          //backgroundColor: "#86469C",
          height: 320,
          marginTop: 60,
          marginRight: 24,
          marginLeft: 24,
        }}
      >
        <Text style={styles.heading}>My Shelf</Text>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          height={250}
          autoplay={true}
          containerStyle={{
            marginTop: 20,
            //backgroundColor: "#86469C",
          }}
          showsPagination={false}
          nextButton={<Text style={styles.buttonText}>›</Text>}
          prevButton={<Text style={styles.buttonText}>‹</Text>}
        >
          {shelfBooks.map((item) => {
            return (
              <View style={styles.slide} key={item.id}>
                <TouchableOpacity
                  style={styles.explore}
                  onPress={() => navigation.navigate("Book Details")}
                >
                  <Image style={styles.book} source={item.url} />
                </TouchableOpacity>
              </View>
            );
          })}
        </Swiper>
      </View>
      <View style={{ margin: 24, marginTop: 32 }}>
        <Tab
          indicatorStyle={{
            backgroundColor: "#EB5E0B",
            width: 65,
            marginLeft: 7,
          }}
          variant={"default"}
        >
          <Tab.Item
            title="All"
            value="0"
            buttonStyle={{
              backgroundColor: "#3E155A",
              color: "#fff",
              padding: 5,
              paddingRight: 0,
              paddingLeft: 0,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            titleStyle={styles.tabTitle}
          />
          <Tab.Item
            title="Mystery"
            value="1"
            buttonStyle={{
              backgroundColor: "#3E155A",
              color: "#fff",
              padding: 5,
              paddingRight: 0,
              paddingLeft: 0,
            }}
            titleStyle={styles.tabTitle}
          />
          <Tab.Item
            title="Horror"
            value="2"
            buttonStyle={{
              backgroundColor: "#3E155A",
              color: "#fff",
              padding: 5,
              paddingRight: 0,
              paddingLeft: 0,
            }}
            titleStyle={styles.tabTitle}
          />
          <Tab.Item
            title="Sci-fi"
            value="2"
            buttonStyle={{
              backgroundColor: "#3E155A",
              color: "#fff",
              padding: 5,
              paddingRight: 0,
              paddingLeft: 0,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
            titleStyle={styles.tabTitle}
          />
        </Tab>
      </View>

      <FlatList
        style={{ marginLeft: 24, marginRight: 24 }}
        showsVerticalScrollIndicator={false}
        data={books}
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
              }}
            >
              <TouchableOpacity
                style={[styles.explore, { marginRight: 0, marginLeft: 10 }]}
                onPress={() => navigation.navigate("Book Details")}
              >
                <Image style={styles.listedBook} source={item.url} />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontFamily: "open-sans",
                    fontSize: 12,
                    paddingTop: 10,
                  }}
                >
                  {item.name}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //  alignItems: "center",
    // justifyContent: "center",
  },
  wrapper: {
    //backgroundColor: "#BCE7EA",
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  book: {
    borderRadius: 8,
    width: 146,
    height: 233,
  },
  heading: {
    fontSize: 26,
    fontFamily: "playfair-display",
    textAlign: "center",
  },
  explore: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#6A2898",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 8,
  },
  tabTitle: {
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 11,
    textTransform: "capitalize",
  },
  listedBook: {
    borderRadius: 8,
    width: 75,
    height: 113,
  },
  buttonText: {
    color: "#6B3F87",
    fontSize: 60,
  },
});

export default ShelfScreen;
