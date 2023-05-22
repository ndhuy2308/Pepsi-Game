import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef } from 'react'
import { StyleSheet, View, Image, Animated, PanResponder, Text } from 'react-native'

export default function QrPage({ navigation }: { navigation: any }) {
  return (
    <LinearGradient
      colors={['#02A7F0', '#0063A7']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    ></LinearGradient>
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
