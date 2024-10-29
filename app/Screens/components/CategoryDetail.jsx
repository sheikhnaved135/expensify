import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "./../../../utils/SupabaseConfig";
import { setCategory } from "@/app/redux/categorySlice";

const CategoryDetail = () => {
  const { category } = useSelector((store) => store.category);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const route = useRoute();
  const { categoryId } = route.params;
  const [modal, setModal] = useState(false);
  const [myCategory, setMyCategory] = useState();
  const [total, setTotal] = useState(0);
  const [percent, setPercent] = useState(0);
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const res = category.find((item) => item.id === categoryId);
    setMyCategory(res);
    console.log(myCategory);
  }, [category, categoryId]);

  useEffect(() => {
    let val = 0;
    myCategory?.categoryItems.forEach((item) => (val += item.cost));
    setTotal(val);
    setPercent((val / myCategory?.assigned_budget) * 100);
  }, [myCategory]);

  const handleDelete = async () => {
    setLoad(true);
    const { error } = await supabase
      .from("category")
      .delete()
      .eq("id", myCategory.id);

    const { data } = await supabase
      .from("category")
      .select("*,categoryItems(*)")
      .eq("created_by", user.email)
      .order("created_at", { ascending: false });
    dispatch(setCategory(data));
    ToastAndroid.show("Category deleted", ToastAndroid.BOTTOM);
    navigation.navigate("ExpenseHome");
    setLoad(false);
  };

  return myCategory ? (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconBackground,
              { backgroundColor: myCategory.color },
            ]}
          >
            <Text style={styles.iconText}>{myCategory.icon}</Text>
          </View>
          <View>
            <Text style={styles.categoryName}>{myCategory.name}</Text>
            <Text style={styles.itemCount}>
              {myCategory.categoryItems.length}{" "}
              {myCategory.categoryItems.length === 1 ? "Item" : "Items"}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModal(true)}>
          <AntDesign
            name="delete"
            size={24}
            color="red"
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.budgetText}>
        Budget: ${myCategory?.assigned_budget}
      </Text>

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.progressText}>{Math.round(percent)}%</Text>
      <View style={{ marginTop: 20 }}>
        <ItemList categoryList={myCategory?.categoryItems} />
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add-circle" size={50} color="black" />
      </TouchableOpacity>

      {/* Delete confirmation modal */}
      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this category?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.yesButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>
                  {load ? <ActivityIndicator color={"black"} /> : "Yes"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color="red" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  categoryName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  itemCount: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
  },
  deleteIcon: {
    marginRight: 8,
  },
  budgetText: {
    fontWeight: "700",
    marginBottom: 10,
  },
  progressBarBackground: {
    backgroundColor: "#e0e0e0",
    height: 20,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
  },
  progressBarFill: {
    backgroundColor: "#6200ea",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  progressText: {
    fontWeight: "700",
    color: "#6200ea",
    textAlign: "center",
  },
  addBtn: {
    position: "absolute",
    bottom: 18,
    right: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  yesButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CategoryDetail;
