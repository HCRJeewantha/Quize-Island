/*
Author:shamalka
Date: 30/08/2021
*/
import * as React from 'react';//import react module
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';//import native components
import { LinearGradient } from 'expo-linear-gradient';//import LinearGradient module

//home function
function Home({ navigation }) 
{
    //on button click, navigate to the welcome screen 
    function routing (routepath) 
    {
        navigation.navigate(routepath);
    };

    return (
        <View style={styles.container}>
            {/* adding LinearGradient colour to background */}
            <LinearGradient
                colors={['#ffdcaa', '#ffffff']}
                style={styles.background}
            />
            <View style={styles.head}>
                {/* adding Image to background */}
                <Image  
                    style={styles.vector}
                    source={require('../assets/vector4.jpg')}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.contentContainer}>
                    <View style={styles.headContainer}>
                        <Text style={styles.primaryText}>Start Your Journy</Text>
                        <Text style={styles.bodyText}>
                        This work deals with development of react native-based multiple-choice question examination system, namely: Quiz Land. This application is developed for educational purpose, allowing the users to prepare the multiple-choice questions for different examinations conducted on provincial and national level.
                        </Text>

                        {/* navigae to the welcome page when click the TouchableOpacity */}
                        <TouchableOpacity
                            onPress={() => routing('Welcome')}
                            style={styles.button}>
                            <Text style={styles.buttonText}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
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
        borderRadius: '12%',
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
        alignItems: 'center',
    },
    vector: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    button: {
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        borderRadius: 40,
        backgroundColor: '#b107ff',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    primaryText: {
        color: '#7c7c7c',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: '5%',
    },
    input: {
        marginTop: '30%',
        alignSelf: 'stretch',
        padding: 10,
        marginLeft: 50,
        borderBottomColor: '#000',
        marginRight: 50,

        borderBottomColor: '#000', // Add this to specify bottom border color
        borderBottomWidth: 2     // Add this to specify bottom border thickness
    },
    bodyText: {
        marginTop: '5%',
        textAlign: 'center',
        marginLeft: '10%',
        marginRight: '10%',
        fontWeight: 'bold',
        color: '#7c7c7c',

    },
})

export default Home;