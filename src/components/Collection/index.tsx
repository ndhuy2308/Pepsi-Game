import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, Animated, PanResponder, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import firebaseapp from '../../FirebaseConfig'
import { RootState } from '../../store/rootReducer'
import { UserData, updateData } from '../../store/userDataSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { initializeFirestore, setDoc, doc, getDoc, collection } from 'firebase/firestore'
import WhiteButton from '../buttons/white_button'
import { Modal } from 'react-native'
import RedBigButton from '../buttons/red_big_button'
import { Pressable } from 'react-native'
import RedButtonNo from '../buttons/red_button_no'
import RedButton from '../buttons/red_button'
import TopBar from '../buttons/topBar'

export default function Collection({ navigation }: { navigation: any }) {
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })

  const docRef = doc(collection(db, 'data'), data.UserID)
  const [unbox, setUnbox] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const temp = JSON.stringify(docSnap.data())
        const data = JSON.parse(temp)
        console.log(data)
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    fetchData().catch(console.error)
  }, [])
  const [coin, setCoin] = useState(0)
  const minValue = Math.min(data.An, data.Phuc, data.Loc)
  const [value, setValue] = useState<number>(minValue > 0 ? 1 : 0)
  useEffect(() => {
    setValue(minValue > 0 ? 1 : 0)
  }, [minValue])
  const handleButton = (type: number) => {
    // type 1: giảm, 2: tăng
    if (type === 1 && value > 1) {
      setValue(value - 1)
    } else if (type === 2 && value < minValue) {
      setValue(value + 1)
    }
  }
  //random phần quà

  // const items = [
  //   'BucketHat',
  //   'Jacket',
  //   'ToteBag',
  //   'Tumbler',
  //   'AirpodCase',
  //   'ElectronicLunchBox',
  //   'PortableSpeaker',
  //   'Coins'
  // ]
  // const randomGifts = (x: number): string[] => {
  //   const results: string[] = []

  //   for (let i = 0; i < x; i++) {
  //     let index = Math.floor(Math.random() * items.length)
  //     results.push(items[index])
  //   }

  //   return results
  // }

  const exchangeButton = async (value: number) => {
    // const gifts = randomGifts(value)
    // let countBucketHat = 0
    // let countJacket = 0
    // let countToteBag = 0
    // let countTumbler = 0
    // let countAirpodCase = 0
    // let countElectronicLunchBox = 0
    // let countPortableSpeaker = 0
    // let countCoins = 0
    // gifts.forEach((gift) => {
    //   if (gift === 'BucketHat') {
    //     countBucketHat++
    //   } else if (gift === 'Jacket') {
    //     countJacket++
    //   } else if (gift === 'ToteBag') {
    //     countToteBag++
    //   } else if (gift === 'Tumbler') {
    //     countTumbler++
    //   } else if (gift === 'AirpodCase') {
    //     countAirpodCase++
    //   } else if (gift === 'ElectronicLunchBox') {
    //     countElectronicLunchBox++
    //   } else if (gift === 'PortableSpeaker') {
    //     countPortableSpeaker++
    //   } else if (gift === 'Coins') {
    //     countCoins++
    //   }
    // })
    await dispatch(
      updateData({
        MienPhi: data.MienPhi,
        QuyDoi: data.QuyDoi,
        An: data.An - value,
        Loc: data.Loc - value,
        Phuc: data.Phuc - value,
        Coins: data.Coins + value * 300,
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
    await setCoin(value * 300)
    await setDoc(docRef, {
      MienPhi: data.MienPhi,
      QuyDoi: data.QuyDoi,
      An: data.An - value,
      Loc: data.Loc - value,
      Phuc: data.Phuc - value,
      Coins: data.Coins + data.Coins + value * 300,
      BucketHat: data.BucketHat,
      Jacket: data.Jacket,
      ToteBag: data.ToteBag,
      Tumbler: data.Tumbler,
      AirpodCase: data.AirpodCase,
      ElectronicLunchBo: data.ElectronicLunchBo,
      PortableSpeaker: data.PortableSpeaker
    })
  }
  //modal
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const [index, setIndex] = useState(0)

  const position = React.useRef(new Animated.Value(0)).current

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

      <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TopBar pageTitle='Bộ sưu tập' isHomePage={false} />
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require('../../../assets/images/qr_collection_gift/circle_coin.png')}
          />
          <View
            style={{ position: 'absolute', width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontFamily: 'SwissBold', color: 'white', fontSize: 32 }}>{data.Coins}</Text>
          </View>
        </View>
        <Text style={{ fontFamily: 'SwissBold', color: 'white', fontSize: 18, textAlign: 'center' }}>
          Số coins hiện tại của bạn
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 70, height: 181 }}
              source={require('../../../assets/images/gameplay/an.png')}
              resizeMode='contain'
            />
            <Text style={{ fontFamily: 'SwissBold', fontSize: 16, color: 'white' }}>{data.An}</Text>
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 50 }}>
            <Image
              style={{ width: 70, height: 181 }}
              source={require('../../../assets/images/gameplay/loc.png')}
              resizeMode='contain'
            />
            <Text style={{ fontFamily: 'SwissBold', fontSize: 16, color: 'white' }}>{data.Loc}</Text>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 70, height: 181 }}
              source={require('../../../assets/images/gameplay/phuc.png')}
              resizeMode='contain'
            />
            <Text style={{ fontFamily: 'SwissBold', fontSize: 16, color: 'white' }}>{data.Phuc}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleButton(1)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: value != minValue || value === 0 ? '#005082' : '#D02027',
                  borderRadius: 28,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'SwissBold', fontSize: 16, top: -2 }}>
                  -
                </Text>
              </View>
            </TouchableOpacity>

            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginHorizontal: 10,
                fontFamily: 'SwissBold',
                fontSize: 16,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              {value}
            </Text>

            <TouchableOpacity onPress={() => handleButton(2)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: value === minValue ? '#005082' : '#D02027',
                  borderRadius: 28,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'SwissBold', fontSize: 16, top: -2 }}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '60%' }}>
          <RedButton
            text='Đổi ngay'
            onPress={() => {
              setModalVisible(true)
            }}
          />
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View
            style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ opacity: 1 }}>
              <View>
                <Image
                  source={
                    unbox
                      ? require('../../../assets/images/qr_collection_gift/gift_coin.png')
                      : require('../../../assets/images/qr_collection_gift/giftBoxUnboxed.png')
                  }
                />

                <View style={{ flexDirection: 'column', opacity: 1, alignSelf: 'center' }}>
                  {unbox ? (
                    <>
                      <View style={{ margin: 20 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'SwissLight', fontSize: 18 }}>
                          Bạn nhận được
                        </Text>
                        <Text style={{ textAlign: 'center', color: '#FFDD00', fontFamily: 'SwissBold', fontSize: 18 }}>
                          {coin} coins
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'SwissLight' }}>
                        Bạn có chắc chắn muốn đổi
                      </Text>
                      <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'SwissLight' }}>
                        {value} combo hay không?
                      </Text>
                      <View style={{ width: '100%', alignSelf: 'center' }}>
                        <RedButtonNo
                          text='Đổi ngay'
                          onPress={() => {
                            if (value > 0) {
                              setUnbox(true)
                              exchangeButton(value)
                            }
                          }}
                        />
                      </View>
                    </>
                  )}
                </View>

                <Pressable
                  onPress={() => {
                    if (unbox) {
                      setUnbox(false)
                    }
                    setModalVisible(false)
                  }}
                  style={{
                    borderRadius: 50,
                    width: 25,
                    height: 25,
                    borderWidth: 1,
                    borderColor: 'white',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    top: 10
                  }}
                >
                  <Text style={{ color: 'white', alignSelf: 'center' }}>X</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
