import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Text, Image } from "react-native";

interface propButton {
    text: string;
    luotChoi: number
}

function ChoiNgay(props: propButton) {
    return (
        <View style={{padding: 5}}>
            <TouchableOpacity style={styles.buttonContainer}>
                    <Image style={styles.bottomImage} source={require('../../../assets/images/buttons/cn-duoi.png')} />
                    <Image style={styles.topImage} source={require('../../../assets/images/buttons/cn-tren.png')} />
                    <Image style={styles.redDotImage} source={require('../../../assets/images/buttons/choi-ngay-red-dot.png')} />
                    <Image style={styles.centerImage} source={require('../../../assets/images/buttons/choi-ngay-bh.png')} />
                    <Text style={styles.buttonText}>{props.text}</Text>
                    <Text style={styles.buttonTextSmall}>Bạn có tổng cộng {props.luotChoi} lượt chơi</Text>
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
    },
})

export default ChoiNgay;