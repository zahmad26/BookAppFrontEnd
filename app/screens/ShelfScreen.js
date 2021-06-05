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
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import axios from "axios";
import ip from "../config";

const ShelfScreen = (props) => {
  const { navigation } = props;
  const screenProps = props.route.params.data.route.params.data.route.params;
  const token = screenProps.token;
  const [data, setData] = useState();
  const [favourites, setFavorites] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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
          autoplay={false}
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

      <FlatList
        style={{ marginLeft: 24, marginRight: 24 }}
        showsVerticalScrollIndicator={false}
        data={favourites}
        extraData={selectedId}
        renderItem={({ item, index }) => {
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
  },
  wrapper: {
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
