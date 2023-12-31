import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config";
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
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import { SvgPlus } from "../components/SvgPlus";
import { signup, updateuser } from "../redux/operations";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [shift, setShift] = useState(false);
  const [position] = useState(new Animated.Value(0));
  const [hidePassword, setHidePassword] = useState(true);
  const [input1Focused, setInput1Focused] = useState(false);
  const [input2Focused, setInput2Focused] = useState(false);
  const [input3Focused, setInput3Focused] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  const default_image_url =
    "gs://awesomeproject-9d076.appspot.com/photos/default_image_post.jpg";
  const uid = useSelector((state) => state.main?.user?.uid);
  if (uid) {
    navigation.navigate("Home");
  }

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Нет разрешения на доступ к галерее!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        console.log("Выбор изображения был отменен");
      } else if (result.uri) {
        setPhotoUri(result.uri);
      } else if (result.error) {
        console.error("Ошибка выбора изображения: ", result.error);
      }

      try {
        const response = await fetch(result.uri);
        const file = await response.blob();
        await uploadBytes(ref(storage, `avatars/${file._data.blobId}`), file);
        const photoUrl = await getDownloadURL(
          ref(storage, `avatars/${file._data.blobId}`)
        );
        await setPhotoUri(photoUrl);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Произошла ошибка: ", error);
    }
  };

  const handleForm = () => {
    if (!login || !email || !password || !photoUri) {
      alert("Заповніть обов'язкове поле");
      return;
    }
    dispatch(signup({ email, password, photoUri })).then((r) => {
      if (r.error) {
        navigation.navigate("Login");
        alert("Ваш e-mail використовується");
      } else {
        navigation.navigate("Home");
        dispatch(updateuser({ login, photoUri }));
        setPhotoUri("");
        setLogin("");
        setEmail("");
        setPassword("");
      }
    });
  };

  const togglePasswordVisibility = (event) => {
    event.stopPropagation();
    setHidePassword(!hidePassword);
  };

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
      toValue: shift ? 130 : 50,
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
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
        >
          <Animated.View style={styles.formWrapper}>
            <View style={styles.avavtarThumb}>
              {photoUri ? (
                <Image
                  source={{ uri: photoUri || default_image_url }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <SvgPlus onPress={handlePickImage} style={styles.plusSvg} />
              )}
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputContainer}>
              <TextInput
                onFocus={() => setInput1Focused(true)}
                onBlur={() => setInput1Focused(false)}
                style={[styles.input, input1Focused && styles.inputFocused]}
                placeholder="Логін"
                placeholderTextColor={"#BDBDBD"}
                value={login}
                onChangeText={setLogin}
                required={true}
              />
              <TextInput
                onFocus={() => setInput2Focused(true)}
                onBlur={() => setInput2Focused(false)}
                style={[styles.input, input2Focused && styles.inputFocused]}
                placeholder="Адреса електронної пошти"
                placeholderTextColor={"#BDBDBD"}
                value={email}
                onChangeText={setEmail}
                required={true}
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
                required={true}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={styles.inputPassword}>
                  {hidePassword ? "Показати" : "Приховати"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForm} style={styles.button}>
              <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Login")}
            >
              Вже є акаунт? Увійти
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
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});
