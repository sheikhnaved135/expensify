import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./Screens/auth/Register";
import Page from "./Screens/components/Page";
import Home from "./Screens/components/Home";
import Lottie from "./Screens/components/Lottie";
import AddNewCategoryModal from "./add-new-category";
import CategoryDetail from "./Screens/components/CategoryDetail";
import {Provider} from 'react-redux'
import store  from './redux/store';
import AddItemList from './Screens/components/AddItemList';

export default function RootLayout() {
  const Stack = createNativeStackNavigator();

  // You can define your Lottie screen as a function
  const LottieScreen = () => <Lottie item="login" />;

  return (
    <Provider store = {store}>
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Lottie"
        screenOptions={{ statusBarColor: "black" }}
      >
        <Stack.Screen
          name="Lottie"
          component={LottieScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Page"
          component={Page}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerLeft: () => null, headerShown: false }}
        />
        <Stack.Screen
          name="add-new-category"
          component={AddNewCategoryModal}
          options={{ presentation: "modal", headerTitle: "Add New Category" }}
        />
        <Stack.Screen
          name="categoryDetail"
          component={CategoryDetail}
          options={{ headerTitle: "Detail" }}
        /> 
        <Stack.Screen
          name="AddItemList"
          component={AddItemList}
          options={{ headerTitle: "Add Item List" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
