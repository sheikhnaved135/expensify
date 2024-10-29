import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import Header from "./Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import CircularChart from "./CircularChart";
import { Link, useNavigation } from "expo-router";
import CategoryList from "./CategoryList";
import { useSelector } from "react-redux";
import { getAllCategory } from "./../../hooks/getAllCategory";

const ExpenseHome = () => {
  const [load, setLoad] = useState(false);

  getAllCategory(setLoad);

  const navigation = useNavigation();
  const { category } = useSelector((store) => store.category);
  const { user } = useSelector((store) => store.user);
  // console.log("category", category);
  // console.log("user", user);

  if (load) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6A1B9A" />
          <Text>Loading data...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
        <Header userName={user?.given_name} userImage={user?.picture} />
        <CircularChart />
      </View>
      <View style={{ flex: 1, marginTop: 50, padding: 20 }}>
        <Text style={{ textAlign: "center", fontWeight: "800", fontSize: 22 }}>
          Category List
        </Text>
        <CategoryList category={category} />
      </View>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onPress={() => navigation.navigate("add-new-category")}
      >
        <Ionicons name="add-circle" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieStyle: {
    height: 300,
    width: 300,
    marginBottom: 30,
  },
});

export default ExpenseHome;
