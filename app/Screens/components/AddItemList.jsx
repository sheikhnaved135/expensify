import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "./../../../utils/SupabaseConfig";
import { decode } from "base64-arraybuffer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/categorySlice";

const AddItemList = () => {
  const imgPreview =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ0eIyC4TIuSzxqaeKpkP0i10b51WABAiktQ&s";

  const [preview, setPreview] = useState(imgPreview);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState();
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState();
  const [load, setLoad] = useState(false);
  const [checkCost, setCheckCost] = useState();
  const { category } = useSelector((store) => store.category);
  //   console.log(category);
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params;
  //   console.log("category id", categoryId);
  //   console.log("cost", typeof Number(cost));
  const handleImageAccess = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      if (status === "denied") {
        const { status: newStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (newStatus !== "granted") {
          ToastAndroid.show("Permission not granted", ToastAndroid.BOTTOM);
          return;
        }
      }
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (res.canceled) {
      ToastAndroid.show("Image not selected", ToastAndroid.BOTTOM);
    } else {
      setPreview(res.assets[0].uri);
      setImage(res.assets[0].base64);
      //   console.log("image", res.assets[0].base64);
    }
  };

  const handleAddItem = async () => {
    if (cost > checkCost) {
      Alert.alert(`Your budget $${checkCost}\nCost is out of budget!`);
      return;
    }
    if (cost == 0) {
      Alert.alert("Cost cannot be zero");
      return;
    }
    setLoad(true);
    const fileName = Date.now();
    let fileUri = "";
    if (image) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName + ".png", decode(image), {
          contentType: "image/png",
        });
      fileUri = `https://atbinfbpmfypmzvrilas.supabase.co/storage/v1/object/${data.fullPath}`;
    }
    // console.log("file uploaded", data);

    // console.log("file uri", fileUri);
    const { data: newItem, error: e } = await supabase
      .from("categoryItems")
      .insert([
        {
          name: itemName,
          cost: Number(cost),
          image: fileUri,
          url: url,
          note: note,
          category_id: categoryId,
        },
      ])
      .select();
    if (itemName) {
      const { data, error } = await supabase
        .from("category")
        .select("*,categoryItems(*)")
        .eq("created_by", user.email)
        .order("created_at", { ascending: false });
      dispatch(setCategory(data));
      ToastAndroid.show("Successfully added", ToastAndroid.BOTTOM);
      setLoad(false);
      navigation.navigate("ExpenseHome");
    }
  };

  useEffect(() => {
    const res = category.find((item) => item.id == categoryId);
    setCheckCost(res.assigned_budget);
  }, []);
  const isButtonDisabled = itemName.trim() === "" || cost == 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={handleImageAccess}>
          <Image source={{ uri: preview }} style={styles.image} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Cost"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL"
        value={url}
        onChangeText={setUrl}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Note"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity
        style={[styles.addButton, isButtonDisabled && styles.addButtonDisabled]}
        onPress={handleAddItem}
        disabled={isButtonDisabled}
      >
        <Text style={styles.addButtonText}>
          {load ? <ActivityIndicator /> : "Add"}
        </Text>
      </TouchableOpacity>

      {isButtonDisabled && (
        <Text style={styles.errorText}>* Item Name and Cost are required.</Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
    resizeMode: "contain",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonDisabled: {
    backgroundColor: "#888", // Gray color for disabled state
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 14,
  },
});
export default AddItemList;
