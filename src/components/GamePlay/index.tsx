import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef, useEffect, useCallback } from 'react'
import { StyleSheet, View, Image, Animated, PanResponder, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { UserData, updateData } from '../../store/userDataSlice'

import { RootState } from '../../store/rootReducer'
import { useRoute } from '@react-navigation/native'
import firebaseapp from '../../FirebaseConfig'
import { StackScreenProps } from '@react-navigation/stack'
import { doc, collection, initializeFirestore, setDoc } from 'firebase/firestore'
import { RootStackParamList } from '../../types'

type GameplayScreenProps = StackScreenProps<RootStackParamList, 'Gameplay'>

export default function Gameplay({ navigation, route }: GameplayScreenProps) {
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  const { loai } = route.params
  const type: number = Number(loai)
  console.log(loai)
  const dispatch = useDispatch()
  //xử lí dữ liệu chơi game

  //db
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const docRef = doc(collection(db, 'data'), data.UserID)
  //
  const HandleGameplay = async () => {
    dispatch(
      updateData({
        MienPhi: type === 1 && data.MienPhi > 0 ? data.MienPhi - 1 : data.MienPhi,
        QuyDoi: type === 2 && data.QuyDoi > 0 ? data.QuyDoi - 1 : data.QuyDoi,
        An: data.An,
        Loc: data.Loc,
        Phuc: data.Phuc,
        Coins: type === 1 ? data.Coins + 50 : data.Coins + 100,
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
      Coins: type === 1 ? data.Coins + 50 : data.Coins + 100,
      BucketHat: data.BucketHat,
      Jacket: data.Jacket,
      ToteBag: data.ToteBag,
      Tumbler: data.Tumbler,
      AirpodCase: data.AirpodCase,
      ElectronicLunchBo: data.ElectronicLunchBo,
      PortableSpeaker: data.PortableSpeaker
    })
    if (data.MienPhi > 0 || data.QuyDoi) {
      navigation.navigate('Result', { loai_r: loai })
    } else {
      navigation.navigate('QrPage')
    }
  }

  const pan = useRef(new Animated.ValueXY()).current

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], {
      useNativeDriver: false
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.moveY < 550) {
        HandleGameplay()
      }
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start()
    }
  })

  return (
    <LinearGradient
      colors={['#02A7F0', '#0063A7']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 25, fontFamily: 'SwissBold', top: '10%' }}>VUỐT LÊN ĐỂ CHƠI</Text>
        <View style={{ flexDirection: 'row', top: '20%' }}>
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'SwissLight' }}>Bạn còn</Text>
          <Text style={{ color: '#FFDD00', fontSize: 17, fontFamily: 'SwissBold' }}>
            {' '}
            {type === 1 ? data.MienPhi : data.QuyDoi}{' '}
          </Text>
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'SwissLight' }}>
            lượt chơi {type === 1 ? 'miễn phí' : 'quy đổi'}
          </Text>
        </View>
        <Image
          source={require('../../../assets/images/gameplay/top_left.png')}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <Image
          source={require('../../../assets/images/gameplay/left_flower.png')}
          style={{ position: 'absolute', top: '66%', left: 0 }}
        />
        <Image
          source={require('../../../assets/images/gameplay/can_left.png')}
          style={{ zIndex: 0, position: 'absolute', left: 0 }}
        />
        <Image
          source={require('../../../assets/images/gameplay/can_right.png')}
          style={{ zIndex: 0, position: 'absolute', right: 0 }}
        />
        <Image
          source={require('../../../assets/images/gameplay/bottom_right.png')}
          style={{ zIndex: 0, position: 'absolute', right: 0, bottom: 0 }}
        />
        <Image
          source={require('../../../assets/images/gameplay/bottom_left.png')}
          style={{ zIndex: 0, position: 'absolute', left: 0, bottom: 0 }}
        />

        <Image
          source={require('../../../assets/images/gameplay/top_right.png')}
          style={{ zIndex: 0, position: 'absolute', right: 0, top: 0 }}
        />

        <Image
          source={require('../../../assets/images/gameplay/top_right_flower_20.png')}
          style={{ zIndex: 0, position: 'absolute', right: 0, top: '20%' }}
        />
        <Image
          source={require('../../../assets/images/gameplay/top_right_flower_76.png')}
          style={{ zIndex: 0, position: 'absolute', right: 0, top: '70%' }}
        />

        <Image
          source={require('../../../assets/images/gameplay/2up.png')}
          style={{ zIndex: 0, position: 'absolute', bottom: '17%' }}
        />
        <Animated.View style={[styles.box, { transform: [{ translateY: pan.y }] }]} {...panResponder.panHandlers}>
          <Image
            style={{ position: 'absolute', bottom: '-7%', alignSelf: 'center' }}
            source={require('../../../assets/images/homepage/ca.png')}
          />
        </Animated.View>
      </SafeAreaView>
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
  }
})
