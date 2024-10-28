import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Lottie from "./Lottie";

const Profile = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const handleLogout = async () => {
    setLoad(true);
    await AsyncStorage.clear();
    setTimeout(() => {
      setLoad(false);
      navigation.navigate("Page");
    }, 2000);
  };
  return (
    <>
      {load ? (
        <Lottie item={"logout"} />
      ) : (
        <View>
          <TouchableOpacity style={styles.btnStyle} onPress={handleLogout}>
            <Text style={styles.btnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
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
export default Profile;
