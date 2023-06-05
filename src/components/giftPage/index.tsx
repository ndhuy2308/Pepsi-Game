import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Image, ListRenderItem } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DoiQua from './doiQua'
import QuaCuaToi from './quaCuaToi'
import { LinearGradient } from 'expo-linear-gradient'
import { initializeFirestore, setDoc, doc, getDocs, collection } from 'firebase/firestore'
import firebaseapp from '../../FirebaseConfig'
import { FlatList } from 'react-native-gesture-handler'
import TopBar from '../buttons/topBar'

export default function GiftPage({ navigation }: { navigation: any }) {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0)
  const { width, height } = Dimensions.get('window')
  const db = initializeFirestore(firebaseapp, {
    experimentalForceLongPolling: true
  })
  const handleButtonPress = (index: number) => {
    setSelectedButtonIndex(index)
  }

  const windowWidth = Dimensions.get('window').width
  const imageWidth = windowWidth * 0.4

  return (
    <LinearGradient
      colors={['#02A7F0', '#0063A7']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ flex: 1 }}
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
      <SafeAreaView>
        <TopBar pageTitle='Chi tiết quà tặng' isHomePage={false} />
      </SafeAreaView>
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', zIndex: 3 }}>
        <View>
          <View style={[styles.groupButton]}>
            <TouchableOpacity
              style={[styles.buttonLeft, selectedButtonIndex === 0 && styles.selectedButton]}
              onPress={() => handleButtonPress(0)}
            >
              <Text
                style={{ color: selectedButtonIndex != 0 ? 'red' : 'white', fontFamily: 'SwissBold', fontSize: 18 }}
              >
                Đổi quà
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonRight, selectedButtonIndex === 1 && styles.selectedButton]}
              onPress={() => handleButtonPress(1)}
            >
              <Text
                style={{ color: selectedButtonIndex != 1 ? 'red' : 'white', fontFamily: 'SwissBold', fontSize: 18 }}
              >
                Quà của tôi
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {selectedButtonIndex === 0 && <DoiQua />}
            {selectedButtonIndex === 1 && <QuaCuaToi />}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

  groupButton: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center'
  },
  buttonLeft: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8
  },
  buttonRight: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8
  },
  selectedButton: {
    backgroundColor: 'red'
  }
})
