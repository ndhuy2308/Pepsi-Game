import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef } from 'react'
import { StyleSheet, View, Image, Animated, PanResponder, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { DataState } from '../../store/userDataSlice'

export default function Gameplay({ navigation }: { navigation: any }) {
  const userData = useSelector((state: DataState) => state.MienPhi)
  console.log('Homepage: ', userData)

  const pan = useRef(new Animated.ValueXY()).current

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], {
      useNativeDriver: false
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.moveY < 550) {
        console.log('Giữa')
        navigation.navigate('Result')
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
      <Text style={{ color: 'white', fontSize: 25, top: '10%' }}>VUỐT LÊN ĐỂ CHƠI</Text>
      <Image
        source={require('../../../assets/images/gameplay/lon.png')}
        style={{ zIndex: 0, position: 'absolute', top: '10%' }}
      />
      <Image
        source={require('../../../assets/images/gameplay/2up.png')}
        style={{ zIndex: 0, position: 'absolute', bottom: '17%' }}
      />
      <Animated.View style={[styles.box, { transform: [{ translateY: pan.y }] }]} {...panResponder.panHandlers}>
        <Image
          style={{ position: 'absolute', bottom: '-10%', alignSelf: 'center' }}
          source={require('../../../assets/images/homepage/ca.png')}
        />
      </Animated.View>
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
