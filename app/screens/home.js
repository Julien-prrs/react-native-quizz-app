import React from 'react'
import { StatusBar, View, Image, TouchableWithoutFeedback, Text, Animated } from 'react-native'
import Icon from 'react-native-ionicons'
import styles from '../styles'

/*
- TODO: Screen play
    - onPressBack > modal confirm
    - Get data from API
    - Show line progress & index/total

    - TODO: End of game
        - Show result nbCorrect/total
        - Save data with LocalStorage (Question/Answer/CorrectValue - DateTimeBegin - DateTimeBegin/DateTimeEnd: duration)


        
  -- BONNUS -- 
- TODO: Screen scores
    - List all games (NbCorrect/nbQuestion - DateTimeBegin)

- TODO: Screen scoreSingle
    - Show excerpt data (nbCorrect/nbQuestion, DateTimeBegin, Duration)
    - List all questions with given answer & correct anwser
 */



export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    UNSAFE_componentWillMount() {
        this.animatedPlayValue = new Animated.Value(1);
        this.animatedSettingsValue = new Animated.Value(1);
    }

    handlePlayPressIn() {
        Animated.spring(this.animatedPlayValue, {
            toValue: 0.97
        }).start()
    }

    handlePlayPressOut() {
        Animated.spring(this.animatedPlayValue, {
            toValue: 1,
            friction: 3,
            tension: 40
        }).start()
    }

    handleSettingsPressIn() {
        Animated.spring(this.animatedSettingsValue, {
            toValue: 0.97
        }).start()
    }

    handleSettingsPressOut() {
        Animated.spring(this.animatedSettingsValue, {
            toValue: 1,
            friction: 3,
            tension: 40
        }).start()
    }

    render() {
        const animatedStylePlay = { transform: [{ scale: this.animatedPlayValue}] }
        const animatedStyleSettings = { transform: [{ scale: this.animatedSettingsValue}] }

        return (
            <View style={styles.global.homeScreenContainer}>
                <StatusBar backgroundColor="#eee" barStyle="dark-content" animated />
                <Image style={styles.global.homeScreenLogotype} source={require('../assets/images/logotype.png')} />
                <View style={styles.global.homeScreenNavigation}>
                    <TouchableWithoutFeedback
                        onPress={ () => this.props.navigation.navigate('Game') }
                        onPressIn={ this.handlePlayPressIn.bind(this) }
                        onPressOut={ this.handlePlayPressOut.bind(this) }
                    >
                        <Animated.View style={[styles.global.homeScreenNavigationElement, animatedStylePlay]}>
                            <View style={styles.global.homeScreenNavigationElementIcon}>
                                <Icon color="#18EC90" size={28} name="ios-play" />
                            </View>
                            <Text style={styles.global.homeScreenNavigationElementLabel}>Nouvelle partie</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.navigate('Settings') }
                        onPressIn={this.handleSettingsPressIn.bind(this)}
                        onPressOut={this.handleSettingsPressOut.bind(this)}
                    >
                        <Animated.View style={[styles.global.homeScreenNavigationElement, animatedStyleSettings]}>
                            <View style={styles.global.homeScreenNavigationElementIcon}>
                                <Icon color="#3C433E" size={28} name="ios-settings" />
                            </View>
                            <Text style={styles.global.homeScreenNavigationElementLabel}>Options</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.global.homeCreditText}>Design & Dev by {'\n'} Julien Perros with ReactNative</Text>
            </View>
        )
    }
}