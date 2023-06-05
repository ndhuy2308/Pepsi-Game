import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { View, Text, Pressable } from 'react-native'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

interface propTopBar {
  pageTitle: string
  isHomePage: boolean
}

export default function TopBar(props: propTopBar) {
  const navigation = useNavigation()
  const auth = getAuth()
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: 10
      }}
    >
      {props.isHomePage === true ? (
        <Text> </Text>
      ) : (
        <Pressable onPress={() => navigation.goBack()}>
          <Entypo name='chevron-thin-left' size={24} color='white' />
        </Pressable>
      )}
      <Text style={{ fontFamily: 'SwissBold', fontSize: 24, color: 'white' }}>{props.pageTitle}</Text>
      <Pressable
        onPress={() =>
          signOut(auth)
            .then(() => {
              console.log('Successfully signed out.')
              // Navigate to the logged-out screen
            })
            .catch((error: any) => {
              console.error(error)
            })
        }
      >
        <MaterialIcons name='logout' size={24} color='white' />
      </Pressable>
    </View>
  )
}
