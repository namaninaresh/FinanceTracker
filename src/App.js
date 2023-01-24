import React, {useEffect} from 'react';
import {Text, View, Animated} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import StackNav from './navigation/StackNav';
import BottomTabs from './navigation/BottomTabs';

const App = props => {
  useEffect(() => {
    //  SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default App;
