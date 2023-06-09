import { LinearGradient } from 'expo-linear-gradient'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Dimensions,
  Keyboard,
  Modal
} from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import firebaseapp from '../../FirebaseConfig'
import { doc, collection, initializeFirestore, setDoc } from 'firebase/firestore'

import WhiteButton from '../buttons/white_button'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from 'react-redux'
import { updateData } from '../../store/userDataSlice'
const { width, height } = Dimensions.get('window')
const windowWidth = Dimensions.get('window').width
const textInputWidth = windowWidth * 0.9
function RegisterPage({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const auth = getAuth(firebaseapp)
  //checkbox
  const [isChecked, setisChecked] = useState(false)
  const [imageSource, setImageSource] = useState(require('../../../assets/images/notChecked.png'))
  const [modalVisible, setModalVisible] = useState(false) // cho modal error form
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const handleCheckbox = () => {
    setisChecked(!isChecked)
    setImageSource(
      !isChecked ? require('../../../assets/images/checked.png') : require('../../../assets/images/notChecked.png')
    )
  }

  //email check
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  function isEmailValid(email: string) {
    return emailRegex.test(email)
  }
  const handleSignUpAndCreateUserData = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const userId = user.uid

      const db = initializeFirestore(firebaseapp, {
        experimentalForceLongPolling: true
      })
      const docRef = doc(collection(db, 'data'), userId)
      await setDoc(docRef, {
        MienPhi: 3,
        QuyDoi: 3,
        An: 0,
        Loc: 0,
        Phuc: 0,
        Coins: 0,
        BucketHat: 0,
        Jacket: 0,
        ToteBag: 0,
        Tumbler: 0,
        AirpodCase: 0,
        ElectronicLunchBo: 0,
        PortableSpeaker: 0,
        userId: userId
      })
      await dispatch(
        updateData({
          MienPhi: 3,
          QuyDoi: 3,
          An: 0,
          Loc: 0,
          Phuc: 0,
          Coins: 0,
          BucketHat: 0,
          Jacket: 0,
          ToteBag: 0,
          Tumbler: 0,
          AirpodCase: 0,
          ElectronicLunchBo: 0,
          PortableSpeaker: 0,
          UserID: userId
        })
      )
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      if (errorCode === 'auth/email-already-in-use') {
        setError('Email đã tồn tại trên hệ thống, vui lòng thay đổi!')
      } else {
        setError('Có lỗi từ phía máy chủ, vui lòng thử lại!')
      }
      setModalVisible(true)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={[styles.modalView]}>
          <Text
            style={{
              fontFamily: 'SwissBold',
              top: 10,
              padding: 5,
              fontSize: 23,
              color: '#D02027',
              textAlign: 'center'
            }}
          >
            Lỗi:
          </Text>
          <Text
            style={{
              fontFamily: 'SwissLight',
              top: 10,
              padding: 5,
              fontSize: 23,
              color: '#005082',
              textAlign: 'center'
            }}
          >
            {error}
          </Text>
          <View style={{ width: '60%', margin: 20 }}>
            <WhiteButton text='Thử lại' onPress={() => setModalVisible(false)} disabled={false} />
          </View>
        </View>
      </Modal>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                flex: 3,
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={[{ color: 'white', fontSize: 18, fontFamily: 'SwissLight', top: 5 }]}>
                Hey, mừng bạn đến với
              </Text>
              <Text style={[{ color: 'white', fontSize: 30, fontFamily: 'SwissBold' }]}>Pepsi Tết</Text>
            </View>

            <View style={{ flex: 7, alignContent: 'center' }}>
              <Text style={[{ textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'SwissBold' }]}>
                ĐĂNG KÝ
              </Text>

              <View style={{ marginVertical: 10 }}>
                <TextInput style={styles.input} placeholder='Nhập email' onChangeText={(Text) => setEmail(Text)} />
              </View>

              <View style={{ marginVertical: 10 }}>
                <TextInput
                  style={styles.input}
                  placeholder='Nhập mật khẩu'
                  secureTextEntry={true}
                  onChangeText={(Text) => setPassword(Text)}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <TextInput
                  style={styles.input}
                  placeholder='Nhập lại mật khẩu'
                  secureTextEntry={true}
                  onChangeText={(Text) => setRePassword(Text)}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleCheckbox}>
                  <Image style={{ width: 20, height: 20 }} source={imageSource} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 5, color: 'white', fontSize: 14, fontFamily: 'SwissLight' }}>
                  Tôi đã đọc và đồng ý với{' '}
                </Text>
                <Text style={{ color: '#FFDD00', fontSize: 14, fontFamily: 'SwissBold' }}>thể lệ chương trình</Text>
                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'SwissLight' }}> Pepsi Tết</Text>
              </View>
            </View>

            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '60%' }}>
                <WhiteButton
                  text='Đăng ký'
                  onPress={() => {
                    if (email.length === 0 || password.length === 0 || rePassword.length === 0) {
                      setError('Vui lòng điền đầy đủ các trường!')
                      setModalVisible(true)
                    } else {
                      if (!isEmailValid(email)) {
                        setError('Email không đúng định dạng, vui lòng thử lại!')
                        setModalVisible(true)
                      }
                      if (!isChecked) {
                        setError('Vui lòng đồng ý với thể lệ chương trình!')
                        setModalVisible(true)
                      }
                      if (password.length < 6) {
                        setError('Mật khẩu phải có độ dài từ 6 ký tự trở lên!')
                        setModalVisible(true)
                      } else {
                        if (rePassword != password) {
                          setError('Nhập lại mật khẩu không trùng khớp, vui lòng thử lại!')
                          setModalVisible(true)
                        }
                      }
                    }

                    if (isChecked && rePassword === password && isEmailValid(email)) {
                      handleSignUpAndCreateUserData()
                    }
                  }}
                  disabled={false}
                />
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    fontFamily: 'SwissLight',
    padding: 10,
    borderRadius: 8,
    width: textInputWidth,
    alignSelf: 'center'
  },
  checkboxNotChecked: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    top: '33.33%',
    bottom: '30.81%',
    backgroundColor: 'white'
  },
  modalView: {
    top: '20%',
    alignSelf: 'center',
    backgroundColor: '#FBD239',
    borderRadius: 20,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})

export default RegisterPage
