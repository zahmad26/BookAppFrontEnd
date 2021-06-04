import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import axios from "axios";
import ip from "../config";

const ShelfScreen = (props) => {
  const { navigation } = props;
  const screenProps = props.route.params.data.route.params.data.route.params;
  const token = screenProps.token;
  // console.log("shelf",props.route.params.data.route.params.data.route.params)
  const [data, setData] = useState();
  const [favourites, setFavorites] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  // useEffect(() => {
  //   getFavs();
  // }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavs();
    });
    return unsubscribe;
  }, [navigation]);

  const getFavs = async () => {
    console.log("in get fav");
    await axios
      .get(`http://${ip}:5000/api/books/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("fav", res.data.body.favourites);
        if (res.data.header.error == 0) {
          setFavorites(res.data.body.favourites);
        } else {
          console.log("Could not get data", res.data.header.message);
        }
      })
      .catch((err) => {
        console.log("get fav failed", err);
      });
  };
  const favoriteHandler = (item) => {
    console.log("I am pressed");
    console.log("Item", item);

    // const updatedBooks = books.map((book) => {
    //   if (book.id === item.id) {
    //     console.log("here");
    //     book.favourite = !book.favourite;
    //     console.log("Updated", item);
    //   }
    //   return book;
    // });

    // setData(updatedBooks);
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
          marginBottom: 30,
        }}
      >
        <Text style={styles.heading}>My Shelf</Text>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          height={240}
          autoplay={true}
          containerStyle={{
            marginTop: 20,
            //backgroundColor: "#86469C",
          }}
          showsPagination={false}
          nextButton={<Text style={styles.buttonText}>›</Text>}
          prevButton={<Text style={styles.buttonText}>‹</Text>}
        >
          {favourites.map((item) => {
            return (
              <View style={styles.slide} key={item.bookID}>
                <TouchableOpacity
                  style={styles.explore}
                  onPress={() =>
                    navigation.navigate("Book Details", {
                      id: item.bookID,
                      token: token,
                    })
                  }
                >
                  <Image style={styles.book} source={{ uri: item.url }} />
                </TouchableOpacity>
              </View>
            );
          })}
        </Swiper>
      </View>
      {/* <View style={{ margin: 24, marginTop: 32 }}>
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
      </View> */}

      <FlatList
        style={{ marginLeft: 24, marginRight: 24 }}
        showsVerticalScrollIndicator={false}
        data={favourites}
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
                    {item.totalRatings} ratings
                  </Text>
                </View>
              </View>
              {/* <Ionicons
                name={item.favourite ? "heart" : "heart-outline"}
                size={35}
                color="#3E155A"
                style={{ marginTop: 8 }}
                // onPress={() => setSelectedId(item, index)}
                onPress={() => favoriteHandler(item)}
              /> */}
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
    paddingBottom: 20,
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
    fontSize: 30,
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
    width: 85,
    height: 123,
  },
  buttonText: {
    color: "#6B3F87",
    fontSize: 60,
  },
});

export default ShelfScreen;
