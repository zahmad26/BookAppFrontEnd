import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";

const APITestScreen = () => {
  const [response, setResponse] = useState(null);

  //This works only the 1st time user navigates to this screen
  useEffect(() => {
    getBooksFromApi();
  }, []);

  const getBooksFromApi = () => {
    console.log("API Call Working");
    axios
      .get(`https://03e9d68e-7e98-4e01-9483-35b51f026287.mock.pstmn.io/books`)
      .then((res) => {
        console.log(res);
        const books = res.data.body.bookList;
        setResponse(books);
      });
  };
  // export const login = (body) => {
  //   try {
  //     console.log('in Login', body);
  //     let response = await axios.post(`http://localhost:5000/api/users/login`, body);
  //     console.log('response', response.data);
  
  //     return response.data.result;
  //   } catch (error) {
  //     if (error?.response?.data?.result) {
  //       console.log('error123 signin : ', error.response.data);
  //       return { error: error.response.data.result };
  //     }
  //   }
  // };
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.description} />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={response}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default APITestScreen;
