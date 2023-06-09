import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import WhiteButton from '../buttons/white_button'
import { useDispatch, useSelector } from 'react-redux'
import { UserData, updateData } from '../../store/userDataSlice'
import { RootState } from '../../store/rootReducer'
import { useState } from 'react'
import firebaseapp from '../../FirebaseConfig'
import { StackNavigationProp } from '@react-navigation/stack'
import { doc, collection, initializeFirestore, setDoc } from 'firebase/firestore'
import { RootStackParamList } from '../../types'
import { getAuth, signOut } from 'firebase/auth'
import RedBigButton from '../buttons/red_big_button'
import TopBar from '../buttons/topBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import RedButtonNo from '../buttons/red_button_no'
type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}
export default function HomePage({ navigation }: { navigation: any }) {
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  console.log('User id: ', data.UserID)
  const [modalVisible, setModalVisible] = useState(false) // cho modal
  const [modalVisibleQR, setModalVisibleQR] = useState(false) // cho modal
  const auth = getAuth()
  const dispatch = useDispatch()
  const windowWidth = Dimensions.get('window').width
  const imageWidth = windowWidth * 0.4
  //db
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })

  const MienPhi = data.MienPhi
  const QuyDoi = data.QuyDoi

  const Play = (type: number) => {
    //1 - miễn phí, 2 - quy đổi
    const loai: number = type
    navigation.navigate('Gameplay', { loai: loai })
  }
  return (
    <LinearGradient
      colors={['#02A7F0', '#0063A7']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ flex: 1 }}
    >
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisibleQR}
        onRequestClose={() => {
          setModalVisible(!modalVisibleQR)
        }}
      >
        <View style={[styles.modalView, { backgroundColor: '#0063A7' }]}>
          <Text
            style={{
              fontFamily: 'SwissLight',
              top: 10,
              padding: 5,
              fontSize: 23,
              color: '#0063A7',
              textAlign: 'center'
            }}
          >
            Bạn có chắc chắn muốn
          </Text>
          <View style={{ margin: 20, alignItems: 'center' }}>
            <Text style={{ color: '#FFDD00', fontSize: 22, fontFamily: 'SwissBold' }}>BẠN ĐÃ HẾT LƯỢT!</Text>
            <Text style={{ textAlign: 'center', fontFamily: 'SwissLight', color: 'white', fontSize: 18 }}>
              Hãy scan thêm mã trên bill mua nước hoặc combo Pepsi rạp để nhận thêm lượt chơi
            </Text>
          </View>
          <View style={{ width: '60%' }}>
            <RedButtonNo
              text='Scan ngay'
              onPress={() => {
                setModalVisibleQR(false)
                navigation.navigate('QrPage')
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#D02027',
              borderWidth: 2,
              borderColor: '#FEEEA4',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 55
            }}
            onPress={() => {
              setModalVisible(false) // đóng modal
            }}
          >
            <Text style={{ color: 'white', fontSize: 17, top: -2 }}>x</Text>
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/gameplay/popup_choi_top_left.png')}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
          <Image
            source={require('../../../assets/images/gameplay/popup_choi_top_left_80.png')}
            style={{ position: 'absolute', top: '80%', left: 0 }}
          />
          <Image
            source={require('../../../assets/images/gameplay/popup_choi_right.png')}
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
          <Text
            style={{ color: '#D02027', fontSize: 22, paddingTop: 50, fontFamily: 'SwissBold', textAlign: 'center' }}
          >
            BẠN MUỐN SỬ DỤNG LƯỢT CHƠI NÀO?
          </Text>
          <Text numberOfLines={0} style={{ color: '#1D1C1C', textAlign: 'center', fontSize: 15, padding: 10 }}></Text>
          <View style={{ flexDirection: 'column', padding: 10, width: '90%' }}>
            <RedBigButton
              text='Chơi miễn phí'
              luotChoi={data.MienPhi}
              onPress={() => {
                if (data.MienPhi > 0) {
                  Play(1)

                  setModalVisible(!modalVisible)
                }
              }}
              disabled={data.MienPhi > 0 ? false : true}
            ></RedBigButton>
            <RedBigButton
              text='Chơi quy đổi'
              luotChoi={data.QuyDoi}
              onPress={() => {
                if (data.QuyDoi > 0) {
                  Play(2)
                  setModalVisible(!modalVisible)
                }
              }}
              disabled={data.QuyDoi > 0 ? false : true}
            ></RedBigButton>
          </View>
        </View>
      </Modal>

      <Image
        source={require('../../../assets/images/homepage/top_left.png')}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/bottom_left_60.png')}
        style={{ position: 'absolute', top: '50%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/left_bottom.png')}
        style={{ position: 'absolute', bottom: 0, left: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/top_right.png')}
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/top_right_20.png')}
        style={{ position: 'absolute', top: '15%', right: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/bottom_right_vector.png')}
        style={{ position: 'absolute', top: '50%', right: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/right_bottom.png')}
        style={{ position: 'absolute', bottom: 0, right: 0 }}
      />
      <View
        style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0 }}
      >
        <Image source={require('../../../assets/images/homepage/trong.png')} />
      </View>

      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', zIndex: 3 }}>
        <TopBar pageTitle='' isHomePage={true} />
        <View>
          <Image source={require('../../../assets/images/homepage/ca.png')} />

          <Text style={{ textAlign: 'center', color: '#FFDD00', fontSize: 18, fontFamily: 'SwissBold' }}>
            Hướng dẫn
          </Text>

          <View style={{ padding: 5 }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                if (data.MienPhi + data.QuyDoi > 0) {
                  setModalVisible(true)
                } else {
                  setModalVisibleQR(true)
                }
              }}
            >
              <Image style={styles.bottomImage} source={require('../../../assets/images/buttons/cn-duoi.png')} />
              <Image style={styles.topImage} source={require('../../../assets/images/buttons/cn-tren.png')} />
              <Image
                style={styles.redDotImage}
                source={require('../../../assets/images/buttons/choi-ngay-red-dot.png')}
              />
              <Image style={styles.centerImage} source={require('../../../assets/images/buttons/choi-ngay-bh.png')} />
              <Text style={styles.buttonText}>Chơi ngay</Text>
              <Text style={styles.buttonTextSmall}>Bạn có tổng cộng {MienPhi + QuyDoi} lượt chơi</Text>
            </TouchableOpacity>
          </View>

          <WhiteButton
            text='Quét mã'
            onPress={() => {
              navigation.navigate('QrPage')
            }}
            disabled={false}
          />

          <WhiteButton
            text='Bộ sưu tập'
            onPress={() => {
              navigation.navigate('Collection')
            }}
            disabled={false}
          />
          <WhiteButton
            text='Chi tiết quà tặng'
            onPress={() => {
              navigation.navigate('GiftPage')
            }}
            disabled={false}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#D02027',
    margin: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'yellow',
    width: '100%',
    height: 60,
    zIndex: 1,
    overflow: 'hidden'
  },

  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2
  },
  redDotImage: {
    position: 'absolute',
    top: 50,
    zIndex: 3
  },
  centerImage: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 4
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 0
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 5
  },
  buttonTextSmall: {
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 5
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
