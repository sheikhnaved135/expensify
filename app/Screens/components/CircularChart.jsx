import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";

const CircularChart = ({ category }) => {
  const chartWidth = 170;
  const defaultColors = ["#4caf50", "#ff9800", "#2196f3", "#2196f3", "#c1121f"];

  const [value, setValue] = useState([1]);
  const [sliceColor, setSliceColor] = useState([defaultColors[0]]);
  const [totalBudget, setTotalBudget] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      let estimate = 0;
      category.forEach((item) => {
        item.categoryItems.forEach((ele) => {
          estimate += ele.cost;
        });
      });
      setTotalBudget(estimate);
      if (category.length == 0) {
        console.log("value initialised");
        setValue([1]);
        setSliceColor([defaultColors[0]]);
      } else {
        let check = false;
        category.forEach((item) => {
          if (item.categoryItems.length > 0) {
            check = true;
          }
        });
        // console.log(check);
        if (check == true) {
          // console.log("set to zero");
          setValue([]);
          setSliceColor([]);
        }
        let otherCost = 0;
        category.forEach((item, index) => {
          if (index < 4) {
            let itemTotalCost = 0;
            item.categoryItems?.forEach((item_) => {
              itemTotalCost = itemTotalCost + item_.cost;
            });
            setSliceColor((sliceColor) => [
              ...sliceColor,
              defaultColors[index],
            ]);
            setValue((value) => [...value, itemTotalCost]);
          } else {
            item.categoryItems?.forEach((item_) => {
              otherCost = otherCost + item_.cost;
            });
          }
        });
        setSliceColor((sliceColor) => [...sliceColor, defaultColors[4]]);
        setValue((value) => [...value, otherCost]);
        // console.log(value);
        // console.log(sliceColor);
      }
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Estimate: ${totalBudget}</Text>
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={chartWidth}
          series={value}
          coverFill={"#fff"}
          coverRadius={0.65}
          sliceColor={sliceColor}
        />
        <View style={styles.legendContainer}>
          {category.length === 0 || totalBudget === 0 ? (
            <View style={styles.legendItem}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                size={24}
                color="#4caf50"
              />
              <Text style={styles.legendText}>No Categories Available</Text>
            </View>
          ) : (
            <ScrollView style={styles.scrollContainer}>
              {category.map(
                (cat, index) =>
                  index <= 4 && (
                    <View key={index} style={styles.legendItem}>
                      <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        size={20}
                        color={sliceColor[index]}
                      />
                      <ScrollView horizontal={true}>
                        <Text style={styles.legendText}>
                          {index < 4 ? cat.name : "other"}
                        </Text>
                      </ScrollView>
                    </View>
                  )
              )}
            </ScrollView>
          )}
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
    maxWidth: 400,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  legendContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
  },
  scrollContainer: {
    maxHeight: 120,
    paddingRight: 10,
  },
});

export default CircularChart;
