import { TouchableOpacity } from 'react-native'
import { View, StyleSheet, Text, Image } from 'react-native'

interface propButton {
  text: string
}

function WhiteButton(props: propButton) {
  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Image
          style={{ position: 'absolute', right: 0 }}
          source={require('../../../assets/images/buttons/white-right.png')}
        />
        <Image
          style={{ position: 'absolute', left: 0 }}
          source={require('../../../assets/images/buttons/white-left.png')}
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
    backgroundColor: 'white',
    margin: 3,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'yellow',
    overflow: 'hidden'
  },
  buttonText: {
    textAlign: 'center',
    color: '#0063A7',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 4,
    paddingBottom: 4
  }
})

export default WhiteButton
