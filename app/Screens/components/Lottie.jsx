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
      }, 500);
    } else {
      setTimeout(() => {
        navigation.navigate("Page");
      }, 1000);
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
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  lottieStyle: {
    height: 300,
    width: 300,
    marginBottom: 30,
  },
  redirectContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  indicator: {
    marginLeft: 10,
  },
  textstyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
});

export default Lottie;
