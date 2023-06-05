import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { StyleSheet, View, Image, Animated, Modal, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import firebaseapp from '../../FirebaseConfig'
import { RootState } from '../../store/rootReducer'
import { UserData, updateData } from '../../store/userDataSlice'
import WhiteButton from '../buttons/white_button'
import { initializeFirestore, setDoc, doc, collection } from 'firebase/firestore'
import TopBar from '../buttons/topBar'
import RedButton from '../buttons/red_button'
import RedButtonNo from '../buttons/red_button_no'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function QrPage({ navigation }: { navigation: any }) {
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const docRef = doc(collection(db, 'data'), data.UserID)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const [value, setValue] = useState<number>(0)
  const doUpdate = async () => {
    const randomValue = Math.random() < 0.5 ? 1 : 2
    setValue(randomValue)
    dispatch(
      updateData({
        MienPhi: data.MienPhi,
        QuyDoi: randomValue === 1 ? data.QuyDoi + 5 : data.QuyDoi,
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
      MienPhi: data.MienPhi,
      QuyDoi: randomValue === 1 ? data.QuyDoi + 5 : data.QuyDoi,
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
  }

  return (
    <LinearGradient
      colors={['#02A7F0', '#0063A7']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <Image
        source={require('../../../assets/images/qr_collection_gift/top_left.png')}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <Image
        source={require('../../../assets/images/qr_collection_gift/top_left_15.png')}
        style={{ position: 'absolute', top: '25%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/qr_collection_gift/top_left_40.png')}
        style={{ position: 'absolute', top: '40%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/qr_collection_gift/top_left_70.png')}
        style={{ position: 'absolute', top: '70%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/qr_collection_gift/top_right.png')}
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <Image
        source={require('../../../assets/images/qr_collection_gift/top_right_40.png')}
        style={{ position: 'absolute', top: '35%', right: 0 }}
      />
      <Image
        source={require('../../../assets/images/qr_collection_gift/top_right_70.png')}
        style={{ position: 'absolute', top: '65%', right: 0 }}
      />
      <Image
        source={require('../../../assets/images/qr_collection_gift/bottom_right.png')}
        style={{ position: 'absolute', bottom: 0, right: 0 }}
      />

      <SafeAreaView style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <TopBar pageTitle='Quét mã' isHomePage={false} />
        <Image style={{ alignSelf: 'center' }} source={require('../../../assets/images/qr.png')}></Image>
        <View style={{ width: '60%' }}>
          <RedButton
            text='Quét mã'
            onPress={() => {
              doUpdate()
              setModalVisible(true)
            }}
          />
        </View>
      </SafeAreaView>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modalView}>
          {value === 1 ? ( // đúng (random 5 lượt)
            <>
              <Image
                style={{ position: 'absolute', top: -50 }}
                source={require('../../../assets/images/qr_collection_gift/gift_qr_success.png')}
              />
              <Text style={{ color: 'black', fontFamily: 'SwissLight', fontSize: 24, top: 30, padding: 50 }}>
                Bạn nhận được
              </Text>
              <Text style={{ color: '#005082', fontFamily: 'SwissBold', fontSize: 72 }}>5</Text>
              <Text style={{ color: 'black', fontFamily: 'SwissLight', fontSize: 24, paddingBottom: 50 }}>
                lượt chơi
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontFamily: 'SwissLight', fontSize: 22 }}>Bạn đang có</Text>
                <Text style={{ color: '#005082', fontFamily: 'SwissBold', fontSize: 25, top: -3 }}>
                  {' '}
                  {data.MienPhi + data.QuyDoi}{' '}
                </Text>
                <Text style={{ color: 'black', fontFamily: 'SwissLight', fontSize: 22 }}>lượt chơi</Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <RedButtonNo text='Scan tiếp' onPress={() => setModalVisible(false)} />
                <RedButtonNo text='Chơi ngay' onPress={() => navigation.navigate('Home')} />
              </View>
            </>
          ) : (
            // sai
            <>
              <View style={{ width: '90%', justifyContent: 'center', padding: 30 }}>
                <Text
                  style={{
                    color: '#D02027',
                    fontFamily: 'SwissBold',
                    fontSize: 24,
                    textAlign: 'center',
                    lineHeight: 28
                  }}
                >
                  Hệ thống không nhận diện được hình ảnh!
                </Text>
                <RedButtonNo text='Scan lại' onPress={() => setModalVisible(false)} />
              </View>
            </>
          )}
        </View>
      </Modal>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    width: '100%',
    height: '100%'
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
