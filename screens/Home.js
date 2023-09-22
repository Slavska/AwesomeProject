import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import PostNavigation from "../components/PostNavigation";
import { useRoute } from "@react-navigation/native";

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
    </MainStack.Navigator>
  );
}
