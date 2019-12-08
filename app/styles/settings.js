import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        paddingVertical: 45
    },
    headerTitle: {
        fontWeight: '700',
        color: '#3C433E',
    },
    formSettings: {
        // Style here
    },
    headerBtnSave: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 40,
        overflow: 'hidden'
    },
    headerBtnSaveWrapper: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formRow: {
        marginBottom: 25
    },
    formLabel: {
        fontWeight: '700',
        marginBottom: 7
    },
    formInput: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#f4f4f4'
    },
    formInputPicker: {
        paddingLeft: 3,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: '#f4f4f4'
    },
    picker: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        height: 30
    }
})