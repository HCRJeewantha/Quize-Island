/*
Author: shamalka 
Date: 
*/
import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//welcome function 
function Welcome({ navigation }) {
    //react useState hook used to store name
    const [name, onChangeName] = React.useState("Stranger");


    // navigate to the main screen with passing name as a parameter 
    function buttonClickedHandler() {

        localStorage.setItem("username", name);
        navigation.navigate('Main');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ccfcff', '#ffffff']}
                style={styles.background}
            />
            <View style={styles.head}>
                <View style={styles.headContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/world.png')}
                    />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.contentContainer}>
                    <Text style={styles.greetingText}>Hello Stranger</Text>
                    <SafeAreaView>
                        {/* read input text and set name value   */}
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeName}
                            placeholder="eg: Jhone"
                        />
                    </SafeAreaView>
                    <Text style={styles.primaryText}>Enter Your Name</Text>
                    <TouchableOpacity
                        onPress={buttonClickedHandler}
                        style={styles.button}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

// react native stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        height: '50%',
    },
    content: {
        height: '45%',
        borderRadius: '30px',
        backgroundColor: '#ffffffa3',
        border: '1px solid #fff',
        width: '90%',
        marginRight: '20px',
        marginLeft: '20px',
        opacity: 0.9,
        boxShadow: '3px 3px 3px 3px rgba(97, 97, 97, 0.103)',
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
    logo: {
        width: '95%',
        height: '160%',
        marginTop: '60%',
        resizeMode: 'stretch',
    },
    button: {
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px',
        borderRadius: 40,
        backgroundColor: '#b107ff',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    primaryText: {
        color: '#5d5d5e',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '2%',
    },
    input: {
        marginTop: '15%',
        alignSelf: 'stretch',
        padding: 10,
        marginLeft: 50,
        borderBottomColor: '#000',
        marginRight: 50,

        borderBottomColor: '#000', // Add this to specify bottom border color
        borderBottomWidth: 2     // Add this to specify bottom border thickness
    },
    greetingText: {
        color: '#7c7c7c',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: '10%',
    }
})

export default Welcome;