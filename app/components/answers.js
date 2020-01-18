import React from 'react'
import { View, Text, FlatList, TouchableHighlight, TouchableWithoutFeedback, Button } from 'react-native'
import styles from '../styles/'

export default class Answers extends React.Component {
    constructor(props) {
        super(props);

        this.userAnswer;

        this.state = {
            questionIndex: this.props.questionIndex,
            question: this.props.question,
            answer: this.shuffle([...this.props.question.incorrect_answers, this.props.question.correct_answer]),
            incorrectItemStyle: {},
            correctItemStyle: {},
        }
    }

    componentDidUpdate() {
        if (this.state.questionIndex != this.props.questionIndex) {
            this.userAnswer = null;
            this.setState({
                questionIndex: this.props.questionIndex,
                question: this.props.question,
                answer: this.shuffle([...this.props.question.incorrect_answers, this.props.question.correct_answer]),
                incorrectItemStyle: {},
                correctItemStyle: {},
            })
        }
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    decodeQuestionData(str) {
        return decodeURIComponent(str).replace('?', ' ?')
    }

    isAnswerCorrect(answer) {
        return answer === this.state.question.correct_answer; 
    }

    selectAnswer(answer) {
        if (!this.userAnswer) {
            this.userAnswer = answer;

            if (this.isAnswerCorrect(answer)) {
                this.props.onAnswerIsCorrect();
            }

            this.setState({
                incorrectItemStyle: {
                    backgroundColor: '#ff0044',
                    borderColor: '#ff0044'
                },
                correctItemStyle: {
                    backgroundColor: '#99ff00',
                    borderColor: '#99ff00'
                }
            })

            setTimeout(() => {
                this.props.next();
            }, 1000);
        }
    }
    
    render() {
        return (
            <View style={styles.game.answerContainer}>
                <FlatList
                    keyExtractor={item => this.decodeQuestionData(item)}
                    renderItem={({item}) => (
                        <TouchableWithoutFeedback onPress={this.selectAnswer.bind(this, item)}>
                            <View style={this.isAnswerCorrect(item) ? [styles.game.answerItem, this.state.correctItemStyle] : [styles.game.answerItem, this.state.incorrectItemStyle]}>
                                <Text style={styles.game.answerItemLabel}>{ this.decodeQuestionData(item) }</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    data={this.state.answer}
                />
            </View>
        )
    }
}