import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../components/PostList";
import SvgGrid from "../components/SvgGrid";
import SvgLogout from "../components/SvgLogout";
import { SvgPlus } from "../components/SvgPlus";
import { getposts, signout, updateuser } from "../redux/operations";

export default function () {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [photo, setPhoto] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const data = useSelector((state) => state.main);
  const uid = useSelector((state) => state.main?.user?.uid);
  const filterPostsByOwner = (posts, owner) => {
    return posts.filter((post) => post.data.owner === owner);
  };

  useEffect(() => {
    dispatch(getposts());
  }, [uid]);

  useEffect(() => {
    if (data.posts) {
      const filtered = filterPostsByOwner(data.posts, uid);
      setFilteredPosts(filtered);
    }
  }, [data.posts, uid]);

  useEffect(() => {
    setPhoto(data?.user?.photoURL);
  }, [data?.user?.photoURL]);

  const handleLogout = () => {
    dispatch(signout()).then(() => navigation.navigate("Login"));
  };

  const deleteAvatar = () => {
    setPhoto("");
    dispatch(updateuser({ login: data?.user?.displayName, photoUri: "" }));
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
        dispatch(
          updateuser({ login: data.user.displayName, photoUri: result.uri })
        );
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
            <Text style={styles.title}>{data?.user?.displayName}</Text>
            <TouchableOpacity style={styles.logout} onPress={handleLogout}>
              <SvgLogout />
            </TouchableOpacity>
          </View>
          <View style={styles.postList}>
            {data?.posts?.length > 0 && <PostList data={filteredPosts} />}
          </View>
        </Animated.View>
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
  formWrapper: {
    marginTop: 239,
    height: screenSize.height,
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
