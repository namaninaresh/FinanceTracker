import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppLayout from './layout/AppLayout';
import SmsAndroid from 'react-native-get-sms-android';
import {Colors} from './styles';
const App = props => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppLayout>
      <View style={{height: 100, backgroundColor: Colors.BLACK_4}}>
        <Text style={{color: 'white'}}>hwllo</Text>
      </View>
    </AppLayout>
  );
};

export default App;
