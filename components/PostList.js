import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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

export default function PostList({ data }) {
  const navigation = useNavigation();
  const [likes, setLikes] = useState({});
  const default_image_url =
    "gs://awesomeprojectc.appspot.com/photos/default_image.jpghttps://example.com/default_image.jpg";
  useEffect(() => {
    const initialLikes = {};
    data.forEach((item) => {
      initialLikes[item.id] = item.data.likes || 0;
    });
    setLikes(initialLikes);
  }, [data]);

  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]:
        prevLikes[postId] % 2 === 0
          ? prevLikes[postId] + 1
          : prevLikes[postId] - 1,
    }));
  };
  const sortedData = data.slice().sort((a, b) => {
    return b.data.date - a.data.date;
  });
  return (
    <View>
      {sortedData && sortedData.length > 0 ? (
        <FlatList
          flexGrow={1}
          data={sortedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.data.photo || default_image_url }}
                style={styles.postThumb}
                resizeMode="cover"
              />
              <Text style={styles.postName}>{item.data.name}</Text>
              <View style={styles.aboutWrapper}>
                <View style={styles.viewWrapper}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Comments", {
                        data: { item },
                      })
                    }
                    style={styles.commentWrapper}
                  >
                    <SvgComment />
                    <Text style={styles.text}>{item.data.comments.length}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.likeWrapper}
                    onPress={() => handleLike(item.id)}
                  >
                    <SvgLike />
                    <Text style={styles.text}>{likes[item.id]}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.lokationWrapper}
                  onPress={() => navigation.navigate("Map")}
                >
                  <SvgLocation />
                  <Text style={styles.textUnderline}>
                    {item.data.locationName}
                  </Text>
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
