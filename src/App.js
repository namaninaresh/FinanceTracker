import React, {useEffect, useState} from 'react';
import {Text, View, Animated} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import StackNav from './navigation/StackNav';
import BottomTabs from './navigation/BottomTabs';
import Splash from './screens/Splash';
import SplashScreen from 'react-native-splash-screen';
import UserContextProvider from './context/UserContext';

const App = props => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <UserContextProvider>
        <StackNav />
      </UserContextProvider>
    </NavigationContainer>
  );
};

export default App;
