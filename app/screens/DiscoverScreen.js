import React, { useState } from "react";
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

const DiscoverScreen = (props) => {
  const { navigation } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const discoverHeading = "What will you read\nnext?";
  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    //console.log(searchTerm);
  };
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
      name: "Oliver Twist",
      url: Oliver,
      author: "Charles Dickens",
      rating: "4.7",
      totalRatings: "2,357",
      favourite: false,
    },
  ];

  let authors = [
    {
      id: "1",
      url: author,
      name: "halsey",
    },
    {
      id: "2",
      url: author,
      name: "halsey",
    },
    {
      id: "3",
      url: author,
      name: "halsey",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style = {styles.container}>
      <View style={styles.headingAndImgContainer}>
        <Image
          style={styles.profileImg}
          source={require("../assets/profile-img.jpg")}
        />
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
          indicatorStyle={{
            backgroundColor: "#EB5E0B",
            width: 96,
            marginLeft: 7,
          }}
          variant={"default"}
        >
          <Tab.Item
            title="Top"
            value="0"
            buttonStyle={{
              backgroundColor: "#3E155A",
              color: "#fff",
              padding: 5,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            titleStyle={styles.tabTitle}
          />
          <Tab.Item
            title="Trending"
            value="1"
            buttonStyle={{
              backgroundColor: "#3E155A",
              color: "#fff",
              padding: 5,
            }}
            titleStyle={styles.tabTitle}
          />
          <Tab.Item
            title="Latest"
            value="2"
            buttonStyle={{
              backgroundColor: "#3E155A",
              color: "#fff",
              padding: 5,
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
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Book Details")}
                >
                  <Image style={styles.book} source={item.url} />
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
          data={authors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate("Author")}>
                  <Image style={styles.author} source={item.url} />
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
    marginRight: 24,
  },
  author: {
    borderRadius: 100,
    width: 78,
    height: 78,
    marginRight: 40,
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
    fontSize: 14,
    textTransform: "capitalize",
  },
});

export default DiscoverScreen;
