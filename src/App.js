import React, {useEffect, useState} from 'react';
import {Text, View, Animated} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import StackNav from './navigation/StackNav';
import BottomTabs from './navigation/BottomTabs';
import Splash from './screens/Splash';

const App = props => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //  SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default App;
