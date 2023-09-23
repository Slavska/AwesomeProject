import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import SvgCamera from "../components/SvgCamera";
import SvgLocation from "../components/SvgLocation";
import SvgTresh from "../components/SvgTresh";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CreatePostScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState("");
  const [locationName, setLocationName] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
      let currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      await setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const handlePhoto = async () => {
    try {
      if (cameraRef) {
        const { uri } = await cameraRef.takePictureAsync();
        const asset = await MediaLibrary.createAssetAsync(uri);
        setPhoto(asset.uri);
        const userLocation = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        };

        setLocation(coords);
        const locationAddress = await reverseGeocode(location);
        setLocationName(locationAddress);
      }
    } catch (error) {
      console.error("Error capturing or saving the photo:", error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleForm = () => {
    navigation.navigate("Home", {
      screen: "PostNav",
      params: {
        screen: "Posts",
        namePost: name,
        locationPost: locationName,
        photoPost: photo,
      },
    });
    setName("");
    setPhoto("");
    setLocation("");
  };

  const reverseGeocode = async (coords) => {
    try {
      const location = await Location.reverseGeocodeAsync(coords);
      if (location && location.length > 0) {
        const address =
          location[0].name || location[0].city || location[0].region;
        return address;
      } else {
        return "Местоположение не найдено";
      }
    } catch (error) {
      console.error("Ошибка геокодирования:", error);
      return "Ошибка геокодирования";
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerTop}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.photoBlock}>
          <View style={styles.photoThumb}>
            <Camera style={styles.camera} type={cameraType} ref={setCameraRef}>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setCameraType(
                    cameraType === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="camera-reverse" size={32} color="#F6F6F6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.svgThumb} onPress={handlePhoto}>
                <SvgCamera />
              </TouchableOpacity>
            </Camera>
          </View>
          <Text style={styles.textPhoto}>Завантажте фото</Text>
        </View>
        <View style={styles.inputBlock}>
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            placeholderTextColor={"#BDBDBD"}
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => navigation.navigate("Map")}
          >
            <Text
              style={[styles.inputText, { paddingLeft: 25 }]}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              value={locationName}
              onChangeText={setLocationName}
            >
              {locationName}
            </Text>
          </TouchableOpacity>
          <SvgLocation style={styles.svgLocation} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleForm}>
          <Text style={styles.buttonText}>Опубліковати</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delWraper}>
          <SvgTresh />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 32,
  },
  photoThumb: {
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  photoBlock: {
    width: 343,
  },
  svgThumb: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  textPhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    alignSelf: "flex-start",
  },
  inputBlock: {
    gap: 16,
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
  },
  inputText: {
    paddingTop: 20,
  },
  svgLocation: {
    position: "absolute",
    top: 80,
  },
  button: {
    width: 343,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff",
  },
  delWraper: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  photoView: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    width: "100%",
    height: 30,
  },

  flipContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
});
