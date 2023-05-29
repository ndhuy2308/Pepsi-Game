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
          <Text style={[{ textAlign: 'center', color: 'white', fontSize: 24 }]}>Đăng nhập</Text>

          <TextInput style={styles.input} placeholder='Nhập email' onChangeText={(Text) => setEmail(Text)} />

          <TextInput style={styles.input} placeholder='Nhập mật khẩu' onChangeText={(Text) => setPassword(Text)} />
        </View>

        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '65%' }}>
            <TouchableOpacity
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
            >
              <WhiteButton text={'Đăng nhập'} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
              <WhiteButton text={'Đăng ký'} />
            </TouchableOpacity>
          </View>
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

export default LoginPage
