import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import SvgCamera from "../components/SvgCamera";
import SvgLocation from "../components/SvgLocation";
import SvgTresh from "../components/SvgTresh";

export default function CreatePostsScreen() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigation = useNavigation();

  const handleForm = () => {
    navigation.navigate("Home", {
      screen: "PostNav",
      params: {
        screen: "Profile",
        namePost: name,
        locationPost: location,
      },
    });
    setName("");
    setLocation("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.bg}>
        <View style={styles.avavtarThumb}>
          <View style={styles.svgThumb}>
            <SvgCamera style={styles.plusSvg} />
          </View>
        </View>
        <Text style={styles.textPhoto}>Завантажте фото</Text>
        <Animated.View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            placeholderTextColor={"#BDBDBD"}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { paddingLeft: 25 }]}
            placeholder="Місцевість..."
            placeholderTextColor={"#BDBDBD"}
            value={location}
            onChangeText={setLocation}
          />
          <SvgLocation style={styles.svgLocation} />
        </Animated.View>
        <TouchableOpacity onPress={handleForm} style={styles.button}>
          <Text style={styles.buttonText}>Опублікувати</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.treshWraper}>
          <SvgTresh />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#FFF",
    height: screenSize.height,
    width: screenSize.width,
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  avavtarThumb: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    position: "relative",
    backgroundColor: "rgba(232, 232, 232, 1)",
    width: 343,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  svgThumb: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 100,
    position: "absolute",
  },
  plusSvg: {
    width: 60,
    height: 60,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 343,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 32,
    marginBottom: 128,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    width: 343,
    height: 50,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    position: "relative",
  },
  svgLocation: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 78,
    left: 0,
  },
  textPhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    alignSelf: "flex-start",
    marginStart: 28,
  },
  treshWraper: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  inputWrapper: { gap: 16, marginTop: 32 },
});
