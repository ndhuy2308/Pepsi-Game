import { getFirestore } from 'firebase/firestore'
import firebaseapp from '../../FirebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { View, Text, Pressable } from 'react-native'
import { initializeFirestore } from 'firebase/firestore'

interface dataType {
  BucketHat: number
  AirpodCase: number
  ElectronicLunchBo: number
  Jacket: number
  PortableSpeaker: number
  ToteBag: number
  Tumbler: number
}

export default function app() {
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const toDo = async () => {
    const querySnapshot = await getDocs(collection(db, 'gifts'))
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      const temp = JSON.stringify(doc.data())
      const data: dataType = JSON.parse(temp)
      console.log(data.AirpodCase)
    })
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={() => toDo()}>
        <Text>Hello</Text>
      </Pressable>
    </View>
  )
}
