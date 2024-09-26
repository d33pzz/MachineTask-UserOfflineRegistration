import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../components/usercontext";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the eye icon
import { BRDRCLR1 } from "../constants/colors";

export default function RegisterScreen({ navigation }) {
  const { colors } = useTheme(); // Get theme colors
  const { setUser } = useContext(UserContext); // Get setUser from UserContext

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility toggle
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); // Confirm password visibility toggle

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const handleRegister = async () => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !location ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
    const duplicateUser = users.find((user) => user.email === email);
    const duplicatePhone = users.find((user) => user.phone === phone);

    if (duplicateUser) {
      Alert.alert("Error", "User with this email already exists");
      return;
    }

    if (duplicatePhone) {
      Alert.alert("Error", "User with this phone number already exists");
      return;
    }
    const newUser = { fullName, email, phone, location, password };
    users.push(newUser);
    await AsyncStorage.setItem("users", JSON.stringify(users));
    await AsyncStorage.setItem("user", JSON.stringify(newUser));

    setUser(newUser); // Set user in context
    navigation.replace("Home"); // Navigate to Home
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.welcomeText, { color: colors.text }]}>
        Welcome! Please register to continue.
      </Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={[styles.input, { color: colors.text }]}
        placeholderTextColor={colors.text}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { color: colors.text }]}
        keyboardType="email-address"
        placeholderTextColor={colors.text}
      />
      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={[styles.input, { color: colors.text }]}
        keyboardType="phone-pad"
        placeholderTextColor={colors.text}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
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
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, { color: colors.text }]}
          secureTextEntry={!isConfirmPasswordVisible}
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity
          onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={isConfirmPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.buttonBackground }]}
        onPress={handleRegister}
      >
        <Text style={{ color: colors.buttonText }}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginTextContainer}>
        <Text style={{ color: colors.text }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.loginText, { color: colors.buttonBackground }]}>
            Login
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
  welcomeText: {
    alignSelf: "flex-start",
    fontSize: 18,
    marginBottom: 20,
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
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  loginTextContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    textDecorationLine: "underline",
  },
});
