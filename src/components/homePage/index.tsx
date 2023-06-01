import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
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
import RedBigButton from '../buttons/red_big_button'
type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}
export default function HomePage({ navigation }: { navigation: any }) {
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  const [modalVisible, setModalVisible] = useState(false) // cho modal
  const dispatch = useDispatch()

  //db
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const docRef = doc(collection(db, 'data'), data.UserID)

  //xử lí dữ liệu chơi game
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
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modalView}>
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
                Play(1)
              }}
            ></RedBigButton>
            <RedBigButton
              text='Chơi quy đổi'
              luotChoi={data.QuyDoi}
              onPress={() => {
                Play(2)
              }}
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
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 3 }}>
        <View>
          <Image source={require('../../../assets/images/homepage/ca.png')} />

          <Text style={{ textAlign: 'center', color: '#FFDD00', fontSize: 18, fontFamily: 'SwissBold' }}>
            Hướng dẫn
          </Text>

          <View style={{ padding: 5 }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(!modalVisible)}>
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
          />

          <WhiteButton
            text='Bộ sưu tập'
            onPress={() => {
              navigation.navigate('Collection')
            }}
          />
          <WhiteButton
            text='Chi tiết quà tặng'
            onPress={() => {
              navigation.navigate('GiftPage')
            }}
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
