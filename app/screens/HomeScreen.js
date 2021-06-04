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
import { SearchBar, Tab } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import ip from "../config";

const HomeScreen = (props) => {
  const { navigation } = props;
  const screenProps = props.route.params.props.route.params.data.route.params;
  const userId = screenProps.userId;
  const token = screenProps.token;
  const fname = screenProps.fname;

  //console.log("hello", userId, token);

  //let welcomeMessage = `Good Afternoon, \n${fname}`;
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [favourites, setFavorites] = useState([]);
  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [greeting, setGreeting] = useState("");
  let hour;
  // const [isfavorite, setFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(`http://${ip}:5000/api/books/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("latest",res.data.latest);
        if (res.data) {
          setLatest(res.data.latest);
        } else {
          console.log("Could not get data");
        }
      })
      .catch((err) => {
        console.log("get latest failed", err);
      });
    axios
      .get(`http://${ip}:5000/api/books/trending`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("trending",res.data.trending);
        if (res.data) {
          setTrending(res.data.trending);
          setData(res.data.trending);
        } else {
          console.log("Could not get data");
        }
      })
      .catch((err) => {
        console.log("get trending failed", err);
      });
    axios
      .get(`http://${ip}:5000/api/books/popular`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("popular",res.data.popular);
        if (res.data) {
          setPopular(res.data.popular);
        } else {
          console.log("Could not get data");
        }
      })
      .catch((err) => {
        console.log("get popular failed", err);
      });
    hour = new Date().getHours();
    if (hour < 12) setGreeting(`Good Morning, \n${fname}`);
    else if (hour < 18) setGreeting(`Good Afternoon, \n${fname}`);
    else setGreeting(`Good Evening, \n${fname}`);

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

  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    //console.log(searchTerm);
  };

  // const favoriteHandler = (item, index) => {
  //   let arr = [...data];
  //   arr[index].favorite = item.favorite === true ? false : true;
  //   this.setState({ dataSource: arr });
  // };

  const favoriteHandler = (item) => {
    console.log("item pressed", item);
    item.isFavourite
      ? axios
          .put(`http://${ip}:5000/api/books/favourites/remove`, item.bookID, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("remove fav", res.data.body);
          })
          .catch((err) => {
            console.log(res.data.header.message, err);
          })
      : axios
          .put(`http://${ip}:5000/api/books/favourites/add`, item.bookID, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("add fav", res.data.body);
          })
          .catch((err) => {
            console.log(res.data.header.message, err);
          });
    // console.log("I am pressed");
    // console.log("Item", item);

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
      <ScrollView style={styles.container}>
        <View style={styles.headingAndImgContainer}>
          <TouchableOpacity
            style={[
              styles.explore,
              {
                borderRadius: 100,
                marginRight: 0,
                marginBottom: 12,
                marginLeft: 0,
              },
            ]}
          >
            <Image
              style={styles.profileImg}
              source={require("../assets/prof.jpg")}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>{greeting}</Text>
        </View>
        <SearchBar
          placeholder="Search..."
          onChangeText={updateSearch}
          value={searchTerm}
          containerStyle={styles.searchContainerStyle}
          inputContainerStyle={styles.searchInputContainerStyle}
          lightTheme={true}
          inputStyle={styles.searchInputStyle}
        />
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <Text
            style={{
              fontSize: 22,
              paddingLeft: 34,
              fontFamily: "playfair-display",
              marginRight: 174,
            }}
          >
            My Books
          </Text>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={32}
            color="black"
          />
        </View>

        <View style={styles.booksContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={favourites}
            keyExtractor={(item) => item.bookID.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity
                    style={styles.explore}
                    onPress={() =>
                      navigation.navigate("Book Details", {
                        id: item.bookID,
                        token: token,
                      })
                    }
                  >
                    <Image
                      style={styles.book}
                      source={{
                        uri: item.url,
                      }}
                    />
                  </TouchableOpacity>

                  <Text style={styles.bookNames}>
                    {item.title.substr(0, 10) + "..."}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View style={{ margin: 24 }}>
          <Tab
            disableIndicator="true"
            variant={"default"}
            onChange={(index) => {
              if (index == 0) {
                setData(trending);
              } else if (index == 1) {
                setData(popular);
              } else if (index == 2) {
                setData(latest);
              }
            }}
          >
            <Tab.Item
              title="Trending"
              value="0"
              buttonStyle={{
                backgroundColor: "#6B3F87",
                color: "#fff",
                padding: 3,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
              titleStyle={styles.tabTitle}
            />
            <Tab.Item
              title="Popular"
              value="1"
              buttonStyle={{
                backgroundColor: "#6B3F87",
                color: "#fff",
                padding: 3,
              }}
              titleStyle={styles.tabTitle}
            />
            <Tab.Item
              title="Latest"
              value="2"
              buttonStyle={{
                backgroundColor: "#6B3F87",
                color: "#fff",
                padding: 3,
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
          data={data}
          keyExtractor={(i) => i.bookID}
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
                  name={item.isFavourite ? "heart" : "heart-outline"}
                  size={35}
                  color="#3E155A"
                  style={{ marginTop: 8 }}
                  // onPress={() => setSelectedId(item, index)}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: "#fff",
  },
  headingAndImgContainer: {
    // backgroundColor: "#8FBC8F",
    flexDirection: "row",

    padding: 24,
    paddingTop: 60,
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  heading: {
    fontSize: 26,
    fontFamily: "playfair-display",
    marginLeft: 24,
  },
  booksContainer: {
    paddingTop: 20,
    paddingRight: 24,
    paddingRight: 0,
    paddingLeft: 24,
    justifyContent: "space-around",
    // backgroundColor: "#A0A0A0",
    flexDirection: "row",
  },
  book: {
    borderRadius: 8,
    width: 95,
    height: 145,
  },
  listedBook: {
    borderRadius: 8,
    width: 85,
    height: 123,
  },
  bookNames: {
    fontFamily: "open-sans",
    marginTop: 5,
  },
  searchContainerStyle: {
    backgroundColor: "#fff",
    padding: 5,
    marginRight: 24,
    marginLeft: 24,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchInputContainerStyle: {
    backgroundColor: "#F8F8F8",
  },
  searchInputStyle: {
    fontFamily: "open-sans",
    fontSize: 16,
  },

  tabTitle: {
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 13,
    textTransform: "capitalize",
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

export default HomeScreen;
