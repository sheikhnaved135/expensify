import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import Services from "../../../utils/Services";
import { useNavigation } from "@react-navigation/native";

const Lottie = ({ item }) => {
  const navigation = useNavigation();
  const checkAuthUser = async () => {
    const result = await Services.getData("login");
    if (result) {
      setTimeout(() => {
        navigation.replace("Home");
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.navigate("Page");
      }, 2000);
    }
    console.log("result", result);
  };
  useEffect(() => {
    checkAuthUser();
  }, []);
  return (
    <View style={styles.container}>
      {item === "login" ? (
        <>
          <LottieView
            source={require("../../../assets/images/Animation - 1728283654618.json")}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
          <View style={styles.redirectContainer}>
            <Text style={styles.textstyle}>Redirecting...</Text>
            <ActivityIndicator
              size="small"
              color="#ff9e00"
              style={styles.indicator}
            />
          </View>
        </>
      ) : (
        <LottieView
          source={require("../../../assets/images/logout.json")}
          autoPlay
          loop
          style={styles.lottieStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Light background for better contrast
    padding: 20, // Add padding to avoid edge touch
  },
  lottieStyle: {
    height: 300, // Adjusted height for a better fit
    width: 300, // Adjusted width for a better fit
    marginBottom: 30, // Spacing between animation and text
  },
  redirectContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff", // White background for the text container
    padding: 15, // Added padding
    borderRadius: 10, // Rounded corners for a modern look
    shadowColor: "#000", // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  indicator: {
    marginLeft: 10,
  },
  textstyle: {
    fontSize: 20, // Increased font size for visibility
    fontWeight: "600",
    color: "#333", // Darker color for better readability
  },
});

export default Lottie;
