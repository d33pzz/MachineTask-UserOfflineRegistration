import "react-native-gesture-handler";
import React, { useEffect, useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Switch, StyleSheet, Text } from "react-native";
import { UserContext, UserProvider } from "./src/components/usercontext";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { CUSTDARKTHEME, CUSTLIGHTTHEME } from "./src/constants/Theme";
import { PUREBLACK, PUREWHITE } from "./src/constants/colors";

const Stack = createStackNavigator();


export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <UserProvider>
      <NavigationContainer
        theme={isDarkTheme ? CUSTDARKTHEME : CUSTLIGHTTHEME}
      >
        <AppNavigator />
        <View style={styles.themeSwitcher}>
          <Text style={{ color: isDarkTheme ? PUREWHITE : PUREBLACK }}>
            {isDarkTheme ? "Dark Theme" : "Light Theme"}
          </Text>
          <Switch
            value={isDarkTheme}
            onValueChange={() => setIsDarkTheme(!isDarkTheme)}
          />
        </View>
      </NavigationContainer>
    </UserProvider>
  );
}

const AppNavigator = () => {
  const { user, setUser } = useContext(UserContext); // Access user context

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set user state
      }
    };
    fetchUser();
  }, [setUser]); // Add setUser as a dependency

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null); // Reset user state
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Home">
          {() => <HomeScreen user={user} onLogout={handleLogout} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  themeSwitcher: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
