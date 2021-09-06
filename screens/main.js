import * as React from 'react'; //import react module
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'; //import native components 
import { LinearGradient } from 'expo-linear-gradient';  //import LinearGradient module

//main function  
function Main({ route, navigation }) 
{
    //passing parameters react native props
    const { name } = route.params;

    function buttonClickedHandler() 
    {
        navigation.navigate('Dashboard');
    };

    return (

        <View style={styles.container}>
            <View style={styles.head}>
                <Image
                    style={styles.vector}
                    source={require('../assets/banner.png')}
                />
            </View>
            <View style={styles.content1}>
                <LinearGradient
                    colors={['#6228dc', '#ffffff']}
                    style={styles.background}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.primaryText}>Hello,</Text>
                    <Text style={styles.secondaryText}>{name}</Text>
                </View>
                <View style={styles.contentContainer}>
                <Text style={styles.startText}>Click START to begin your journy</Text>
                    <TouchableOpacity
                        onPress={buttonClickedHandler}
                        style={styles.button}>
                        <Text style={styles.buttonText}>START</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        height: '60%',
    },
    content: {
        height: '35%',
        borderRadius: '30px',
        backgroundColor: '#ffffffa3',
        border: '1px solid #fff',
        width: '90%',
        marginRight: '20px',
        marginLeft: '20px',
        boxShadow: '3px 3px 3px 3px rgba(97, 97, 97, 0.103)',
    },
    content1: {
        height: '55%',
        position: 'absolute',
        width: '100%',
        marginTop: '95%'

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 40,
        backgroundColor: '#b107ff',
    },
    buttonSettings: {
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 40,
        backgroundColor: '#9168e6',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    primaryText: {
        color: '#5d5d5e',
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: '5%',
    },
    secondaryText: {
        color: '#0779ff',
        fontSize: 45,
        fontWeight: 'bold',
    },
    startText: {
        color: '#5d5d5e',
        fontSize: 15,
        fontWeight: 'bold',
    },
    greetingContainer: {
        marginTop: 20,
        marginLeft: 70
    },
    buttonProfile: {
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 40,
        backgroundColor: '#0779ff',
    },
    vector: {
        width: '100%',
        height: '75%',
        resizeMode: 'stretch',
    },
})

export default Main;