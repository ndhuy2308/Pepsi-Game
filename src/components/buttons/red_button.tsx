import { TouchableOpacity } from 'react-native'
import { View, StyleSheet, Text, Image } from 'react-native'

interface propButton {
  text: string
  onPress: () => void
}

function RedButton(props: propButton) {
  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
        <Image
          style={{ position: 'absolute', right: 0 }}
          source={require('../../../assets/images/buttons/red-right.png')}
        />
        <Image
          style={{ position: 'absolute', left: 0 }}
          source={require('../../../assets/images/buttons/red-left.png')}
        />
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#D02027',
    margin: 3,
    borderRadius: 10,
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'yellow',
    overflow: 'hidden'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
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

export default RedButton
