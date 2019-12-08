import React from 'react'
import { ScrollView, View, TouchableNativeFeedback, Text, TextInput, Picker, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles'
import Icon from 'react-native-ionicons'

var _getStatePreferences;
var _navigation;

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            preferences: {
                amount: '10',
                difficulty: 'any',
                type: 'any',
            }
        }

        _getStatePreferences = this.getState.bind(this)
        _navigation = this.props.navigation

        this.getSavedPreferences()
    }
    
    static navigationOptions = {
        title: 'Vos préférences',
        headerTitleStyle: styles.settings.headerTitle,
        headerRight: () => (
            <View style={styles.settings.headerBtnSave}>
                <TouchableNativeFeedback onPress={SettingsScreen.handleClickOnSave.bind(this)}>
                    <View style={styles.settings.headerBtnSaveWrapper}>
                        <Icon color="#3C433E" size={24} name="ios-save" />
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    static handleClickOnSave() {
        const preferences = _getStatePreferences(); 

        Keyboard.dismiss();

        (async () => {
            await AsyncStorage.setItem('@preferences', JSON.stringify(preferences));
            _navigation.goBack();
        })();
    }

    getSavedPreferences() {
        (async () => {
            const preferences = await AsyncStorage.getItem('@preferences');
            if (preferences) {
                this.setState({ preferences: JSON.parse(preferences) });
            }
        })()
    }
    
    getState() {
        return this.state.preferences;
    }

    handleQuestionNumberChange(value) {
        if (Number(value) > 100) value = 100;

        this.setState({
            preferences: {
                ...this.state.preferences,
                amount: String(value)
            }
        })
    }

    handleDifficultyChange(value) {
        this.setState({
            preferences: {
                ...this.state.preferences,
                difficulty: value
            }
        })
    }

    handleTypeChange(value) {
        this.setState({
            preferences: {
                ...this.state.preferences,
                type: value
            }
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.global.screenContainer}>
                    <View style={styles.settings.container}>
                        <View style={styles.settings.formSettings}>
                            <View style={styles.settings.formRow}>
                                <Text style={styles.settings.formLabel}>Nombre de questions</Text>
                                <TextInput value={this.state.preferences.amount} maxLength={3} style={styles.settings.formInput} onSubmitEditing={() => console.log('onSubmitEditing')} onChangeText={(value) => this.handleQuestionNumberChange(value)} keyboardType={'numeric'} editable />
                            </View>
                            <View style={styles.settings.formRow}>
                                <Text style={styles.settings.formLabel}>Difficulté</Text>
                                <View style={styles.settings.formInputPicker}>
                                    <Picker style={styles.settings.picker} selectedValue={this.state.preferences.difficulty} onValueChange={(value) => this.handleDifficultyChange(value)}>
                                        <Picker.Item label="Toutes" value="any" />
                                        <Picker.Item label="Facile" value="easy" />
                                        <Picker.Item label="Normal" value="medium" />
                                        <Picker.Item label="Difficile" value="hard" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.settings.formRow}>
                                <Text style={styles.settings.formLabel}>Type</Text>
                                <View style={styles.settings.formInputPicker}>
                                    <Picker style={styles.settings.picker} selectedValue={this.state.preferences.type} onValueChange={(value) => this.handleTypeChange(value)}>
                                        <Picker.Item label="Tout" value="any" />
                                        <Picker.Item label="Choix multiple" value="multiple" />
                                        <Picker.Item label="Vrai/Faux" value="boolean" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}