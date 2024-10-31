import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";

const ItemList = ({ categoryList }) => {
  const [itemList, setItemList] = useState(categoryList);
  // console.log(itemList);
  const imgPreview =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ0eIyC4TIuSzxqaeKpkP0i10b51WABAiktQ&s";
  return (
    <ScrollView style={styles.container}>
      {itemList.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
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
        </View>
      ))}
    </ScrollView>
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
