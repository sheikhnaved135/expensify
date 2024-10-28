import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    Alert.alert(error);
    console.log(error);
  }
};

const getData = async (key) => {
  try {
    const res = await AsyncStorage.getItem(key);
    if (res != null) {
      return res;
    }
  } catch (error) {
    Alert.alert(error);
    console.log(error);
  }
};

export default { storeData, getData };
