import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView
} from "react-native";
import { SearchBar, Tab } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Dracula from "../assets/dracula.png";
import Huck from "../assets/huck.png";
import Oliver from "../assets/oliver-t.png";


const ListScreen =(props) =>{
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

      const [data, setData] = useState(books);
      const [selectedId, setSelectedId] = useState(null);


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
return(
    <SafeAreaView>
        <View style={{ alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                    <Text style={styles.heading}>Romance</Text>
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
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Book Details")}
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
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 26,
        fontFamily: "playfair-display",
        marginLeft: 24,
    },
     listedBook: {
        borderRadius: 8,
        width: 75,
        height: 113,
      },
      
});

export default ListScreen;