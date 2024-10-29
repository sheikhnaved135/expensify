import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ userName, userImage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: userImage }} style={styles.userImage} />
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationIcon}>
        <Icon name="notifications-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#858ae3",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 150,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderColor: "#fff",
    borderWidth: 2,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  notificationIcon: {
    padding: 10,
    backgroundColor: "#8e24aa", // Slightly darker shade for icon background
    borderRadius: 25,
  },
});

export default Header;
