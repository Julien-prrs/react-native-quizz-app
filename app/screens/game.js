import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Answers from '../components/answers'
import styles from '../styles'

export default class GameScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)

        this.preferences = {};
        this.questions = [];
        this.score = 0;
        this.state = {
            isLoading: true,
            questionIndex: 0,
            activeQuestion: {}
        }

        this._nextQuestion = this.nextQuestion.bind(this);
        this._handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    }

    componentDidMount() {
        this.generateQuestions();
    }

    async generateQuestions() {
        this.preferences = await this.getPreferences();
        
        let difficulty = this.preferences.difficulty === 'any' ? '' : '&difficulty=' + this.preferences.difficulty;
        let type = this.preferences.type === 'any' ? '' : '&type=' + this.preferences.type;

        const xhr = new XMLHttpRequest();
        const url = `https://opentdb.com/api.php?amount=${this.preferences.amount}${difficulty}${type}&encode=url3986`

        xhr.open('GET', url, true);
        xhr.onloadend = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                this.questions = JSON.parse(xhr.response).results
                this.setState({
                    isLoading: false,
                    activeQuestion: this.questions[this.state.questionIndex]
                });
            }
        }
        xhr.send();
    }

    async getPreferences() {
        const preferences = await AsyncStorage.getItem('@preferences');
        return JSON.parse(preferences);
    }

    decodeQuestionData(str) {
        return decodeURIComponent(str).replace('?', ' ?')
    }

    handleCorrectAnswer() {
        this.score += 1;
    }

    nextQuestion() {
        if ((this.state.questionIndex + 1) < this.questions.length) {
            console.log(this.score);
            this.setState(prevState => ({
                questionIndex: prevState.questionIndex + 1,
                activeQuestion: this.questions[prevState.questionIndex + 1]
            }));
        } else {
            console.log('END GAME');
            console.log(this.score + '/' + this.questions.length);

            this.props.navigation.navigate('endGame', {
                score: this.score,
                nbQuestion: this.questions.length
            })
        }
    }

    render() {
        return (
            <View style={styles.game.screenContainer}>
                <StatusBar backgroundColor="#13BF74" barStyle="light-content" animated />
                {
                    this.state.isLoading ?
                        <View style={styles.game.loadingContainer}>
                            <Text>Chargement</Text>
                        </View>
                    :
                        <View style={styles.game.gameContainer}>
                            <View style={styles.game.questionContainer}>
                                <View style={styles.game.rowHeader}>
                                    <Text style={styles.game.rowHeaderText}>Question:</Text>
                                    <Text style={styles.game.rowHeaderText}>{(this.state.questionIndex + 1) + '/' + this.questions.length }</Text>
                                </View>
                                <View style={styles.game.questionWrapper}>
                                    <Text style={styles.game.question}>{this.decodeQuestionData(this.state.activeQuestion.question)}</Text>
                                </View>
                            </View>
                            <Answers questionIndex={this.state.questionIndex} onAnswerIsCorrect={this._handleCorrectAnswer} question={this.state.activeQuestion} next={this._nextQuestion} />
                        </View>
                }
            </View>
        )
    }
}