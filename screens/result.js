import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



function Result({ route, navigation }) {

    //get correct answers and incorrect answers from question component using react props
    const { correct, incorrect } = route.params;

    //routing to dashboard and main view
    function routing (routerpath) 
    {
        navigation.navigate(routerpath);
    };

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Image
                    style={styles.vector}
                    source={require('../assets/cup.jpg')}
                />
            </View>
            <View style={styles.content1}>
                <LinearGradient
                    colors={['#38ba96', '#ffffff']}
                    style={styles.background}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.contentContainer}>
                    {/* Display correct answer count and incorrect answer count */}
                    <Text style={styles.totalResultText}>TOTAL</Text>
                    <Text style={styles.totalResult}>{correct}/{correct + incorrect}</Text>
                    <Text style={styles.totalResultText}>SUMMARY</Text>
                    <Text style={styles.summary}>{correct}/{correct + incorrect} Correct Answers</Text>
                    <Text style={styles.summary}>{incorrect}/{correct + incorrect} Worng Answers</Text>

                    {/* navigate to dashboard view */}
                    <TouchableOpacity
                        onPress={() => routing('Dashboard')}
                        style={styles.button}>
                        <Text style={styles.buttonText}>QUIZES</Text>
                    </TouchableOpacity>

                    {/* navigate to main view */}
                    <TouchableOpacity
                        onPress={() => routing('Main')}
                        style={styles.button}>
                        <Text style={styles.buttonText}>HOME</Text>
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
        height: '43%',
    },
    content: {
        height: '55%',
        borderRadius: '30px',
        backgroundColor: '#ffffffa3',
        border: '1px solid #fff',
        width: '90%',
        marginRight: '20px',
        marginLeft: '20px',
        marginTop: '-20px',
        boxShadow: '3px 3px 3px 3px rgba(97, 97, 97, 0.103)',
    },
    content1: {
        height: '65%',
        position: 'absolute',
        width: '100%',
        marginTop: '75%'

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
        height: 100,
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
    vector: {
        width: '100%',
        height: '85%',
        resizeMode: 'stretch',
    },
    totalResult: {
        fontWeight: '700',
        fontSize: 60,
        color: '#5d5d5e',
        marginBottom: 10
    },
    totalResultText: {
        fontWeight: '600',
        fontSize: 33,
        color: '#5d5d5e',
        marginBottom: 10
    },
    summary: {
        fontWeight: '500',
        fontSize: 20,
        color: '#5d5d5e',
        marginBottom: 3
    },
    button: {
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 40,
        backgroundColor: '#b107ff',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
})

export default Result;