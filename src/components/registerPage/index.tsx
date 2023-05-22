import { LinearGradient } from 'expo-linear-gradient'
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import firebaseapp from '../../FirebaseConfig'
// import { useCallback } from 'react';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();

function RegisterPage({ navigation }: { navigation: any }) {
  // const [fontsLoaded] = useFonts({
  //   SwissLight: require('./assets/fonts/swissLight.ttf'),
  //   SwissBold: require('./assets/fonts/swissBold.ttf'),
  // })

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync()
  //   }
  // }, [fontsLoaded])

  // if (!fontsLoaded) {
  //   return null
  // }
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const auth = getAuth(firebaseapp)
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }
  return (
    <LinearGradient
      colors={['#02A7F0', '#0063A7']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ flex: 1 }}
    >
      <Image
        source={require('../../../assets/images/1.png')}
        style={{ flex: 1, position: 'absolute', top: 0, left: 0 }}
      />
      <Image source={require('../../../assets/images/2.png')} style={{ position: 'absolute', top: 0, right: 0 }} />
      <Image source={require('../../../assets/images/3.png')} style={{ position: 'absolute', bottom: 0, left: 0 }} />
      <Image source={require('../../../assets/images/4.png')} style={{ position: 'absolute', bottom: 0, right: 0 }} />
      <Image
        source={require('../../../assets/images/hoa-trai.png')}
        style={{ position: 'absolute', top: '23%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/hoa-phai.png')}
        style={{ position: 'absolute', top: '60%', right: 0 }}
      />
      <Image
        source={require('../../../assets/images/hoa-duoi.png')}
        style={{ position: 'absolute', top: '65%', left: 0 }}
      />
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={[{ color: 'white', fontSize: 18 }]}>Hey, mừng bạn đến với</Text>
          <Text style={[{ color: 'white', fontSize: 30 }]}>Pepsi Tết</Text>
        </View>

        <View style={{ flex: 2, alignContent: 'center' }}>
          <Text style={[{ textAlign: 'center', color: 'white', fontSize: 24 }]}>Đăng ký</Text>

          <TextInput style={styles.input} placeholder='Nhập email' onChangeText={(Text) => setEmail(Text)} />

          <TextInput
            style={styles.input}
            placeholder='Nhập mật khẩu'
            secureTextEntry={true}
            onChangeText={(Text) => setPassword(Text)}
          />

          <TextInput style={styles.input} placeholder='Nhập lại mật khẩu' />

          <Text style={[{ paddingTop: 20, color: 'white', fontSize: 14 }]}>
            Tôi đã đọc và đồng ý với thể lệ chương trình Pepsi Tết
          </Text>
        </View>

        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              handleSignUp()
              navigation.navigate('LoginPage')
            }}
          >
            <Image source={require('../../../assets/images/buttons/dang-ky.png')} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 20
  }
  // fontSL: {
  //   fontFamily: 'SwissLight',
  // },
  // fontSB: {
  //   fontFamily: 'SwissBold'
  // }
})

export default RegisterPage
