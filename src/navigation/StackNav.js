import {Animated} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Modal from '../components/molecules/Modal';
import Accounts from '../screens/Accounts';
import AddAccountModal from '../screens/AddAccountModal';
import AddBook from '../screens/AddBook';
import AddTransBook from '../screens/AddTransBook';
import AddTransaction from '../screens/AddTransaction';
import AllTransactions from '../screens/AllTransactions';
import Bills from '../screens/Bills';
import BookInfo from '../screens/BookInfo';
import EditProfile from '../screens/EditProfile';
import EditTransaction from '../screens/EditTransaction';
import EmaiTransactions from '../screens/EmaiTransactions';
import Expenses from '../screens/Expenses';
import Loans from '../screens/Loans';
import Login from '../screens/Login';
import Settings from '../screens/Settings';
import {colors} from '../styles';
import BottomTabs from './BottomTabs';
const Stack = createStackNavigator();

const items = [
  {
    name: 'HomeTab',
    component: BottomTabs,
  },
  {
    name: 'All Transactions',
    component: AllTransactions,
    headerShown: true,
  },
  {
    name: 'Book Details',
    component: BookInfo,
    headerShown: true,
  },
  {
    name: 'Accounts',
    component: Accounts,
    headerShown: true,
  },
  {
    name: 'Loans',
    component: Loans,
    headerShown: true,
  },
  {
    name: 'Bills',
    component: Bills,
    headerShown: true,
  },
  {
    name: 'Settings',
    component: Settings,
    headerShown: true,
  },
  {
    name: 'EditProfile',
    component: EditProfile,
    headerShown: true,
  },
  {
    name: 'Expenses',
    component: Expenses,
    headerShown: true,
  },
  {
    name: 'EditTransaction',
    component: EditTransaction,
    headerShown: true,
  },
  {
    name: 'AddAccount',
    component: AddAccountModal,
    headerShown: true,
  },
  {
    name: 'addTransaction',
    component: AddTransaction,
    headerShown: true,
  },
  {
    name: 'addTransactionBook',
    component: AddTransBook,
    headerShown: true,
  },
  {
    name: 'AddBook',
    component: AddBook,
    headerShown: true,
  },
  {
    name: 'EmailTransaction',
    component: EmaiTransactions,
    headerShown: true,
  },
  {
    name: 'Login',
    component: Login,
    headerShown: true,
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
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: colors.BLACK_4},
      }}>
      {items.map((item, index) => (
        <Stack.Screen
          name={item.name}
          key={index}
          component={item.component}
          options={{
            headerShown: item.headerShown ? item.headerShown : false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: forSlide,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
      ))}
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
