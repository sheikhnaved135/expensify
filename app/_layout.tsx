import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/auth/Login';
import Register from './Screens/auth/Register';
import Page from './Screens/components/Page';
import Home from './Screens/components/Home';
import Lottie from './Screens/components/Lottie';

export default function RootLayout() {
  const Stack = createNativeStackNavigator();
  
  // You can define your Lottie screen as a function
  const LottieScreen = () => <Lottie item='login' />;

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Lottie' screenOptions={{ statusBarColor: 'black' }}>
        <Stack.Screen name='Lottie' component={LottieScreen}options={{headerShown:false}}/>
        <Stack.Screen name='Page' component={Page} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} options={{ headerLeft: () => null, headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
