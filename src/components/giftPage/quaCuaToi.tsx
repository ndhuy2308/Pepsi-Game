import { View, Text } from 'react-native'
import { UserData, updateData } from '../../store/userDataSlice'
import { RootState } from '../../store/rootReducer'
import firebaseapp from '../../FirebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { initializeFirestore, doc, getDoc, collection } from 'firebase/firestore'
export default function QuaCuaToi() {
  const data: UserData = useSelector((state: RootState) => state.userData.data)
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const docRef = doc(collection(db, 'data'), data.UserID)
  const dispatch = useDispatch()
  return (
    <View>
      <Text>{data.BucketHat}</Text>
    </View>
  )
}
