import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const CategoryList = ({ category }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    if (isFocused) {
      const calculatedBudget = {};
      category.forEach((item) => {
        const total = item.categoryItems
          ? item.categoryItems.reduce(
              (total, curr) => total + (curr.cost || 0),
              0
            )
          : 0;
        calculatedBudget[item.id] = total;
      });
      setBudgets(calculatedBudget);
    }
  }, [isFocused, category]);

  const handleNavigation = (item) => {
    navigation.navigate("categoryDetail", { categoryId: item.id });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {category &&
        category.map((item) => (
          <TouchableOpacity
            style={styles.categoryButton}
            key={item.id}
            activeOpacity={0.85}
            onPress={() => handleNavigation(item)}
          >
            <View style={styles.categoryItem}>
              <View style={styles.leftSection}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.color || "#D1D5DB" },
                  ]}
                >
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Text style={styles.budgetText}>
                    Items: {item.categoryItems?.length || 0}
                  </Text>
                </View>
              </View>
              <View style={styles.budgetSection}>
                <Text style={styles.assignedBudget}>
                  Budget: ${item.assigned_budget}
                </Text>
                <Text style={styles.totalCost}>
                  Cost: ${budgets[item.id] || 0}
                </Text>
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
    backgroundColor: "#F9FAFB",
    alignItems: "center",
  },
  categoryButton: {
    width: width * 0.9,
    marginTop: 8,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    backgroundColor: "#E5E7EB",
  },
  iconText: {
    fontSize: 22,
    color: "#111827",
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  budgetText: {
    fontSize: 14,
    color: "#6B7280",
  },
  budgetSection: {
    alignItems: "flex-end",
  },
  assignedBudget: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
  },
  totalCost: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
});

export default CategoryList;
