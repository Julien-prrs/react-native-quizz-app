import React from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../styles'

export default class endGameScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.global.homeScreenContainer}>
                <Text>Score</Text>
                <Text>{this.props.navigation.getParam('score')}/{this.props.navigation.getParam('nbQuestion')}</Text>
                <Button title="Retour à l'écran d'accueil" onPress={ () => this.props.navigation.navigate('Home') } />
            </View>
        )
    }
}