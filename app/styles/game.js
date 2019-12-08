import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    screenContainer: {
        flex: 1
    },
    questionContainer: {
        flex: 4.5,
        backgroundColor: '#f9f9f9'
    },
    answerContainer: {
        paddingHorizontal: 30,
        paddingTop: 30,
        flex: 5.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameContainer: {
        flex: 1
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#18EC90'
    },
    rowHeaderText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff'
    },
    questionWrapper: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    question: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 30
    },
    answerItem: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ededed',
        paddingVertical: 13,
        paddingHorizontal: 25,
        marginBottom: 15,
        minWidth: 160,
    },
    answerItemLabel: {
        textAlign: 'center'
    }
});