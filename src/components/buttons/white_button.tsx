import { TouchableOpacity } from 'react-native'
import { View, StyleSheet, Text, Image } from 'react-native'

interface propButton {
  text: string
  disabled: boolean
  onPress: () => void
}

function WhiteButton(props: propButton) {
  const disabled = props.disabled
  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.buttonContainer,
          { backgroundColor: disabled ? '#8E8E8E' : 'white', borderColor: disabled ? 'white' : 'yellow' }
        ]}
        onPress={props.onPress}
      >
        <Image
          style={{ position: 'absolute', right: 0 }}
          source={
            disabled
              ? require('../../../assets/images/buttons/white_right_disabled.png')
              : require('../../../assets/images/buttons/white-right.png')
          }
        />

        <Image
          style={{ position: 'absolute', left: 0 }}
          source={
            disabled
              ? require('../../../assets/images/buttons/white_left_disabled.png')
              : require('../../../assets/images/buttons/white-left.png')
          }
        />
        <Text style={[styles.buttonText, { color: disabled ? 'white' : '#0063A7' }]}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 3,
    borderRadius: 10,
    width: '100%',
    height: 44,
    borderWidth: 1,
    overflow: 'hidden'
  },
  buttonText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'SwissBold',
    fontSize: 18,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 4,
    paddingBottom: 4
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 40
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,

    elevation: 11
  }
})

export default WhiteButton
