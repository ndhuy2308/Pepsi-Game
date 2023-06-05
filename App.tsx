import React, { useCallback, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import HomePage from './src/components/homePage'
import LoginPage from './src/components/loginPage'
import RegisterPage from './src/components/registerPage'
import Gameplay from './src/components/GamePlay'
import Result from './src/components/GamePlay/result'
import QrPage from './src/components/qrPage'
import Collection from './src/components/Collection'
import GiftPage from './src/components/giftPage'
import store from './src/store/store'
import { Provider } from 'react-redux'
import { RootStackParamList } from './src/types'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

SplashScreen.preventAutoHideAsync()

const Stack = createStackNavigator<RootStackParamList>()
export default function App({ navigation }: { navigation: any }) {
  const [authState, setAuthState] = useState<number>(0)
  const [fontsLoaded] = useFonts({
    SwissBold: require('./assets/fonts/UTM-Swiss-721-Black-Condensed.ttf'),
    SwissLight: require('./assets/fonts/UTM-Swiss-Condensed.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(authState)
      setAuthState(1)
      // ...
    } else {
      console.log(authState)
      setAuthState(0)
    }
  })
  return (
    <Provider store={store}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {authState === 0 ? (
            <>
              <Stack.Screen name='LoginPage' component={LoginPage} />
              <Stack.Screen name='RegisterPage' component={RegisterPage} />
            </>
          ) : (
            <>
              <Stack.Screen name='Home' component={HomePage} />
              <Stack.Screen name='Gameplay' component={Gameplay} />
              <Stack.Screen name='Result' component={Result} />
              <Stack.Screen name='QrPage' component={QrPage} />
              <Stack.Screen name='Collection' component={Collection} />
              <Stack.Screen name='GiftPage' component={GiftPage} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
