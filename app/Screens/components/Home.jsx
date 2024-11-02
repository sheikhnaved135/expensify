import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ExpenseHome from "./ExpenseHome";
import Profile from "./Profile";
import History from "./History";
import Icon from "react-native-vector-icons/Ionicons"; // Ensure you're using this import
import FontAwesome from "./../../../node_modules/@expo/vector-icons/FontAwesome";
import MaterialIcons from "./../../../node_modules/@expo/vector-icons/MaterialIcons";

const Home = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);

  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#9d4edd" }}>
        <Tab.Screen
          name="ExpenseHome"
          component={ExpenseHome}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Icon
                name={focused ? "home" : "home-outline"} // Use filled icon if focused
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <FontAwesome name="history" size={24} color="purple" />
              ) : (
                <MaterialIcons name="history" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon
                name={focused ? "person" : "person-outline"} // Use filled icon if focused
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#ff9e00",
    padding: 13,
    marginTop: 20,
    borderRadius: 20,
  },
  btnTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Home;
