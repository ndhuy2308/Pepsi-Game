import { TouchableOpacity } from 'react-native'
import { View, StyleSheet, Text, Image } from 'react-native'

interface propButton {
  text: string
  luotChoi: number
  onPress: () => void
  disabled: boolean
}

function RedBigButton(props: propButton, { navigation }: { navigation: any }) {
  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: props.disabled ? '#7A848A' : '#FC3B3B' }]}
        onPress={props.onPress}
      >
        <Image
          style={[styles.redDotImage, { tintColor: props.disabled ? '#7A848A' : undefined }]}
          source={require('../../../assets/images/buttons/choi-ngay-red-dot.png')}
        />
        <Image
          style={[styles.centerImage, { tintColor: props.disabled ? '#7A848A' : undefined }]}
          source={require('../../../assets/images/buttons/choi-ngay-bh.png')}
        />
        <Text style={styles.buttonText}>{props.text}</Text>
        <View style={{ flexDirection: 'row', zIndex: 5 }}>
          <Text style={styles.buttonTextSmall}>Bạn còn </Text>
          <Text style={{ fontFamily: 'SwissBold', color: '#FEEEA4', fontSize: 14 }}>{props.luotChoi}</Text>
          <Text style={styles.buttonTextSmall}> lượt chơi</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
    overflow: 'hidden',
    alignItems: 'center'
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
    zIndex: 999
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
    fontFamily: 'SwissBold',
    fontSize: 18,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 5
  },
  buttonTextSmall: {
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'SwissLight',
    fontSize: 10,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 5
  }
})

export default RedBigButton
