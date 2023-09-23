import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import SvgArrowFocused from "../components/SvgArrowFocused";

export default function Comment({ odd }) {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const [input3Focused, setInput3Focused] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const newComment = {
        text: commentText,
        date: date.toLocaleString(),
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.postThumb}></View>
        <TextInput
          onFocus={() => setInput3Focused(true)}
          onBlur={() => setInput3Focused(false)}
          style={[styles.input, input3Focused && styles.inputFocused]}
          placeholder="Коментувати..."
          placeholderTextColor={"#BDBDBD"}
          value={commentText}
          onChangeText={(text) => setCommentText(text)}
        />
        <TouchableOpacity
          style={styles.svgArrowCircle}
          onPress={handleAddComment}
        >
          <SvgArrowFocused style={styles.svgArrow} />
        </TouchableOpacity>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          {comments.map((comment, index) => (
            <View
              style={[
                styles.textWrapper,
                index % 2 === 0 ? styles.commentEven : styles.commentOdd,
              ]}
            >
              <View
                key={index}
                style={[
                  styles.containerComments,
                  index % 2 === 0 ? styles.commentEven : styles.commentOdd,
                ]}
              >
                <Text style={styles.textComment}>{comment.text}</Text>
                <Text style={styles.textData}>{comment.date}</Text>
              </View>
              <View style={styles.photoThumb}></View>
            </View>
          ))}
        </ScrollView>
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
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "rgba(232, 232, 232, 1)",
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
