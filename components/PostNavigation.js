import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { Octicons } from "@expo/vector-icons";
import SvgLogout from "./SvgLogout";
import SvgArrow from "./SvgArrow";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { signout } from "../redux/operations";

const Tabs = createBottomTabNavigator();

export default function PostNavigation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = () => {
    dispatch(signout()).then(() => navigation.navigate("Login"));
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let isCenterIcon = false;

          if (route.name === "Posts") {
            iconName = focused ? "apps" : "apps";
          } else if (route.name === "Create") {
            iconName = "plus";
            isCenterIcon = true;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person";
          }

          return (
            <View
              style={{ alignItems: isCenterIcon ? "center" : "flex-start" }}
            >
              <Octicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121",
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerStyle: {
            backgroundColor: "#FFF",
          },

          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Bold",
            fontSize: 17,
          },
          headerLeft: false,
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <SvgLogout style={{ marginRight: 16 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <SvgArrow style={{ marginLeft: 16 }} />
            </TouchableOpacity>
          ),
          title: "Створити публікації",
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginRight: 10,
  },
});
