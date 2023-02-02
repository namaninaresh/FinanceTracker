import {Button, PermissionsAndroid, StyleSheet, View} from 'react-native';
import AppLayout from '../layout/AppLayout';
import Text from '../components/atoms/Text';
import Dropdown from '../components/atoms/Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Badge from '../components/molecules/Badge';
import SmsAndroid from 'react-native-get-sms-android';
import {useEffect} from 'react';
import Chip from '../components/molecules/Chip';
const Search = props => {
  var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

    /**
     *  the next 3 filters can work together, they are AND-ed
     *
     *  minDate, maxDate filters work like this:
     *    - If and only if you set a maxDate, it's like executing this SQL query:
     *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
     *    - Same for minDate but with "date >= minDate"
     */
    //minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
    //maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
    //bodyRegex: '(.*)How are you(.*)', // content regex to match

    /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
    //read: 0, // 0 for unread SMS, 1 for SMS already read
    //_id: 1234, // specify the msg id
    //thread_id: 12, // specify the conversation thread_id
    //address: '+1888------', // sender's phone number
    //body: 'How are you', // content to match
    /** the next 2 filters can be used for pagination **/
    indexFrom: 0, // start from index 0
    maxCount: 10, // count of SMS to return each time
  };

  console.log(
    new Date(1554636310165).toLocaleString(),
    new Date(1556277910456).toLocaleString(),
  );

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
              console.log(
                '-->' + new Date(object.date_sent).toLocaleString('en-IS'),
              );
              console.log('-->' + object.body);
            });
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    // requestCameraPermission();
  }, []);

  return (
    <AppLayout style={{backgroundColor: '#000'}}>
      <View style={styles.container}>
        <Text>Search </Text>
        <Chip size="medium" label={'medium'} />
        <Chip size="small" label={'small'} />

        <Chip color="error" label={'error'} />
        <Chip color="error" variant="outlined" label={'error=o'} />

        <Chip color="primary" variant="filled" label={'primary'} />
        <Chip color="primary" variant="outlined" label={'primary-o'} />

        <Chip color="sucess" label={'sucess'} />
        <Chip
          color="sucess"
          variant="outlined"
          label={'sucess-o'}
          onDelete={() => {}}
        />

        <Chip
          color="warning"
          label={'war'}
          icon={'account'}
          onDelete={() => {}}
        />
        <Chip
          label={'warning-o'}
          color="warning"
          variant="outlined"
          onDelete={() => {}}
        />
        {/*<Dropdown
          options={options}
          selectedValue={options[0]}
          onValueChange={onValueChange}
          label="User"
        /> */}
      </View>
      <Badge />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
