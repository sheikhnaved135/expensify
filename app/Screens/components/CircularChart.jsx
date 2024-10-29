import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PieChart from "react-native-pie-chart";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const CircularChart = () => {
  const chartWidth = 200;
  const series = [40, 30, 20, 10];
  const sliceColor = ["#4caf50", "#ff9800", "#2196f3", "#f44336"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Budget: 0$</Text>
      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <PieChart
          widthAndHeight={chartWidth}
          series={series}
          coverFill={"#fff"}
          coverRadius={0.65}
          sliceColor={sliceColor}
        />
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={24}
            color="gray"
          />
          <Text>NA</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 120,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});

export default CircularChart;
