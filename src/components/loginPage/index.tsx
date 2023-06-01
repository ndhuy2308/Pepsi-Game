import { LinearGradient } from 'expo-linear-gradient'
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, SafeAreaView, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useCallback, useState, useEffect, useContext } from 'react'
import WhiteButton from '../buttons/white_button'
import firebaseapp from '../../FirebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store/rootReducer'
import { UserData, updateData } from '../../store/userDataSlice'

import { initializeFirestore, doc, getDoc, collection } from 'firebase/firestore'

function LoginPage({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const auth = getAuth(firebaseapp)
  const dispatch = useDispatch()
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const handleUpdateUserData = async (id: string) => {
    console.log(id)
    const docRef = doc(db, 'data', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const temp = JSON.stringify(docSnap.data())
      const data: UserData = JSON.parse(temp)
      console.log(data.MienPhi)
      await dispatch(
        updateData({
          MienPhi: data.MienPhi,
          QuyDoi: data.QuyDoi,
          An: data.An,
          Loc: data.Loc,
          Phuc: data.Phuc,
          Coins: data.Coins,
          BucketHat: data.BucketHat,
          Jacket: data.Jacket,
          ToteBag: data.ToteBag,
          Tumbler: data.Tumbler,
          AirpodCase: data.AirpodCase,
          ElectronicLunchBo: data.ElectronicLunchBo,
          PortableSpeaker: data.PortableSpeaker,
          UserID: id
        })
      )
      await navigation.navigate('Home')
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  return (
    <LinearGradient
      colors={['#02A7F0', '#0063A7']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ flex: 1 }}
    >
      <Image
        source={require('../../../assets/images/register/top_left.png')}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <Image
        source={require('../../../assets/images/register/flower_top_left.png')}
        style={{ position: 'absolute', top: '25.9%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/register/flower_bottom_left.png')}
        style={{ position: 'absolute', top: '62.1%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/register/bottom_left.png')}
        style={{ position: 'absolute', bottom: 0, left: 0 }}
      />
      <Image
        source={require('../../../assets/images/register/top_right.png')}
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <Image
        source={require('../../../assets/images/register/flower_bottom_right.png')}
        style={{ position: 'absolute', top: '55%', right: 0 }}
      />
      <Image
        source={require('../../../assets/images/register/bottom_right.png')}
        style={{ position: 'absolute', bottom: 0, right: 0 }}
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
          <Text style={[{ color: 'white', fontSize: 18, fontFamily: 'SwissLight' }]}>Hey, mừng bạn đến với</Text>
          <Text style={[{ color: 'white', fontSize: 30, fontFamily: 'SwissBold' }]}>Pepsi Tết</Text>
        </View>

        <View style={{ flex: 2, alignContent: 'center' }}>
          <Text style={[{ textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'SwissBold' }]}>
            ĐĂNG NHẬP
          </Text>

          <TextInput style={styles.input} placeholder='Nhập email' onChangeText={(Text) => setEmail(Text)} />

          <TextInput style={styles.input} placeholder='Nhập mật khẩu' onChangeText={(Text) => setPassword(Text)} />
        </View>

        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '60%' }}>
            <WhiteButton
              text='Đăng nhập'
              onPress={async () => {
                signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user
                    handleUpdateUserData(user.uid)
                    // ...
                  })
                  .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorMessage)
                  })
              }}
            />

            <WhiteButton
              text={'Đăng ký'}
              onPress={() => {
                navigation.navigate('RegisterPage')
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    fontFamily: 'SwissLight',
    fontSize: 14,
    color: '#2D2D2D',
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

export default LoginPage
