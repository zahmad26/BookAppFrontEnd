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

const SearchScreen = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const updateSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        //console.log(searchTerm);
    };
    let genres = [
        {
            id: "1",
            name: "Romance",
            color: "#3E155A"

        },
        {
            id: "2",
            name: "Mystery",
            color: "#d3d3d3"

        },
        {
            id: "3",
            name: "Gothic",
            color: "#ff8f41"

        },
        {
            id: "4",
            name: "Adventure",
            color: "#9b6bb7"

        },
        {
            id: "5",
            name: "Folklore",
            color: "#d3d3d3"

        },
        {
            id: "6",
            name: "Sci-Fi",
            color: "#3e155a"

        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={{ alignItems: 'center', paddingBottom: 20 }}>
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
                <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                    <Text style={styles.secheading}>Genres</Text>
                </View>
                <View style={styles.genresContainer}>
                    <FlatList
                        numColumns={2}
                        alignItems={'center'}
                        data={genres}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View >
                                    <TouchableOpacity onPress={() => props.navigation.navigate("List Screen")}
                                        style={{
                                            height: 100,
                                            width: 150,
                                            backgroundColor: item.color,
                                            marginRight: 10,
                                            marginLeft: 10,
                                            marginTop: 10,
                                            marginBottom: 10,
                                            borderRadius: 15

                                        }}>
                                        <Text style={{ fontFamily: 'open-sans', textAlign: 'center', paddingTop: 35, color: 'white', fontSize: 20 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: "#fff",
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
        fontSize: 16
    },

    genresContainer: {
        paddingTop: 20,
        paddingRight: 0,
        paddingLeft: 0,
        flexDirection: "row",
    },

});


export default SearchScreen;

