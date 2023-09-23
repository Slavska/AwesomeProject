import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import PostNavigation from "../components/PostNavigation";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import SvgArrow from "../components/SvgArrow";

const MainStack = createStackNavigator();

export default function Home() {
  return (
    <MainStack.Navigator initialRouteName="PostNav">
      <MainStack.Screen
        name="PostNav"
        component={PostNavigation}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerTitle: "Коментарі",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            color: "#212121",
            textAlign: "center",
            fontSize: 17,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 16 }}
            >
              <SvgArrow />
            </TouchableOpacity>
          ),
        })}
      />
      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          headerTitle: "Геолокація",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            color: "#212121",
            textAlign: "center",
            fontSize: 17,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 16 }}
            >
              <SvgArrow />
            </TouchableOpacity>
          ),
        })}
      />
    </MainStack.Navigator>
  );
}
