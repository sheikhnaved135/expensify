import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const History = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.shutterstock.com/image-vector/modern-isometric-smart-mobile-app-600nw-1192952944.jpg",
        }} // Replace with your image path
        style={styles.image}
      />
      <Text style={styles.title}>Under Development</Text>
      <Text style={styles.subtitle}>
        We are currently working on this feature. Stay tuned for updates!
      </Text>
      <TouchableOpacity
        style={styles.homebtn}
        onPress={() => navigation.navigate("ExpenseHome")}
      >
        <Text style={styles.homeTxt}>Go to home!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  homebtn: {
    backgroundColor: "lightgreen",
    padding: 20,
    width: "90%",
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 30,
  },
  homeTxt: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    color: "green",
  },
});

export default History;
