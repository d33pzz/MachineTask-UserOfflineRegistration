import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { PUREBLACK } from "../constants/colors";

export default function HomeScreen({ user, onLogout }) {
  const { colors } = useTheme();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) setUserDetails(JSON.parse(storedUser));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.welcomeText, { color: colors.text }]}>
        Welcome, {user.fullName}!
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.buttonBackground }]}
        onPress={fetchUserDetails}
      >
        <Text style={{ color: colors.buttonText }}>Fetch User Details</Text>
      </TouchableOpacity>

      {userDetails && (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={{ color: colors.text }}>
            Full Name: {userDetails.fullName}
          </Text>
          <Text style={{ color: colors.text }}>Email: {userDetails.email}</Text>
          <Text style={{ color: colors.text }}>Phone: {userDetails.phone}</Text>
          <Text style={{ color: colors.text }}>
            Location: {userDetails.location}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.buttonBackground }]}
        onPress={onLogout}
      >
        <Text style={{ color: colors.buttonText }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  card: {
    padding: 20,
    marginTop: 20,
    width: "100%",
    borderRadius: 10,
    shadowColor: PUREBLACK,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation : 2,
  },
});
