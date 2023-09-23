import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import SvgLocation from "../components/SvgLocation";
import SvgComment from "../components/SvgComment";
import SvgLike from "../components/SvgLike";

export default function PostList() {
  const route = useRoute();
  const navigation = useNavigation();
  const { namePost, locationPost, photoPost } = route.params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (namePost && locationPost) {
      const newPost = {
        id: Date.now(),
        name: namePost,
        location: locationPost,
        photo: photoPost,
        like: 0,
      };
      setPosts((prevPosts) => [...prevPosts, newPost]);
    }
  }, [namePost, locationPost]);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, like: post.like === 0 ? 1 : 0 } : post
      )
    );
  };

  return (
    <View>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.photo }}
                style={styles.postThumb}
                resizeMode="cover"
              />
              <Text style={styles.postName}>{item.name}</Text>
              <View style={styles.aboutWrapper}>
                <View style={styles.viewWrapper}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Comments")}
                    style={styles.commentWrapper}
                  >
                    <SvgComment />
                    <Text style={styles.text}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.likeWrapper}
                    onPress={() => handleLike(item.id)}
                  >
                    <SvgLike />
                    <Text style={styles.text}>{item.like}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.lokationWrapper}
                  onPress={() => navigation.navigate("Map")}
                >
                  <SvgLocation />
                  <Text style={styles.textUnderline}>{item.location}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>Додайте пост</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 34,
  },
  postWrapper: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  postThumb: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "rgba(232, 232, 232, 1)",
    width: 343,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  postName: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  viewWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  commentWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    justifyContent: "center",
    gap: 5,
  },
  likeWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  lokationWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  aboutWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    width: 343,
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textUnderline: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
