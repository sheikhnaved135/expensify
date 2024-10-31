import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAllCategory } from "./../../hooks/getAllCategory";
import { client } from "./../../../utils/KindeConfig";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "./../../../utils/SupabaseConfig";
import { setCategory } from "@/app/redux/categorySlice";

const CategoryList = ({ category }) => {
  const [refreshing, setRefreshing] = useState(false);
  // const { category } = useSelector((store) => store.category);
  const navigation = useNavigation();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleNavigation = (item) => {
    navigation.navigate("categoryDetail", { categoryId: item.id });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {category &&
        category.map((item) => (
          <TouchableOpacity
            style={{ marginTop: 5 }}
            key={item.id}
            activeOpacity={0.9}
            onPress={() => handleNavigation(item)}
          >
            <View style={styles.categoryItem}>
              <View style={styles.leftSection}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Text style={styles.budgetText}>
                    Items: {item?.categoryItems?.length}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.budgetAmount}>${item.assigned_budget}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#f3f4f6",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  budgetText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    right: 10,
  },
});

export default CategoryList;
