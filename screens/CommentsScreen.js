import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addcomment, getposts } from "../redux/operations";
import SvgArrowFocused from "../components/SvgArrowFocused";
import Comment from "../components/Comments";

export default function CommentsScreen() {
  const dispatcher = useDispatch();
  const [input3Focused, setInput3Focused] = useState(false);
  const [text, setText] = useState("");
  const allPosts = useSelector((state) => state.main.posts);
  const {
    params: { data },
  } = useRoute();

  const currentPost = allPosts.find((post) => post.id === data?.item?.id);
  const default_image_url =
    "gs://awesomeprojectc.appspot.com/photos/default_image.jpghttps://example.com/default_image.jpg";

  const handleForm = async () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();
    const seconds = date.getSeconds();
    if (!text) {
      alert("Заповніть обов'язкове поле");
      return;
    }
    const formattedDateWithSeconds = `${formattedDate}, ${seconds} seconds`;

    const newComment = { message: text, date: formattedDateWithSeconds };
    dispatcher(
      addcomment({
        comment: [...currentPost.data.comments, newComment],
        docId: data.item.id,
      })
    )
      .then(() => dispatcher(getposts()))
      .then(() => setText(""));
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Image
          style={styles.postThumb}
          source={{ uri: currentPost.data.photo || default_image_url }}
          resizeMode="cover"
        />
        <TextInput
          onFocus={() => setInput3Focused(true)}
          onBlur={() => setInput3Focused(false)}
          style={[styles.input, input3Focused && styles.inputFocused]}
          placeholder="Коментувати..."
          placeholderTextColor={"#BDBDBD"}
          value={text}
          onChangeText={(text) => setText(text)}
          required={true}
        />
        <TouchableOpacity style={styles.svgArrowCircle} onPress={handleForm}>
          <SvgArrowFocused style={styles.svgArrow} />
        </TouchableOpacity>
        {currentPost && (
          <View style={styles.commentsList}>
            <FlatList
              data={currentPost.data.comments}
              renderItem={({ item, index }) => (
                <Comment odd={index % 2 === 0} item={item} />
              )}
              keyExtractor={(item, index) => item.date.toString()}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    height: screenSize.height,
    width: screenSize.width,
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
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
  postThumb: {
    borderRadius: 8,
    width: 343,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
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
  input: {
    padding: 15,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    minWidth: 343,
    height: 50,
    position: "absolute",
    bottom: 20,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    zIndex: 100,
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
  svgArrow: {
    position: "absolute",
    width: 34,
    height: 34,
    bottom: 9,
    right: 9,
    zIndex: 102,
  },
  svgArrowCircle: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 100,
    bottom: 26,
    right: 50,
    backgroundColor: "#FF6C00",
    zIndex: 101,
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
});
