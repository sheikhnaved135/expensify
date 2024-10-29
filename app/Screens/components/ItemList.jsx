import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";

const ItemList = ({ categoryList }) => {
  const [itemList, setItemList] = useState(categoryList);

  return (
    <ScrollView style={styles.container}>
      {itemList.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {item.url ? (
            <Image source={{ uri: item.url }} style={styles.itemImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
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
    backgroundColor: "white",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#1e1e1e",
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    height: 90,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    objectFit: "fill",
  },
  placeholderImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#3a3a3a",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: "#b0b0b0",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  itemUrl: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  itemCost: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4caf50",
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginTop: 10,
  },
});

export default ItemList;
