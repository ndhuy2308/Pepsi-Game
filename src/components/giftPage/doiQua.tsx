import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Image, ListRenderItem, Modal } from 'react-native'

import {
  initializeFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  onSnapshot,
  QuerySnapshot,
  query
} from 'firebase/firestore'
import firebaseapp from '../../FirebaseConfig'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { UserData, updateData } from '../../store/userDataSlice'
import { RootState } from '../../store/rootReducer'
import { useState, useEffect } from 'react'
import RedButton from '../buttons/red_button'
import WhiteButton from '../buttons/white_button'
import RedBigButton from '../buttons/red_big_button'
import RedButtonNo from '../buttons/red_button_no'

interface Doc {
  image: string
  quantity: number
  id: number
  name: string
  title: string
  cost: number
}
interface RenderItemProps {
  item: Doc[]
}
interface Gifts {
  [key: string]: number // index signature
  BucketHat: number
  Jacket: number
  ToteBag: number
  Tumbler: number
  AirpodCase: number
  ElectronicLunchBo: number
  PortableSpeaker: number
}

export default function DoiQua() {
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  const { width, height } = Dimensions.get('window')
  const windowWidth = Dimensions.get('window').width
  const [imageSource, setImageSource] = useState<Doc[]>([])
  // cho modal
  const [modalVisible, setModalVisible] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [cost, setCost] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)

  //cho form nhận quà
  const [in_Name, setInName] = useState('')
  const [in_PhoneNumber, setInPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [verifyAddress, setVerifyAdress] = useState(false)
  const [note, setNote] = useState('')

  //
  const dispatch = useDispatch()
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  function generateUniqueID() {
    const now = new Date()
    const year = now.getFullYear().toString() // lấy năm và chuyển thành string
    const month = ('0' + (now.getMonth() + 1)).slice(-2) // lấy tháng và chuyển thành string với độ dài cố định là 2
    const day = ('0' + now.getDate()).slice(-2) // lấy ngày và chuyển thành string với độ dài cố định là 2
    const hour = ('0' + now.getHours()).slice(-2) // lấy giờ và chuyển thành string với độ dài cố định là 2
    const minutes = ('0' + now.getMinutes()).slice(-2) // lấy phút và chuyển thành string với độ dài cố định là 2
    const seconds = ('0' + now.getSeconds()).slice(-2) // lấy giây và chuyển thành string với độ dài cố định là 2
    const milliseconds = now.getMilliseconds().toString() // lấy milliseconds và chuyển thành string
    const uniqueID = year + month + day + hour + minutes + seconds + milliseconds
    return uniqueID
  }
  const handleFirestore = async () => {
    const giftReceptionRef = doc(collection(db, 'giftReception'), name, 'data', generateUniqueID())
    await setDoc(giftReceptionRef, {
      Id: data.UserID,
      FullName: in_Name,
      PhoneNumber: in_PhoneNumber,
      Address: address,
      Note: note,
      status: false
    })

    console.log('Handle firestore')
  }
  const handleExchangePress = async (name: string, quantity: number, cost: number) => {
    //truy vấn tới gift
    const giftRef = doc(db, 'gift', name)

    //truy vấn tới dữ liệu của người dùng
    const dataRef = doc(db, 'data', data.UserID)

    //tạo thêm dữ liệu nhận quà

    let gifts: Gifts = {
      BucketHat: data.BucketHat,
      Jacket: data.Jacket,
      ToteBag: data.ToteBag,
      Tumbler: data.Tumbler,
      AirpodCase: data.AirpodCase,
      ElectronicLunchBo: data.ElectronicLunchBo,
      PortableSpeaker: data.PortableSpeaker
    }
    if (quantity > 0) {
      await dispatch(
        updateData({
          MienPhi: data.MienPhi,
          QuyDoi: data.QuyDoi,
          An: data.An,
          Loc: data.Loc,
          Phuc: data.Phuc,
          Coins: data.Coins - cost,
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

      await updateDoc(dataRef, {
        Coins: data.Coins - cost
      }).catch(console.error)
      await updateDoc(giftRef, {
        quantity: quantity - 1
      }).catch(console.error)
    } else {
      console.log('Bạn đã hết quà')
    }
  }

  useEffect(() => {
    const q = query(collection(db, 'gift'))
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const giftArray: Doc[] = [] // create an empty array
      querySnapshot.forEach((doc: any) => {
        const gift = doc.data() as Doc // get the gift data
        giftArray.push(gift)
      })
      setImageSource(giftArray) // update the state with the array
    })
  }, [])

  const chunkArray = (array: Doc[], size: number) => {
    const result: Doc[][] = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }
  const renderItem: ListRenderItem<Doc[]> = ({ item }: RenderItemProps) => (
    <FlatList
      scrollEnabled={false}
      data={item}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 12, width: windowWidth * 0.4 }}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              width: 63,
              height: 39
            }}
          >
            {data.Coins >= item.cost ? (
              <Image source={require('../../../assets/images/qr_collection_gift/top_right_badge.png')} />
            ) : (
              <Image source={require('../../../assets/images/qr_collection_gift/top_right_badge_disabled.png')} />
            )}
            <Text
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
                fontFamily: 'SwissBold',
                bottom: 5
              }}
            >
              {item.cost}
            </Text>
          </View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 150, height: 150, opacity: data.Coins < item.cost ? 0.8 : 1, alignSelf: 'center' }}
            resizeMode='contain'
          />
          <View
            style={{
              backgroundColor: data.Coins < item.cost ? '#ACACAC' : '#D02027',
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12
            }}
          >
            <View style={{ margin: 15, height: 50 }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  fontFamily: 'SwissBold',
                  color: data.Coins < item.cost ? 'white' : '#FFDD00'
                }}
              >
                {item.title}
              </Text>
              <Text style={{ alignSelf: 'center', fontSize: 12, fontFamily: 'SwissLight', color: 'white' }}>
                Còn lại: {item.quantity}
              </Text>
            </View>
            <View style={{ width: '80%', alignSelf: 'center', margin: 5 }}>
              <WhiteButton
                onPress={() => {
                  // handleExchangePress(item.name, item.quantity, item.cost)
                  setTitle(item.title)
                  setName(item.name)
                  setCost(item.cost)
                  setQuantity(item.quantity)
                  setModalVisible(true)
                  setVerifyAdress(true)
                }}
                text='Đổi quà'
                disabled={data.Coins < item.cost ? true : false}
              />
            </View>
          </View>
        </View>
      )}
    />
  )
  const imageChunks = chunkArray(imageSource, 2)
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ alignItems: 'center', margin: 20 }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../../../assets/images/qr_collection_gift/circle_coin.png')}
            />
            <View
              style={{ position: 'absolute', width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ fontFamily: 'SwissBold', color: 'white', fontSize: 32 }}>{data.Coins}</Text>
            </View>
            <Text style={{ fontFamily: 'SwissBold', color: 'white', fontSize: 18, textAlign: 'center' }}>
              Số coins hiện tại của bạn
            </Text>
          </View>
        }
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={imageChunks}
        renderItem={renderItem}
      />
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

          <Text numberOfLines={0} style={{ color: '#1D1C1C', textAlign: 'center', fontSize: 15, padding: 10 }}></Text>
          <View style={{ flexDirection: 'column', padding: 10, width: '90%' }}>
            <View>
              <Text style={{ color: '#005082', textAlign: 'center', fontSize: 20, fontFamily: 'SwissBold' }}>
                THÔNG TIN NHẬN QUÀ
              </Text>
              <View style={{ flexDirection: 'row', paddingBottom: 20, paddingTop: 20 }}>
                <Text style={{ color: '#005082', fontSize: 18, fontFamily: 'SwissBold' }}>Quà của bạn: </Text>
                <Text style={{ color: '#D02027', fontSize: 18, fontFamily: 'SwissBold', flexShrink: 1 }}>{title}</Text>
              </View>
            </View>
            <View style={{ paddingBottom: 20 }}>
              <Text style={{ color: '#005082', fontSize: 16, fontFamily: 'SwissBold' }}>Họ và tên</Text>
              <TextInput
                style={styles.input}
                placeholder='Nhập họ và tên của bạn'
                onChangeText={(text) => setInName(text)}
              ></TextInput>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <Text style={{ color: '#005082', fontSize: 16, fontFamily: 'SwissBold' }}>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Nhập số điện thoại của bạn'
                onChangeText={(text) => setInPhoneNumber(text)}
              ></TextInput>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <Text style={{ color: '#005082', fontSize: 16, fontFamily: 'SwissBold' }}>Địa chỉ</Text>
              <TextInput
                onChangeText={(text) => {
                  setAddress(text)
                  let temp = text.trim()
                  if (!temp) {
                    setVerifyAdress(false)
                  } else {
                    setVerifyAdress(true)
                  }
                }}
                textAlignVertical='top'
                multiline={true}
                numberOfLines={3}
                style={[styles.input, { borderWidth: 1, borderColor: verifyAddress ? 'transparent' : '#D02027' }]}
                placeholder='Nhập địa chỉ của bạn'
              ></TextInput>

              <Text style={{ color: '#D02027', fontFamily: 'SwissLight' }}>
                {verifyAddress ? '' : 'Vui lòng nhập địa chỉ của bạn'}
              </Text>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <Text style={{ color: '#005082', fontSize: 16, fontFamily: 'SwissBold' }}>Ghi chú</Text>
              <TextInput
                onChangeText={(text) => setNote(text)}
                textAlignVertical='top'
                multiline={true}
                numberOfLines={3}
                style={[styles.input]}
                placeholder='Nhập ghi chú (nếu có)'
              ></TextInput>
            </View>

            <RedButtonNo
              text='Đổi quà'
              onPress={() => {
                setModalVisible(!modalVisible)
                handleFirestore()
                handleExchangePress(name, quantity, cost)
              }}
            />
          </View>
        </View>
      </Modal>
      <View style={{ height: 250 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    top: '5%',
    alignSelf: 'center',
    backgroundColor: '#FBD239',
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
  },
  input: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
    fontFamily: 'SwissLight'
  }
})
