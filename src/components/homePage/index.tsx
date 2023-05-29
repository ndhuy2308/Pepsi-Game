import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import WhiteButton from '../buttons/white_button'
import ChoiNgay from '../buttons/choi_ngay'
import { useDispatch, useSelector } from 'react-redux'
import { UserData, updateData } from '../../store/userDataSlice'
import { RootState } from '../../store/rootReducer'
import { useState } from 'react'
import firebaseapp from '../../FirebaseConfig'
import { doc, collection, initializeFirestore, setDoc } from 'firebase/firestore'
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

  const Play = async (type: number) => {
    //1 - miễn phí, 2 - quy đổi
    dispatch(
      updateData({
        MienPhi: type === 1 && data.MienPhi > 0 ? data.MienPhi - 1 : data.MienPhi,
        QuyDoi: type === 2 && data.QuyDoi > 0 ? data.QuyDoi - 1 : data.QuyDoi,
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
        UserID: data.UserID
      })
    )

    await setDoc(docRef, {
      MienPhi: type === 1 && data.MienPhi > 0 ? data.MienPhi - 1 : data.MienPhi,
      QuyDoi: type === 2 && data.QuyDoi > 0 ? data.QuyDoi - 1 : data.QuyDoi,
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
      PortableSpeaker: data.PortableSpeaker
    })
    navigation.navigate('Gameplay')
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
          <Text style={{ color: '#478449', fontSize: 22, paddingTop: 10 }}>BẠN MUỐN SỬ DỤNG LƯỢT CHƠI NÀO</Text>
          <Text numberOfLines={0} style={{ color: '#1D1C1C', textAlign: 'center', fontSize: 15, padding: 10 }}></Text>
          <View style={{ flexDirection: 'column', padding: 10 }}>
            <TouchableOpacity
              onPress={() => {
                Play(1)
              }}
            >
              <Text style={[{ color: 'black' }]}>Lượt chơi miễn phí {data.MienPhi}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Play(2)
              }}
            >
              <Text style={[{ color: 'black' }]}>Lượt chơi quy đổi {data.QuyDoi}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image
        source={require('../../../assets/images/homepage/goc-tren-trai.png')}
        style={{ flex: 1, position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/hoa-tren-trai.png')}
        style={{ flex: 1, position: 'absolute', top: '5%', left: 0, zIndex: 1 }}
      />
      <Image
        source={require('../../../assets/images/homepage/hoa-tren-giua.png')}
        style={{ flex: 1, position: 'absolute', top: '5%', left: '46%', zIndex: 1 }}
      />
      <Image
        source={require('../../../assets/images/homepage/goc-tren-trai-giua.png')}
        style={{ flex: 1, position: 'absolute', top: 0, left: '22%' }}
      />
      <Image
        source={require('../../../assets/images/homepage/giua-phai.png')}
        style={{ position: 'absolute', top: '50%', right: 0 }}
      />
      <Image source={require('../../../assets/images/3.png')} style={{ position: 'absolute', bottom: 0, left: 0 }} />
      <Image
        source={require('../../../assets/images/homepage/trong.png')}
        style={{ position: 'absolute', bottom: 0, right: '25%', left: '25%', zIndex: 1 }}
      />
      <Image
        source={require('../../../assets/images/homepage/cuoi-trang.png')}
        style={{ position: 'absolute', bottom: 0, alignSelf: 'center', zIndex: 0 }}
      />
      <Image
        source={require('../../../assets/images/hoa-trai.png')}
        style={{ position: 'absolute', top: '23%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/goc-tren-phai.png')}
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/giua-tren-phai.png')}
        style={{ position: 'absolute', top: '20%', right: 0 }}
      />
      <Image
        source={require('../../../assets/images/hoa-duoi.png')}
        style={{ position: 'absolute', top: '65%', left: 0 }}
      />
      <SafeAreaView style={{ flex: 8, justifyContent: 'flex-end', alignItems: 'center', zIndex: 3 }}>
        <View>
          <Image source={require('../../../assets/images/homepage/ca.png')} />

          <Text style={{ textAlign: 'center', color: '#FFDD00', fontSize: 18, fontWeight: 'bold' }}>Hướng dẫn</Text>

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

          <WhiteButton text={'Quét mã'}></WhiteButton>

          <WhiteButton text={'Bộ sưu tập'}></WhiteButton>

          <WhiteButton text={'Chi tiết quà tặng'}></WhiteButton>
        </View>
      </SafeAreaView>
      <View style={{ flex: 2 }}></View>
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
    backgroundColor: '#FC3B3B',
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
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
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
