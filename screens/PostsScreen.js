import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../components/PostList";
import { getposts } from "../redux/operations";

export default function PostsScreen() {
  const data = useSelector((state) => state.main);
  const photo = data?.user?.photoURL;
  const uid = useSelector((state) => state.main?.user?.uid);
  const default_image_url =
    "gs://awesomeprojectc.appspot.com/photos/default_image.jpghttps://example.com/default_image.jpg";

  const [filteredPosts, setFilteredPosts] = useState([]);

  const filterPostsByOwner = (posts, owner) => {
    return posts.filter((post) => post.data.owner === owner);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getposts());
  }, []);

  useEffect(() => {
    if (data.posts) {
      const filtered = filterPostsByOwner(data.posts, uid);
      setFilteredPosts(filtered);
    }
  }, [data.posts, uid]);

  return (
    <View style={styles.bg}>
      <View style={styles.userPost}>
        {photo ? (
          <View>
            <Image
              source={{ uri: photo || default_image_url }}
              style={styles.avavtarThumb}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View style={styles.avavtarThumb}></View>
        )}
        <View style={styles.userInfo}>
          <Text style={styles.login}>{data?.user?.displayName}</Text>
          <Text style={styles.email}>{data?.user?.email}</Text>
        </View>
      </View>
      {data?.posts?.length > 0 && <PostList data={filteredPosts} />}
    </View>
  );
}

const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#FFF",
    height: screenSize.height,
    width: screenSize.width,
    paddingHorizontal: 16,
    alignItems: "center",
    flex: 1,
  },
  userInfo: {
    display: "flex",
    paddingLeft: 8,
    justifyContent: "center",
  },
  userPost: {
    display: "flex",
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 32,
    alignSelf: "flex-start",
    marginStart: 28,
  },
  avavtarThumb: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  login: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
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
  logout: {
    marginRight: 10,
  },
});
