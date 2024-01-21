import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import UserContextProvider from './context/UserContext';
import StackNav from './navigation/StackNav';

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
