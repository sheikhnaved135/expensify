import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import loginImg from "../../../assets/images/loginimg.png";
import { client } from "./../../../utils/KindeConfig";
import Services from "../../../utils/Services";
import { useNavigation } from "@react-navigation/native";
import Lottie from "../components/Lottie";

const Page = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoad(true);
      const token = await client.login();

      if (token) {
        // User was authenticated
        await Services.storeData("login", "true");
        console.log("Data stored successfully");
        navigation.replace("Home");
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.LONG);
        navigation.navigate("Page");
      }
    } catch (error) {
      // Suppress the specific error message you want to ignore
      if (error.message == "dismiss") {
        ToastAndroid.show("Error while logging in", ToastAndroid.LONG);
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      {load ? (
        <Lottie item="login" />
      ) : (
        <View style={{ display: "flex", alignItems: "center" }}>
          <Image style={styles.bgImage} source={loginImg} resizeMode="cover" />
          <View style={styles.bgContainer}>
            <Text style={styles.txtStyle}>Personal Budget Planner</Text>
            <Text style={styles.txtStyle2}>
              Stay on Track, Event by Event: Your Personal Budget Planner App!
            </Text>
            <TouchableOpacity style={styles.btnStyle} onPress={handleSignIn}>
              <Text style={styles.btnTxt}>Login / Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: 400,
    width: 200,
    marginTop: 30,
    borderRadius: 20,
    borderColor: "black",
  },
  bgContainer: {
    backgroundColor: "#9d4edd",
    width: "100%",
    height: "100%",
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -60,
  },
  txtStyle: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  txtStyle2: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "white",
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

export default Page;
