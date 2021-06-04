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
import Dracula from "../assets/dracula.png";
import Huck from "../assets/huck.png";
import Oliver from "../assets/oliver-t.png";
import author from "../assets/author.jpeg";
import { ScrollView } from "react-native-gesture-handler";
import ip from "../config";
import axios from "axios";

const DiscoverScreen = (props) => {
  const { navigation } = props;
  const screenProps = props.route.params.data.route.params.data.route.params;
  const userId = screenProps.userId;
  const token = screenProps.token;
  const fname = screenProps.fname;
  //console.log(props.route.params.data.route.params.data.route.params);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const discoverHeading = "What will you read\nnext?";

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
      }).catch((err) => {
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
    axios
      .get(`http://${ip}:5000/api/authors/top`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("top authors", res.data.TopAuthors);
        if (res.data) {
          setTopAuthors(res.data.TopAuthors);
        } else {
          console.log("Could not get data");
        }
      })
      .catch((err) => {
        console.log("get top authors failed", err);
      });
  }, []);

  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    //console.log(searchTerm);
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
          <Text style={styles.heading}>{discoverHeading}</Text>
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

        <View style={{ margin: 24, marginBottom: 0 }}>
          <Tab
            disableIndicator="true"
            variant={"default"}
            onChange={(index) => {
              if (index == 0) {
                setData(popular);
              } else if (index == 1) {
                setData(trending);
              } else if (index == 2) {
                setData(latest);
              }
            }}
          >
            <Tab.Item
              title="Top"
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
              title="Trending"
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

        <View style={styles.booksContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(i) => i.bookID}
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
                  <Text style={styles.bookNames}>{item.name}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 24,
              fontFamily: "open-sans",
              marginRight: 180,
            }}
          >
            Top Authors
          </Text>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={32}
            color="black"
          />
        </View>

        <View style={styles.authorsContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={topAuthors}
            keyExtractor={(i) => i._id}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={[
                      styles.explore,
                      {
                        borderRadius: 100,
                        marginBottom: 18,
                        marginRight: 40,
                      },
                    ]}
                    onPress={() =>
                      navigation.navigate("Author", {
                        id: item._id,
                        token: token,
                      })
                    }
                  >
                    <Image
                      style={styles.author}
                      source={{
                        uri: item.url,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
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
    paddingTop: 60
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
    paddingRight: 0,
    paddingLeft: 24,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  authorsContainer: {
    paddingTop: 16,
    paddingRight: 0,
    paddingLeft: 24,
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 24,
  },
  book: {
    borderRadius: 8,
    width: 105,
    height: 168,
  },
  author: {
    borderRadius: 100,
    width: 78,
    height: 78,
    marginRight: 0,
  },
  listedBook: {
    borderRadius: 8,
    width: 75,
    height: 113,
  },
  bookNames: {
    fontFamily: "open-sans",
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

export default DiscoverScreen;
