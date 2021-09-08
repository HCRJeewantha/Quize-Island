/*
Author:
Date: 
*/
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import data from '../questions/questions.json';// import created questions from questions.json
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';//import 'expo-av' audio module

const selectedCategoryList = [];// create a array for store the question Id's of the selected category 
var userAnswers = [];// create a array for store the correct answer count and incorrect answer count
var displayQuestionCount = 1;

//correct answer count and incorrect answer count store
var correctCount = 1
var incorrcectCount = 1

//load question from JSON file according to index number
function loadQuestion(CateListQuestionIndexNumber) {
    return data[CateListQuestionIndexNumber]
}

//Store the question indexes of the selectedQuiz  
function getCategoryRange(quizId) {
    var count = 0
    data.map((questionObject, key) => {
        //check Question category with seleced quiz Id 
        if (questionObject.category == quizId) {
            selectedCategoryList[count] = key
            count++
        }
    })
}

function Question(props) {

    //call getCategoryRange function for find seleced category quesion 
    getCategoryRange(props.level)

    const navigation = useNavigation();

    //set a question to display
    const [question, setQuestion] = useState('');
    //set answers in a array to display
    const [getAnswers, setAnswers] = useState([]);
    //set correct answer number for analyze
    const [correctAnswer, setCorrectAnswer] = useState('');
    //save the selected quize is finished or not status
    const [isFinished, setIsFinished] = useState(true);
    //ongoing question number 
    const [questionNumber, setQuestionNumber] = useState(1);
    const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState(null);
    const [getSelectedAnswer, setGetSelectedAnswer] = useState(null);


    //play correctSound
    async function correctSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/Audio/chime.mp3')
        );
        await sound.playAsync();
    }

    //play loosesound 
    async function looseSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/Audio/loose.mp3')
        );
        await sound.playAsync();
    }



    // navigate to the result view after finish questions
    function navigateResult() {

        displayQuestionCount = 1

        navigation.navigate('Result', {
            correct: correctCount,
            incorrect: incorrcectCount
        });
        userAnswers = []
    };



    useEffect(() => {

        //set correct answer count and incorrect answer count to null when loading the component
        correctCount = 0
        incorrcectCount = 0

        //create array for store answers for fisrt Question 
        var answers = []

        //load questions from seleced catagory list
        const firstQuestionSet = loadQuestion(selectedCategoryList[0])
        setQuestion(firstQuestionSet['question'])
        setCorrectAnswer(firstQuestionSet['correctAnswer'])
        answers.push(firstQuestionSet['answers']['answer_1'])
        answers.push(firstQuestionSet['answers']['answer_2'])
        answers.push(firstQuestionSet['answers']['answer_3'])
        answers.push(firstQuestionSet['answers']['answer_4'])
        setAnswers(answers)

    }, []);

    // nextQuestion function
    function nextQuestion() {
        var answers = []
        setDisplayCorrectAnswer(null)
        setGetSelectedAnswer(null)
        if (selectedCategoryList.length > displayQuestionCount) {

            const seletedQuestionSet = loadQuestion(selectedCategoryList[displayQuestionCount])
            setQuestion(seletedQuestionSet['question'])
            setCorrectAnswer(seletedQuestionSet['correctAnswer'])
            answers.push(seletedQuestionSet['answers']['answer_1'])
            answers.push(seletedQuestionSet['answers']['answer_2'])
            answers.push(seletedQuestionSet['answers']['answer_3'])
            answers.push(seletedQuestionSet['answers']['answer_4'])
            setAnswers(answers)

            displayQuestionCount++
            setQuestionNumber(displayQuestionCount)
        }

        if (selectedCategoryList.length == displayQuestionCount) {
            setIsFinished(false)
        }
    }

    //checkAnswer function
    function checkAnswer(selectedAnswer) {

        setDisplayCorrectAnswer(correctAnswer)
        setGetSelectedAnswer(selectedAnswer)

        if (selectedAnswer == correctAnswer) {
            userAnswers.push(1)
            correctSound()
            correctCount++
        } else {
            userAnswers.push(0)
            looseSound()
            incorrcectCount++
        }
    }



    return (
        <React.Fragment>
            <View style={styles.questionContainer}>
                <Text style={styles.questionNumber}>{questionNumber}.</Text>
                <Text style={styles.question}>{question}</Text>
            </View>

            {getAnswers.map((answer, index) => (

                <View style={styles.answerContainer}>
                    {/*If displayCorrectAnswer equal null, then display below TouchableOpacity */}
                    {displayCorrectAnswer == null ? (
                        <TouchableOpacity
                            onPress={() => checkAnswer(index + 1)}
                            style={styles.answers}>
                            <Text style={styles.answerText}>{answer}</Text>
                        </TouchableOpacity>
                    ) : (
                        //IF displayCorrectAnswer equal (index + 1), then display below TouchableOpacity(Green colour)
                        displayCorrectAnswer == index + 1 ? (
                            <TouchableOpacity
                                style={styles.answersCorrect}>
                                <Text style={styles.answerTextSelected}>{answer}</Text>
                            </TouchableOpacity>
                        ) : (
                            //IF getSelectedAnswer equal (index + 1), then display below TouchableOpacity(Red colour)
                            getSelectedAnswer == index + 1 ? (
                                <TouchableOpacity
                                    style={styles.answersIncorrect}>
                                    <Text style={styles.answerTextSelected}>{answer}</Text>
                                </TouchableOpacity>
                            ) : (
                                //TouchableOpacity group for nutural answers  
                                <TouchableOpacity
                                    style={styles.answers}>
                                    <Text style={styles.answerText}>{answer}</Text>
                                </TouchableOpacity>
                            )
                        )
                    )}
                </View>
            ))
            }
            {isFinished ? (
                <TouchableOpacity
                    disabled={!getSelectedAnswer}
                    onPress={nextQuestion}
                    style={styles.button}>
                    <Text style={styles.buttonText}>NEXT QUESTION</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={navigateResult}
                    style={styles.button}>
                    <Text style={styles.buttonText}>FINISH</Text>
                </TouchableOpacity>
            )}
        </React.Fragment>
    );
}

// react native stylesheet
const styles = StyleSheet.create({

    button: {
        width: '70%',
        minHeight:60,
        maxHeight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 40,
        backgroundColor: '#b107ff',
    },
    answers: {
        width: '70%',
        minHeight:60,
        maxHeight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 15,
        backgroundColor: '#ffffff',
        border: '2px solid #fff',
        boxShadow: '3px 3px 3px 3px rgba(97, 97, 97, 0.103)',
    },
    answersCorrect: {
        width: '70%',
        minHeight:60,
        maxHeight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 15,
        backgroundColor: '#62ff42',
        border: '2px solid #fff',
        boxShadow: '3px 3px 3px 3px rgba(97, 97, 97, 0.103)',
    },
    answersIncorrect: {
        width: '70%',
        minHeight:60,
        maxHeight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 15,
        backgroundColor: '#ff4242',
        border: '2px solid #fff',
        boxShadow: '3px 3px 3px 3px rgba(97, 97, 97, 0.103)',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    answerTextSelected: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight:8,
        marginTop:8,
        marginBottom:8,
        textAlign:'center'
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    questionContainer: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 30,
        marginBottom: 20,
        width: '80%'

    },
    answerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft:8,
        marginRight:8,
        marginTop:8,
        marginBottom:8,
        textAlign:'center'
    },
    questionNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 3
    },
    answerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default Question;