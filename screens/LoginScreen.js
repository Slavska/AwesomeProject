import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/bg.jpg")}
        style={styles.bg}
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.formWrapper]}>
          <Text style={styles.title}>Увійти</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input]}
              placeholder="Адреса електронної пошти"
              placeholderTextColor={"#BDBDBD"}
            />
            <TextInput
              style={[styles.input]}
              placeholder="Пароль"
              placeholderTextColor={"#BDBDBD"}
            />
            <TouchableOpacity>
              <Button style={styles.inputPassword}>Показати</Button>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Увійти</Text>
          </TouchableOpacity>
          <Text style={styles.linkText}>
            Немає акаунту?
            <Text style={styles.linkTextLine}>Зареєструватися</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
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
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    marginBottom: 33,
  },
  inputContainer: {
    gap: 16,
    minWidth: "100%",
    alignItems: "center",
  },
  input: {
    padding: 15,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E8E8",
    width: 343,
    height: 50,

    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
  inputPassword: {
    fontSize: 16,
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    position: "absolute",
    bottom: 32,
    left: 90,
  },
  scrollViewContainer: {
    minHeight: screenSize.height,
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 32,
    paddingBottom: 144,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    width: 343,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff",
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  linkTextLine: { textDecorationLine: "underline" },
});
