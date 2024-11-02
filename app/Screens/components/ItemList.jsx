import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Linking,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { supabase } from "./../../../utils/SupabaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@/app/redux/categorySlice";
import { useNavigation } from "@react-navigation/native";

const ItemList = ({ categoryList }) => {
  const [itemList, setItemList] = useState(categoryList);
  const { user } = useSelector((store) => store.user);
  const [particular, setParticular] = useState();
  const dispatch = useDispatch();
  // console.log(particular);
  // console.log("itemlist", itemList);
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const imgPreview =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ0eIyC4TIuSzxqaeKpkP0i10b51WABAiktQ&s";
  const handleDeleteItem = async (id) => {
    setLoad(true);
    const { error } = await supabase
      .from("categoryItems")
      .delete()
      .eq("id", id);
    const { data, error: err } = await supabase
      .from("category")
      .select("*,categoryItems(*)")
      .eq("created_by", user.email)
      .order("created_at", { ascending: false });
    dispatch(setCategory(data));
    setLoad(false);
    ToastAndroid.show(`deleted successfully`, ToastAndroid.CENTER);
    navigation.navigate("ExpenseHome");
  };
  return (
    <View style={styles.container}>
      {itemList.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => setParticular(index)}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            ) : (
              <Image style={styles.itemImage} source={{ uri: imgPreview }} />
            )}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>
                {item.name || "No Name Available"}
              </Text>
              <ScrollView>
                <Text style={styles.itemUrl}>
                  {item.url || "No URL Available"}
                </Text>
              </ScrollView>
            </View>
            <Text style={styles.itemCost}>
              {item.cost ? `$${item.cost}` : "N/A"}
            </Text>
            <View style={styles.divider} />
          </TouchableOpacity>

          {particular == index && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
                marginRight: 10,
              }}
            >
              <AntDesign
                name="link"
                size={24}
                color="black"
                onPress={() => {
                  if (item.url) {
                    Linking.openURL(item.url);
                  } else {
                    Alert.alert("No link available");
                  }
                }}
              />
              {load ? (
                <ActivityIndicator />
              ) : (
                <AntDesign
                  name="delete"
                  size={24}
                  color="black"
                  onPress={() => handleDeleteItem(item.id)}
                />
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa", // Light gray background for better contrast
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff", // White background for item
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: "#000", // Soft shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    height: 90,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    objectFit: "contain",
  },
  placeholderImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#e0e0e0", // Light gray for placeholder
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: "#6c757d", // Softer gray for placeholder text
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343a40", // Dark gray for item name
  },
  itemUrl: {
    fontSize: 14,
    color: "#6c757d", // Softer gray for URL
  },
  itemCost: {
    fontSize: 16,
    fontWeight: "600",
    color: "#28a745", // Green color for cost
  },
  divider: {
    height: 1,
    backgroundColor: "#ced4da", // Light gray for divider
    marginTop: 10,
  },
});

export default ItemList;
