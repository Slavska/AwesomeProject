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
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import SvgGrid from "../components/SvgGrid";
import SvgLogout from "../components/SvgLogout";
import { SvgPlus } from "../components/SvgPlus";
import * as ImagePicker from "expo-image-picker";

export default function () {
  const navigation = useNavigation();
  const route = useRoute();
  const { loginUser, photoUri } = route.params;
  const [login, setLogin] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (loginUser) {
      setLogin(loginUser);
      setPhoto(photoUri);
    }
  }, [loginUser, photoUri]);

  const deleteAvatar = () => {
    setPhoto("");
  };

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Нет разрешения на доступ к галерее!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        console.log("Выбор изображения был отменен");
      } else if (result.uri) {
        setPhoto(result.uri);
      } else if (result.error) {
        console.error("Ошибка выбора изображения: ", result.error);
      }
    } catch (error) {
      console.error("Произошла ошибка: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
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
            {photo ? (
              <View style={styles.avavtarThumb}>
                <Image
                  style={styles.postThumb}
                  source={{ uri: photo }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => deleteAvatar()}
                  style={styles.plusSvg}
                >
                  <SvgGrid />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.avavtarThumb}>
                <TouchableOpacity
                  onPress={handlePickImage}
                  style={styles.plusSvg}
                >
                  <SvgPlus />
                </TouchableOpacity>
              </View>
            )}
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
  postThumb: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});
