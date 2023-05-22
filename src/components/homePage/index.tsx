import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import WhiteButton from '../buttons/white_button'
import ChoiNgay from '../buttons/choi_ngay'
export default function HomePage({ navigation }: { navigation: any }) {
  return (
    <LinearGradient
      colors={['#02A7F0', '#0063A7']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ flex: 1 }}
    >
      <Image
        source={require('../../../assets/images/homepage/goc-tren-trai.png')}
        style={{ flex: 1, position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/hoa-tren-trai.png')}
        style={{ flex: 1, position: 'absolute', top: '5%', left: 0, zIndex: 1 }}
      />
      <Image
        source={require('../../../assets/images/homepage/hoa-tren-giua.png')}
        style={{ flex: 1, position: 'absolute', top: '5%', left: '46%', zIndex: 1 }}
      />
      <Image
        source={require('../../../assets/images/homepage/goc-tren-trai-giua.png')}
        style={{ flex: 1, position: 'absolute', top: 0, left: '22%' }}
      />
      <Image
        source={require('../../../assets/images/homepage/giua-phai.png')}
        style={{ position: 'absolute', top: '50%', right: 0 }}
      />
      <Image source={require('../../../assets/images/3.png')} style={{ position: 'absolute', bottom: 0, left: 0 }} />
      <Image
        source={require('../../../assets/images/homepage/trong.png')}
        style={{ position: 'absolute', bottom: 0, right: '25%', left: '25%', zIndex: 1 }}
      />
      <Image
        source={require('../../../assets/images/homepage/cuoi-trang.png')}
        style={{ position: 'absolute', bottom: 0, alignSelf: 'center', zIndex: 0 }}
      />
      <Image
        source={require('../../../assets/images/hoa-trai.png')}
        style={{ position: 'absolute', top: '23%', left: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/goc-tren-phai.png')}
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <Image
        source={require('../../../assets/images/homepage/giua-tren-phai.png')}
        style={{ position: 'absolute', top: '20%', right: 0 }}
      />
      <Image
        source={require('../../../assets/images/hoa-duoi.png')}
        style={{ position: 'absolute', top: '65%', left: 0 }}
      />
      <SafeAreaView style={{ flex: 8, justifyContent: 'flex-end', alignItems: 'center', zIndex: 3 }}>
        <View>
          <Image source={require('../../../assets/images/homepage/ca.png')} />

          <Text style={{ textAlign: 'center', color: '#FFDD00', fontSize: 18, fontWeight: 'bold' }}>Hướng dẫn</Text>

          <View style={{ padding: 5 }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Gameplay')}>
              <Image style={styles.bottomImage} source={require('../../../assets/images/buttons/cn-duoi.png')} />
              <Image style={styles.topImage} source={require('../../../assets/images/buttons/cn-tren.png')} />
              <Image
                style={styles.redDotImage}
                source={require('../../../assets/images/buttons/choi-ngay-red-dot.png')}
              />
              <Image style={styles.centerImage} source={require('../../../assets/images/buttons/choi-ngay-bh.png')} />
              <Text style={styles.buttonText}>Chơi ngay</Text>
              <Text style={styles.buttonTextSmall}>Bạn có tổng cộng 5 lượt chơi</Text>
            </TouchableOpacity>
          </View>

          <WhiteButton text={'Quét mã'}></WhiteButton>

          <WhiteButton text={'Bộ sưu tập'}></WhiteButton>

          <WhiteButton text={'Chi tiết quà tặng'}></WhiteButton>
        </View>
      </SafeAreaView>
      <View style={{ flex: 2 }}></View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC3B3B',
    margin: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'yellow',
    width: '100%',
    height: 60,
    zIndex: 1,
    overflow: 'hidden'
  },

  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2
  },
  redDotImage: {
    position: 'absolute',
    top: 50,
    zIndex: 3
  },
  centerImage: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 4
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 0
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 5
  },
  buttonTextSmall: {
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 5
  }
})