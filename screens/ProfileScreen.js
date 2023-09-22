import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PostList from "../components/PostList";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import SvgGrid from "../components/SvgGrid";
import SvgLogout from "../components/SvgLogout";

export default function () {
  const navigation = useNavigation();
  const route = useRoute();
  const { loginUser } = route.params;
  const [login, setLogin] = useState("");

  useEffect(() => {
    if (loginUser) {
      setLogin(loginUser);
    }
  }, [loginUser]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* <StatusBar style="auto" /> */}
        <Image
          source={require("../assets/bg.jpg")}
          style={styles.bg}
          resizeMode="cover"
        />
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
        >
          <Animated.View style={styles.formWrapper}>
            <View style={styles.avavtarThumb}>
              <SvgGrid style={styles.plusSvg} />
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{login}</Text>
              <TouchableOpacity
                style={styles.logout}
                onPress={() => navigation.navigate("Registration")}
              >
                <SvgLogout />
              </TouchableOpacity>
            </View>
            <View style={styles.postList}>
              <PostList />
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    top: 0,
    position: "absolute",
    height: screenSize.height,
    width: screenSize.width,
  },
  avavtarThumb: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    marginBottom: 33,
    marginTop: 92,
    position: "relative",
  },

  plusSvg: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 81,
    left: 107,
  },
  scrollViewContainer: {
    height: screenSize.height,
    marginTop: 239,
  },
  formWrapper: {
    flex: 1,
    minheight: screenSize.height,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  info: {},
  logout: {
    left: 165,
    bottom: 35,
    position: "absolute",
  },
});
