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
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useCallback, useState, useEffect, useContext } from 'react'
import WhiteButton from '../buttons/white_button'
import firebaseapp from '../../FirebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store/rootReducer'
import { UserData, updateData } from '../../store/userDataSlice'

import { initializeFirestore, doc, getDoc, collection, getDocs, DocumentData } from 'firebase/firestore'
import { setImages, selectImages } from '../../store/imagesSlice'
const { width, height } = Dimensions.get('window')
const windowWidth = Dimensions.get('window').width
const textInputWidth = windowWidth * 0.9

interface ImageFirestore {
  name: string
  image: DocumentData
}
interface ImageDispatch {
  name: string
  image: DocumentData
}
function LoginPage({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [namesImage, setNameImage] = useState<any>()
  const [listImage, setListImage] = useState<any>()
  const auth = getAuth(firebaseapp)
  const dispatch = useDispatch()
  const dataImg: ImageFirestore[] = useSelector(selectImages)
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const [didDispatch, setDidDispatch] = useState(false)
  const [modalVisible, setModalVisible] = useState(false) // cho modal error form
  const [error, setError] = useState('')
  // useEffect(() => {
  //   // Define an async function to fetch data from firestore
  //   const getImage = async () => {
  //     // Get a query snapshot of the gameInterface collection
  //     const querySnapshot = await getDocs(collection(db, "gameInterface"))
  //     // Create an empty array to store the image objects
  //     const imagesArray: ImageFirestore[] = []
  //     // Loop over the query snapshot and push each document data to the array
  //     querySnapshot.forEach(doc => {
  //       // doc.data() is never undefined for query doc snapshots
  //       const name: string = doc.id.toString()
  //       const image: DocumentData = doc.data()
  //       // Push the image object to the array
  //       imagesArray.push({
  //         name,
  //         image
  //       })
  //     })
  //     // Dispatch setImages action with the images array as payload

  //     const tempJSON = JSON.parse(JSON.stringify(imagesArray[0].image))
  //     const names = []
  //     const images = []
  //     for (var key in tempJSON) { // duyệt qua các thuộc tính của đối tượng
  //         names.push(key); // đẩy tên của nó vào mảng names
  //         images.push(tempJSON[key]); // đẩy giá trị của nó vào mảng values
  //     }
  //     const imagesArrayTemp: ImageDispatch[] = []
  //     for (let i = 0; i < names.length; i++) {
  //       // Push the image object to the array
  //       imagesArrayTemp.push({
  //         name: names[i],
  //         image: images[i]
  //       })
  //     }
  //     dispatch()
  //     setNameImage(names)
  //     setListImage(images)
  //   }
  //   // Call the async function
  //   getImage()

  // }, [dispatch])

  function getImgSource(text: string, names: any, images: any) {
    const index = names.findIndex((value: any) => value === text)
    return images[index]
  }

  const handleUpdateUserData = async (id: string) => {
    const docRef = doc(db, 'data', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const temp = JSON.stringify(docSnap.data())
      const data: UserData = JSON.parse(temp)
      // Đợi dispatch hoàn thành
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
      // Gọi navigation.navigate sau khi dispatch xong
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  const imgSource = [
    '../../../assets/images/gameplay/an.png',
    '../../../assets/images/gameplay/phuc.png',
    '../../../assets/images/gameplay/loc.png'
  ]

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

              <TextInput
                style={styles.input}
                placeholder='Nhập mật khẩu'
                onChangeText={(Text) => setPassword(Text)}
                secureTextEntry={true}
              />
            </View>

            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '60%' }}>
                <WhiteButton
                  text='Đăng nhập'
                  disabled={false}
                  onPress={async () => {
                    await signInWithEmailAndPassword(auth, email, password)
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
                        setModalVisible(true)
                        let errorTemp = ''
                        setError('Tài khoản hoặc mật khẩu không hợp lệ')
                      })
                  }}
                />

                <WhiteButton
                  text={'Đăng ký'}
                  disabled={false}
                  onPress={() => {
                    navigation.navigate('RegisterPage')
                  }}
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
    fontSize: 14,
    color: '#2D2D2D',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: textInputWidth,
    alignSelf: 'center'
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

export default LoginPage
