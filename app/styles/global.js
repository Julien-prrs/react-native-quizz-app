import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    homeScreenContainer: {
        backgroundColor: '#fefefe',
        flex: 1,
        paddingTop: 90,
        alignItems: "center"
    },
    homeScreenLogotype: {
        width: 120,
        height: 150
    },
    homeScreenNavigation: {
        marginTop: 40
    },
    homeCreditText: {
        fontFamily: "roboto",
        position: "absolute",
        bottom: 25,
        textAlign: "center",
        paddingLeft: 50,
        paddingRight: 50,
        color: '#C3C3C3',
        fontSize: 10,
        lineHeight: 16
    },
    homeScreenNavigationElement: {
        borderRadius: 10,
        padding: 12,
        backgroundColor: 'white',
        width: 240,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2
    },
    homeScreenNavigationElementLabel: {
        fontWeight: '700',
        color: '#3C433E'
    },
    homeScreenNavigationElementIcon: {
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    }
});