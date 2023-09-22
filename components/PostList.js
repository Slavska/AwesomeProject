import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import SvgLocation from "../components/SvgLocation";
import SvgComment from "../components/SvgComment";
import SvgLike from "../components/SvgLike";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const route = useRoute();
  const { namePost, locationPost } = route.params;

  useEffect(() => {
    if (namePost && locationPost) {
      const newPost = { name: namePost, location: locationPost };
      setPosts((prevPosts) => [...prevPosts, newPost]);
    }
  }, [namePost, locationPost]);
  return (
    <View>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.postThumb}></View>
              <Text style={styles.postName}>{item.name}</Text>
              <View style={styles.aboutWrapper}>
                <View style={styles.viewWrapper}>
                  <TouchableOpacity style={styles.commentWrapper}>
                    <SvgComment />
                    <Text style={styles.text}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.likeWrapper}>
                    <SvgLike />
                    <Text style={styles.text}>0</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.lokationWrapper}>
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
