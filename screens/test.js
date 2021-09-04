//Imports
import * as React from 'React';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Main Function
function Test() {

    return (
        <View style={css.constentCenter}>
            <LinearGradient
                colors={['#ffdcaa', '#ffffff']}
                style={css.background}
            />

            <View style={css.head}>
                <Image
                    style={css.tinyLogo}
                    source={require('../assets/vector4.jpg')}
                />
            </View>
            <View style={css.body}>

            </View>
        </View>
    )
};

//Styles
const css = StyleSheet.create({

    constentCenter: {
        flex: 1
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    head: {
        height: '50%'
    },
    body: {
        height: '45%',
        borderRadius: '12%',
        backgroundColor: '#ffffffa3',
        border: '1px solid #fff',
        width: '90%',
        marginRight: '20px',
        marginLeft: '20px',
        opacity: 0.9,
        boxShadow: '3px 3px 3px 3px rgba(97, 97, 97, 0.103)',
    }

});

//Export main function
export default Test;