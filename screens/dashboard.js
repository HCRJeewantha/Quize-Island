/*
Author: shamalka 
Date: 
*/
import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Dashboard({ navigation }) {

    function navigateQuiz(level) 
    {
        navigation.navigate('Questions', {level: level,});
    }

    const levels = ["QUIZ 1", "QUIZ 2", "QUIZ 3"]

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#6228dc', '#ffffff']}
                style={styles.background}
            />
            <View style={styles.head}>
                <Text style={styles.levelsText}>QUIZES</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.contentContainer}>
                    {/* map funtion will loop by levels array,after the loop TouchableOpacity will loop 3 times 
                    because array has 3 elements.after that it will display 3 buttons  "QUIZ 1", "QUIZ 2", "QUIZ 3"
                     after one button(QUIZ 1) click levels will call, after that pass to quiz index+1 ,
                     index+1 will be levels number*/}
                    {levels.map((quiz, index) => (
                        <TouchableOpacity onPress={() => navigateQuiz(index + 1)} style={styles.levels}>
                            <Text style={styles.levelText}>{quiz}</Text>
                        </TouchableOpacity>
                    ))}
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
        height: '15%',
    },
    content: {
        height: '80%',
        borderRadius: '30px',
        backgroundColor: '#ffffffa3',
        border: '1px solid #fff',
        width: '90%',
        marginRight: '20px',
        marginLeft: '20px',
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
    levels: {
        width: '90%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 15,
        backgroundColor: '#ffffff',
        border: '2px solid #fff',
        boxShadow: '3px 3px 3px 3px rgba(97, 97, 97, 0.103)',
        opacity: 0.7
    },
    levelText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    levelsText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '38%',
        marginTop: '50px',
        color: 'white'
    }
})

export default Dashboard;