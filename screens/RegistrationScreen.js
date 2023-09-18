import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SvgPlus } from "../components/SvgPlus";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg.jpg")}
        style={styles.bg}
        resizeMode="cover"
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
      >
        <View style={styles.formWrapper}>
          <View style={styles.avavtarThumb}>
            <SvgPlus style={styles.plusSvg} />
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input]}
              placeholder="Логін"
              placeholderTextColor={"#BDBDBD"}
            />
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
              <Text style={styles.inputPassword}>Показати</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Зареєструватися</Text>
          </TouchableOpacity>
          <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
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
    fontWeight: 500,
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
    minWidth: 343,
    height: 50,

    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  plusSvg: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 81,
    left: 107,
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
    paddingTop: 92,
    paddingBottom: 78,
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
});
