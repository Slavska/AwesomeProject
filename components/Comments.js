import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useSelector } from "react-redux";

export default function Comment({ odd, item }) {
  const photoAvatar = useSelector((state) => state.main?.user?.photoURL);
  return (
    <View
      style={[styles.textWrapper, odd ? styles.commentEven : styles.commentOdd]}
      key={odd}
    >
      <View style={styles.photoThumb}>
        <Image
          source={{ uri: photoAvatar || default_image_url }}
          style={styles.photoThumb}
          resizeMode="cover"
        />
      </View>
      <View
        style={[
          styles.containerComments,
          odd ? styles.commentEven : styles.commentOdd,
        ]}
      >
        <Text style={styles.textComment}>{item.message}</Text>
        <Text style={styles.textData}>{item.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoThumb: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },

  textComment: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  textData: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    marginTop: 16,
  },
  textWrapper: {
    flexDirection: "row",
    marginTop: 32,
    gap: 8,
  },
  commentOdd: {
    flexDirection: "row",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  commentEven: {
    flexDirection: "row-reverse",
    alignSelf: "flex-start",
    textAlign: "left",
  },
  containerComments: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
    flexDirection: "column",
    backgroundColor: "#F6F6F6",
    flexWrap: "wrap",
    width: 299,
    minWidth: "auto",
  },
});
