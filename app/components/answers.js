import React from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import styles from '../styles/'

export default class Answers extends React.Component {
    constructor(props) {
        super(props);

        this.question = this.props.question
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
    
    render() {
        return (
            <View style={styles.game.answerContainer}>
                <FlatList
                    keyExtractor={item => this.decodeQuestionData(item)}
                    renderItem={({item}) => (
                        <TouchableHighlight style={styles.game.answerItem} onPress={this.verifyAnwser}>
                            <Text style={styles.game.answerItemLabel}>{ this.decodeQuestionData(item) }</Text>
                        </TouchableHighlight>
                    )}
                    data={this.shuffle([...this.question.incorrect_answers, this.question.correct_answer]) }
                />
            </View>
        )
    }
}