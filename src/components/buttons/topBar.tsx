import { Entypo } from '@expo/vector-icons'
import {useState} from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { View, Text, Pressable, Image, Modal, StyleSheet } from 'react-native'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import RedButtonNo from './red_button_no'
import WhiteButton from './white_button'

interface propTopBar {
  pageTitle: string
  isHomePage: boolean
}

export default function TopBar(props: propTopBar) {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false) // cho modal
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
          setModalVisible(true)
        }
      >
        <MaterialIcons name='logout' size={24} color='white' />
      </Pressable>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modalView}>
                <Text style={{fontFamily: 'SwissLight', top: 10, padding:5 ,fontSize: 23, color: '#0063A7', textAlign: 'center'}}>
                  Bạn có chắc chắn muốn 
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'SwissBold', fontSize: 23, color: '#0063A7', textAlign: 'center'}}>đăng xuất</Text>
                <Text style={{fontFamily: 'SwissLight',fontSize: 23, color: '#0063A7', textAlign: 'center'}}> không?</Text>
                </View>
                <View style={{width: '60%'}}>
                <RedButtonNo text='Đăng xuất' onPress={() =>{
                  signOut(auth)
                  .then(() => {
                    console.log('Successfully signed out.')
                    // Navigate to the logged-out screen
                  })
                  .catch((error: any) => {
                    console.error(error)
                  })
                  setModalVisible(false)
                }
          
            
        } />
                <WhiteButton text="Huỷ" onPress={() => setModalVisible(false)} disabled={false}/></View>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  modalView: {
    top: '20%',
    alignSelf: 'center',
    backgroundColor: '#FBD239',
    borderRadius: 20,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})