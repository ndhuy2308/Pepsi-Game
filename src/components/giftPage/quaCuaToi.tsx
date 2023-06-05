import { View, Text, Image, Dimensions } from 'react-native'
import { UserData, updateData } from '../../store/userDataSlice'
import { RootState } from '../../store/rootReducer'
import firebaseapp from '../../FirebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getFirestore, collection, query, where, getDocs, getDoc, initializeFirestore, doc } from 'firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
interface Gift {
  key: string
  count: number
  image: string
  status: boolean
}

export default function QuaCuaToi() {
  const { width, height } = Dimensions.get('window')
  const windowWidth = Dimensions.get('window').width
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const docRef = doc(collection(db, 'data'), data.UserID)
  const dispatch = useDispatch()
  const [result, setResult] = useState<Gift[]>([])
  async function getDocumentsInCollection(collectionName: string, userId: string) {
    const collectionRef = collection(db, 'giftReception', collectionName, 'data')
    const q = query(collectionRef, where('Id', '==', userId))
    try {
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
    } catch (error) {
      console.log(`Error getting documents in ${collectionName}:`, error)
      return []
    }
  }

  // Sử dụng hàm trên để truy vấn document trong nhiều collection
  const collectionNames = [
    'BucketHat',
    'Jacket',
    'ToteBag',
    'Tumbler',
    'AirpodCase',
    'ElectronicLunchBo',
    'PortableSpeaker'
  ]
  useEffect(() => {
    async function fetchData() {
      const promises = collectionNames.map((collectionName) => getDocumentsInCollection(collectionName, data.UserID))
      try {
        const results = await Promise.all(promises)

        const myArray: any = []
        for (let i = 0; i < collectionNames.length; i++) {
          let status = true
          if (results[i].length > 0) {
            for (let j = 0; j < results[i].length; j++) {
              if (!results[i][j].data.status) {
                status = false
              }
            }

            const giftRef = doc(db, 'gift', collectionNames[i])
            const docSnap = await getDoc(giftRef)
            let image = ''
            if (docSnap.exists()) {
              image = docSnap.data().image
            } else {
              // docSnap.data() will be undefined in this case
              console.log('No such document!')
            }
            myArray.push({ key: collectionNames[i], count: results[i].length, image: image, status: status })
          }
        }
        setResult(myArray)
      } catch (error) {
        console.log('Error getting documents:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={{ flex: 1, width: '100%' }}>
      {result.length === 0 ? (
        <>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/images/qr_collection_gift/empty_gift.png')} />
            <Text style={{ textAlign: 'center', fontFamily: 'SwissLight', color: 'white', fontSize: 18 }}>
              Kho quà còn trống!{'\n'}
              Hãy dùng coins của bạn để đổi quà
            </Text>
          </View>
        </>
      ) : (
        <>
          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            numColumns={2}
            data={result}
            style={{ flex: 1 }}
            keyExtractor={(item) => item.key}
            renderItem={({ item }: { item: Gift }) => (
              <View
                style={{
                  borderRadius: 12,
                  backgroundColor: 'white',
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: windowWidth * 0.4
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 0,
                    width: 63,
                    height: 39
                  }}
                >
                  <Image source={require('../../../assets/images/qr_collection_gift/top_right_badge.png')} />
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
                    {item.count}
                  </Text>
                </View>
                <View style={{ margin: 10 }}>
                  <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} resizeMode='contain' />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#FFD76C',
                    width: windowWidth * 0.4,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12
                  }}
                >
                  <View style={{ margin: 20, alignItems: 'center' }}>
                    <Text style={{ color: '#005082', fontSize: 18, fontFamily: 'SwissBold' }}>{item.key}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontFamily: 'SwissLight', fontSize: 16 }}>Trạng thái: </Text>
                      <Text
                        style={[{ color: item.status ? '#00A61B' : '#D02027', fontSize: 16, fontFamily: 'SwissBold' }]}
                      >
                        {item.status ? 'Đã nhận' : 'Chưa nhận'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  )
}
