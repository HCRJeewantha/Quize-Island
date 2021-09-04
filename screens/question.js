import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import data from '../questions/questions.json';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Audio, Video } from 'expo-av';

const selectedCategoryList = [];
var userAnswers = [];
var displayQuestionCount = 1;
var correctCount = 1
var incorrcectCount = 1

function loadQuestion(questionNumber) {
    return data[questionNumber]
}

function getCategoryRange(categoryId) {
    var count = 0
    data.map((data, key) => {
        if (data.category == categoryId) {
            selectedCategoryList[count] = key
            count++
        }
    })
}

function Question(props) {
    const [randomNumber, setRandomNumber] = useState(0)

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/Audio/chime.mp3')
        );
        await sound.playAsync();
    }

    async function looseSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/Audio/loose.mp3')
        );
        await sound.playAsync();
    }

    const navigation = useNavigation();
    const [correctC, setCorrectC] = useState(0);
    const [incorrectC, setIncorrectC] = useState(0);
    const buttonClickedHandler = () => {

        displayQuestionCount = 1
        navigation.navigate('Result', {
            results: userAnswers,
            correct: correctC,
            incorrect: incorrectC
        });
        userAnswers = []
    };

    const [question, setQuestion] = useState('');
    const [getAnswers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [isFinished, setIsFinished] = useState(true);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState(null);
    const [getSelectedAnswer, setGetSelectedAnswer] = useState(null);

    useEffect(() => {
        var answers = []
        const seletedQuestionSet = loadQuestion(selectedCategoryList[0])
        setCorrectAnswer(seletedQuestionSet['correctAnswer'])
        setQuestion(seletedQuestionSet['question'])
        answers.push(seletedQuestionSet['answers']['answer_1'])
        answers.push(seletedQuestionSet['answers']['answer_2'])
        answers.push(seletedQuestionSet['answers']['answer_3'])
        answers.push(seletedQuestionSet['answers']['answer_4'])
        setAnswers(answers)

    }, []);

    const selectedAnswer = () => {

        var answers = []
        setDisplayCorrectAnswer(null)
        setGetSelectedAnswer(null)
        if (selectedCategoryList.length > displayQuestionCount) {

            const seletedQuestionSet = loadQuestion(selectedCategoryList[displayQuestionCount])
            setQuestion(seletedQuestionSet['question'])

            answers.push(seletedQuestionSet['answers']['answer_1'])
            answers.push(seletedQuestionSet['answers']['answer_2'])
            answers.push(seletedQuestionSet['answers']['answer_3'])
            answers.push(seletedQuestionSet['answers']['answer_4'])
            setAnswers(answers)

            setCorrectAnswer(seletedQuestionSet['correctAnswer'])
            displayQuestionCount++
            setQuestionNumber(displayQuestionCount)
        }

        if (selectedCategoryList.length == displayQuestionCount) {
            setIsFinished(false)
        }
    }

    const checkAnswer = (selectedAnswer) => {

        setDisplayCorrectAnswer(correctAnswer)
        setGetSelectedAnswer(selectedAnswer)

        if (selectedAnswer == correctAnswer) {
            userAnswers.push(1)
            setCorrectC(correctCount)
            playSound()
            correctCount++
        } else {
            userAnswers.push(0)
            setIncorrectC(incorrcectCount)
            looseSound()
            incorrcectCount++
        }
    }

    getCategoryRange(props.level)

    return (
        <React.Fragment>
            <View style={styles.questionContainer}>
                <Text style={styles.questionNumber}>0{questionNumber}.</Text>
                <Text style={styles.question}>{question}</Text>
            </View>

            {getAnswers.map((answer, index) => (

                <View style={styles.answerContainer}>
                    {displayCorrectAnswer == null ? (
                        <TouchableOpacity
                            onPress={() => checkAnswer(index + 1)}
                            style={styles.answers}>
                            <Text style={styles.answerText}>{answer}</Text>
                        </TouchableOpacity>
                    ) : (
                        displayCorrectAnswer == index + 1 ? (
                            <TouchableOpacity
                                onPress={() => checkAnswer(index + 1)}
                                style={styles.answersCorrect}>
                                <Text style={styles.answerTextSelected}>{answer}</Text>
                            </TouchableOpacity>
                        ) : (
                            getSelectedAnswer == index + 1 ? (
                                <TouchableOpacity
                                    onPress={() => checkAnswer(index + 1)}
                                    style={styles.answersIncorrect}>
                                    <Text style={styles.answerTextSelected}>{answer}</Text>
                                </TouchableOpacity>
                            ) : (
                                correctAnswer == index + 1 ? (
                                    <TouchableOpacity
                                        onPress={() => checkAnswer(index + 1)}
                                        style={styles.answersCorrect}>
                                        <Text style={styles.answerTextSelected}>{answer}</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => checkAnswer(index + 1)}
                                        style={styles.answers}>
                                        <Text style={styles.answerText}>{answer}</Text>
                                    </TouchableOpacity>
                                )

                            )
                        )
                    )}
                </View>
            ))
            }
            {isFinished ? (
                <TouchableOpacity
                    disabled={!getSelectedAnswer}
                    onPress={selectedAnswer}
                    style={styles.button}>
                    <Text style={styles.buttonText}>NEXT QUESTION</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={buttonClickedHandler}
                    style={styles.button}>
                    <Text style={styles.buttonText}>FINISH</Text>
                </TouchableOpacity>
            )}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({

    button: {
        width: '70%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 630,
        borderRadius: 40,
        backgroundColor: '#b107ff',
        position: 'fixed'
    },
    answers: {
        width: '70%',
        height: 60,
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
        height: 60,
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
        height: 60,
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
        fontWeight: 'bold'
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
        fontWeight: 'bold'
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