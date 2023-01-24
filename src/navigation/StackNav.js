import {StyleSheet, View, Text, Animated} from 'react-native';

import AppLayout from '../layout/AppLayout';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../styles';
import Home from '../screens/Home';
const Stack = createStackNavigator();

const items = [
  {
    name: 'Home',
    component: Home,
  },
];

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const forSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};

const StackNav = props => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: Colors.BLACK_4},
      }}>
      {items.map((item, index) => (
        <Stack.Screen
          name={item.name}
          key={index}
          component={item.component}
          options={{
            cardStyleInterpolator: forSlide,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNav;
