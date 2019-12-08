import { Animated, Easing } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import views from '../screens'
import transitions from './transitions/'

/**
 * Screen transition configuration
 */
const transitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 500,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps) => {
            const { layout, position, scene } = sceneProps;
            const params = scene.route.params || {};
            const transition = params.transition || 'slideFromRight';

            return transitions[transition](scene.index, position, layout.initWidth);
        },
    }
}


/**
 * App router
 */
const Router = createStackNavigator({
    Home: {
        screen: views.HomeScreen
    },
    Settings: {
        screen: views.SettingsScreen
    },
    Game: {
        screen: views.GameScreen
    }
},
{
    initialRouteName: 'Home',
    transitionConfig: transitionConfiguration,
    navigationOptions: {
        headerLeft: null
    },
});

export default createAppContainer(Router);