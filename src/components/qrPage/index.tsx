import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef } from 'react'
import { StyleSheet, View, Image, Animated, PanResponder, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import firebaseapp from '../../FirebaseConfig'
import { RootState } from '../../store/rootReducer'
import { UserData, updateData } from '../../store/userDataSlice'
import WhiteButton from '../buttons/white_button'
import { initializeFirestore, setDoc, doc, collection } from 'firebase/firestore'

export default function QrPage({ navigation }: { navigation: any }) {
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const docRef = doc(collection(db, 'data'), data.UserID)
  const dispatch = useDispatch()

  const doUpdate = async () => {
    const randomValue = Math.random() < 0.5 ? 1 : 2
    console.log(randomValue === 1 ? '5 lượt' : 'Failed')
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

      <Image source={require('../../../assets/images/qr.png')}></Image>
      <View style={{ width: '60%' }}>
        <WhiteButton text='Quét mã' onPress={() => doUpdate()} />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: '100%',
    height: '100%'
  }
})
