import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SearchBar, Tab } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import ip from "../config";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = (props) => {
  const [bookData, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { navigation } = props;
  const screenProps = props.route.params.data.route.params.data.route.params;
  //console.log(screenProps);
  const userId = screenProps.userId;
  const token = screenProps.token;
  const fname = screenProps.fname;
  const [categories, setCategories] = useState([]);

  const updateSearch = (term) => {
    if (term) {
      setSearchFilter(
        bookData.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setSearchFilter(bookData);
    }

    setSearchTerm(term);
  };

  const Comp = () => {
    if (searchTerm) {
      //console.log("search filter:", searchFilter);
      return (
        <FlatList
          style={{ marginLeft: 24, marginRight: 24 }}
          showsVerticalScrollIndicator={false}
          data={searchFilter}
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
      );
    } else {
      return (
        <View>
          <View style={{ alignItems: "center", paddingBottom: 20 }}>
            <Text style={styles.secheading}>Genres</Text>
          </View>
          <View style={styles.genresContainer}>
            <FlatList
              numColumns={2}
              alignItems={"center"}
              data={categories}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("List Screen", {
                          id: item._id,
                          cname: item.cname,
                          token: token,
                        })
                      }
                      style={[
                        styles.explore,
                        {
                          height: 100,
                          width: 150,
                          backgroundColor: item.color,
                          marginRight: 10,
                          marginLeft: 10,
                          marginTop: 10,
                          marginBottom: 10,
                          borderRadius: 15,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "open-sans",
                          textAlign: "center",
                          paddingTop: 35,
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        {item.cname}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      );
    }
  };

  useEffect(() => {
    axios
      .get(`http://${ip}:5000/api/books/category`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("categories", res.data.categories);
        if (res.data) {
          setCategories(res.data.categories);
        } else {
          console.log("Could not get data");
        }
      });
    axios
      .get(`http://${ip}:5000/api/books/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("get all books", res.data.books);
        if (res.data) {
          setData(res.data.books);
          setSearchFilter(res.data.books);
        } else {
          console.log("Could not get data");
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Text style={styles.heading}>Find My Book</Text>
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

        <Comp />
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
    marginTop: 30,
  },
  heading: {
    fontSize: 26,
    fontFamily: "playfair-display",
    marginLeft: 24,
  },
  secheading: {
    paddingTop: 20,
    fontSize: 26,
    fontFamily: "open-sans",
    marginLeft: 24,
  },
  searchContainerStyle: {
    backgroundColor: "#fff",
    padding: 5,
    marginRight: 20,
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

  genresContainer: {
    paddingTop: 20,
    paddingRight: 0,
    paddingLeft: 0,
    flexDirection: "row",
  },
  listedBook: {
    borderRadius: 8,
    width: 75,
    height: 113,
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

export default SearchScreen;
