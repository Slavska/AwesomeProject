import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getposts, signin } from "../redux/operations";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [shift, setShift] = useState(false);
  const [position] = useState(new Animated.Value(0));
  const [input2Focused, setInput2Focused] = useState(false);
  const [input3Focused, setInput3Focused] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLogined = useSelector((state) => state.main.user);

  const handleForm = () => {
    dispatch(signin({ email, password })).then(() => {
      navigation.navigate("Home");
    });
  };

  const togglePasswordVisibility = (event) => {
    event.stopPropagation();
    setHidePassword(!hidePassword);
  };

  useEffect(() => {
    if (isLogined) {
      navigation.navigate("Home");
    }
  }, [isLogined]);

  useEffect(() => {
    const listenerShow = Keyboard.addListener("keyboardDidShow", () => {
      setShift(true);
    });
    const listenerHide = Keyboard.addListener("keyboardDidHide", () => {
      setShift(false);
    });

    return () => {
      listenerShow.remove();
      listenerHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(position, {
      toValue: shift ? 90 : 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [shift]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
          source={require("../assets/bg.jpg")}
          style={styles.bg}
          resizeMode="cover"
        />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Animated.View
            style={[styles.formWrapper, { paddingBottom: position }]}
          >
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputContainer}>
              <TextInput
                onFocus={() => setInput2Focused(true)}
                onBlur={() => setInput2Focused(false)}
                style={[styles.input, input2Focused && styles.inputFocused]}
                placeholder="Адреса електронної пошти"
                placeholderTextColor={"#BDBDBD"}
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                onFocus={() => setInput3Focused(true)}
                onBlur={() => setInput3Focused(false)}
                style={[styles.input, input3Focused && styles.inputFocused]}
                placeholder="Пароль"
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={styles.inputPassword}>
                  {hidePassword ? "Показати" : "Приховати"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForm} style={styles.button}>
              <Text style={styles.buttonText}>Увійти</Text>
            </TouchableOpacity>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Registration")}
            >
              Немає акаунту?
              <Text style={styles.linkTextLine}>Зареєструватися</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
