import React from "react";
import { SafeAreaView, View, Text } from "react-native";

const BookDetailsScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text>Book Details Screen!</Text>
      </View>
    </SafeAreaView>
  );
};

export default BookDetailsScreen;
