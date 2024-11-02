import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { colors } from "./../utils/colors";
import Ionicons from "react-native-vector-icons/Ionicons"; // Make sure to install this package
import { supabase } from "../utils/SupabaseConfig";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "./redux/categorySlice";
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
const AddNewCategoryModal = () => {
  const [color, setColor] = useState("gray");
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedText, setSelectedText] = useState();
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const { category } = useSelector((store) => store.category);
  const { user } = useSelector((store) => store.user);
  const dipatch = useDispatch();
  const handleCreate = async () => {
    Keyboard.dismiss();
    setLoad(true);
    try {
      const { data, error } = await supabase
        .from("category")
        .insert({
          name: categoryName,
          icon: selectedText,
          color: color,
          assigned_budget: budget,
          created_by: user?.email,
        })
        .select();

      if (data) {
        const { data, error } = await supabase
          .from("category")
          .select("*,categoryItems(*)")
          .eq("created_by", user.email)
          .order("id", { ascending: false });
        // console.log("created category", data);
        dipatch(setCategory(data));
        setCategoryName("");
        setBudget("");
        setSelectedText("");
        ToastAndroid.show("Category created", ToastAndroid.BOTTOM);
        // navigation.replace("categoryDetail", { categoryId: data[0].id });
        navigation.navigate("ExpenseHome");
      }
      setLoad(false);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Something went wrong", ToastAndroid.BOTTOM);
      setLoad(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            style={[styles.emInput, { backgroundColor: color }]}
            maxLength={2}
            cursorColor={"black"}
            onChangeText={setSelectedText}
            value={selectedText}
            autoFocus
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="pricetag"
            size={20}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            style={[styles.txtInput, { backgroundColor: color }]}
            placeholder="Category Name"
            placeholderTextColor="black"
            value={categoryName}
            onChangeText={setCategoryName}
            cursorColor={"black"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="cash" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={[styles.txtInput, { backgroundColor: color }]}
            placeholder="Budget"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
            cursorColor={"black"}
          />
        </View>
        <View style={styles.colorContainer}>
          {colors.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.colorButton,
                { backgroundColor: item },
                color === item && styles.selectedButton,
              ]}
              onPress={() => setColor(item)}
            />
          ))}
        </View>
        <TouchableOpacity
          disabled={
            categoryName.trim() === "" || budget.trim() === "" ? true : false
          }
          style={styles.createButton}
          onPress={handleCreate}
        >
          <Text style={styles.createButtonText}>
            {!load ? "Create" : <ActivityIndicator color={"white"} />}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 20,
    width: "90%", // Make it responsive
  },
  emInput: {
    padding: 20,
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 30,
    fontSize: 25,
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  txtInput: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 25,
    color: "black",
  },
  icon: {
    marginRight: 10,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 20,
    width: "100%",
  },
  colorButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 5,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: "black",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddNewCategoryModal;
