import {StyleSheet, View, Text} from 'react-native';
import AppLayout from '../layout/AppLayout';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../styles';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import AddTransaction from '../screens/AddTransaction';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
const Tab = createBottomTabNavigator();
const items = [
  {
    name: 'Home',
    component: Home,
    iconName: 'home',
  },
  {
    name: 'Search',
    component: Search,
    iconName: 'file-search',
  },
  {
    name: 'addTransaction',
    component: AddTransaction,
    iconName: 'plus-circle',
    iconColor: Colors.ORANGE_DARK,
    iconSize: 30,
  },
  {
    name: 'Notifications',
    component: Notifications,
    iconName: 'bell',
  },
  {
    name: 'Profile',
    component: Profile,
    iconName: 'account',
  },
];

const BottomTabs = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.WHITE,
        tabBarInactiveTintColor: Colors.BLACK_1,
        tabBarStyle: {
          backgroundColor: Colors.BLACK_4,
          borderTopWidth: 0,
          height: 60,
        },
      }}>
      {items.map((item, index) => (
        <Tab.Screen
          name={item.name}
          key={index}
          component={item.component}
          options={{
            tabBarLabel: item.name,
            tabBarIcon: ({color, size}) => (
              <Icon
                name={item.iconName}
                color={item.iconColor ? item.iconColor : color}
                size={item.iconSize ? item.iconSize : size}
              />
            ),
          }}
        />
      ))}

      {/*<Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="file-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="addTransaction"
        component={AddTransaction}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="plus-circle"
              color={focused ? Colors.ORANGE_DARK : Colors.ORANGE_LIGHT}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default BottomTabs;
