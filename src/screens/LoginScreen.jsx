import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../components/usercontext";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the eye icon
import { BRDRCLR1 } from "../constants/colors";

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const { setUser } = useContext(UserContext); // Get setUser from UserContext
  const [identifier, setIdentifier] = useState(""); // Email or phone number
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility toggle

  const handleLogin = async () => {
    const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        (user.email.toLowerCase() === identifier.toLowerCase() ||
          user.phone === identifier) &&
        user.password === password
    );

    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user)); // Store logged-in user
      setUser(user); // Set user in context
      navigation.replace("Home"); // Navigate to Home
    } else {
      Alert.alert("Error", "Invalid email/phone number or password");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Email or Phone Number"
        value={identifier}
        onChangeText={setIdentifier}
        style={[styles.input, { color: colors.text }]}
        placeholderTextColor={colors.text}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { color: colors.text }]}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.buttonBackground }]}
        onPress={handleLogin}
      >
        <Text style={{ color: colors.buttonText }}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerTextContainer}>
        <Text style={{ color: colors.text }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={[styles.registerText, { color: colors.buttonBackground }]}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
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
  input: {
    borderWidth: 1,
    borderColor: BRDRCLR1,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 16,
  },
  button: {
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  registerTextContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    textDecorationLine: "underline",
  },
});
