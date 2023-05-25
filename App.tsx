import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import HomePage from './src/components/homePage'
import LoginPage from './src/components/loginPage'
import RegisterPage from './src/components/registerPage'
import Gameplay from './src/components/GamePlay'
import Result from './src/components/GamePlay/result'
import QrPage from './src/components/qrPage'
import store from './src/store/store'
import { Provider } from 'react-redux'

const Stack = createStackNavigator()
export default function App({ navigation }: { navigation: any }) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='RegisterPage' component={RegisterPage} />
          <Stack.Screen name='LoginPage' component={LoginPage} />
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='Gameplay' component={Gameplay} />
          <Stack.Screen name='Result' component={Result} />
          <Stack.Screen name='QrPage' component={QrPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
