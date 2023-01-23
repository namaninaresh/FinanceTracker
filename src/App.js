import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppLayout from './layout/AppLayout';
import SmsAndroid from 'react-native-get-sms-android';
const App = props => {
  var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
    read: 1,
    indexFrom: 0, // start from index 0
    maxCount: 10, // count of SMS to return each time
  };

  SmsAndroid.list(
    JSON.stringify(filter),
    fail => {
      console.log('Failed with this error: ' + fail);
    },
    (count, smsList) => {
      console.log('Count: ', count);
      console.log('List: ', smsList);
      var arr = JSON.parse(smsList);

      arr.forEach(function (object) {
        console.log('Object: ' + object);
        console.log('-->' + object.date);
        console.log('-->' + object.body);
      });
    },
  );
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppLayout>
      <View>
        <Text>hwllo</Text>
      </View>
    </AppLayout>
  );
};

export default App;
