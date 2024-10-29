import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Lottie from "./Lottie";

const Profile = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);

  const handleLogout = async () => {
    setModal(false);
    setLoad(true);
    await AsyncStorage.clear();
    setTimeout(() => {
      setLoad(false);
      navigation.navigate("Page");
    }, 1000);
  };

  return (
    <>
      {load ? (
        <Lottie item={"logout"} />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => setModal(true)}
          >
            <Text style={styles.btnTxt}>Logout</Text>
          </TouchableOpacity>

          <Modal
            visible={modal}
            transparent
            animationType="fade"
            onRequestClose={() => setModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Are you sure you want to logout?
                </Text>
                <Text style={styles.modalSubtitle}>See you soon!</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.okButton}
                    onPress={handleLogout}
                  >
                    <Text style={styles.buttonText}>OK</Text>
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  btnStyle: {
    backgroundColor: "#ff9e00",
    padding: 13,
    marginTop: 20,
    borderRadius: 20,
  },
  btnTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  okButton: {
    backgroundColor: "#ff9e00",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;
