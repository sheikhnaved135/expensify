import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Lottie from "./Lottie";
import { useSelector } from "react-redux";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const { user } = useSelector((store) => store.user);

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
        <ScrollView contentContainerStyle={styles.container}>
          {/* Profile Card */}
          <View style={styles.card}>
            <Image
              source={{
                uri:
                  user.picture ||
                  "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
              }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user?.given_name} {user?.family_name}
              </Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>

          {/* Action Button */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setModal(true)}
            >
              <Ionicons name="log-out-outline" size={20} color="white" />
              <Text style={styles.actionButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <TouchableOpacity style={styles.settingsItem}>
              <MaterialIcons name="account-circle" size={24} color="#333" />
              <Text style={styles.settingsText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <MaterialIcons name="security" size={24} color="#333" />
              <Text style={styles.settingsText}>Privacy & Security</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <MaterialIcons name="help-outline" size={24} color="#333" />
              <Text style={styles.settingsText}>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <MaterialIcons name="info-outline" size={24} color="#333" />
              <Text style={styles.settingsText}>About Us</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={modal}
            transparent
            animationType="fade"
            onRequestClose={() => setModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Logout</Text>
                <Text style={styles.modalSubtitle}>
                  Are you sure you want to logout? We’ll miss you!
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleLogout}
                  >
                    <Text style={styles.confirmButtonText}>Yes, Logout</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    padding: 20,
    backgroundColor: "#3b5998",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  actions: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#ff4757",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  actionButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  confirmButton: {
    backgroundColor: "#ff4757",
    paddingVertical: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
