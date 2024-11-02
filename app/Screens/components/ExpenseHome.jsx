import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import Header from "./Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import CircularChart from "./CircularChart";
import { useNavigation } from "expo-router";
import CategoryList from "./CategoryList";
import { useDispatch, useSelector } from "react-redux";

// import { getAllCategory } from "@/app/hooks/getAllCategory";
import { client } from "./../../../utils/KindeConfig";
import { setUser } from "@/app/redux/userSlice";
import { supabase } from "./../../../utils/SupabaseConfig";
import { setCategory } from "@/app/redux/categorySlice";

const ExpenseHome = () => {
  const [load, setLoad] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);
  const dispatch = useDispatch();
  const getallcategory = async () => {
    setLoad(true);
    const user = await client.getUserDetails();
    dispatch(setUser(user));

    // console.log("expense home user", user);
    const { data, error } = await supabase
      .from("category")
      .select("*,categoryItems(*)")
      .eq("created_by", user.email)
      .order("id", { ascending: false });
    if (data) {
      // setCategory(data);
      dispatch(setCategory(data));
    }
    setLoad(false);
  };
  useEffect(() => {
    getallcategory();
    let total = 0;
    category?.forEach((item) => (total += item.assigned_budget));
    setTotalBudget(total);
  }, []);

  const navigation = useNavigation();
  const { user } = useSelector((store) => store.user);
  const { category } = useSelector((store) => store.category);
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
        <CircularChart category={category} />
      </View>
      <View style={{ flex: 1, marginTop: 50, padding: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "800", fontSize: 22 }}
          >
            Category List
          </Text>
          <Text
            style={{ textAlign: "center", fontWeight: "800", fontSize: 22 }}
          >
            ${totalBudget}
          </Text>
        </View>
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
});
export default ExpenseHome;
