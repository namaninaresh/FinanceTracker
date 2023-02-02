import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {colors} from '../../styles';

import {Card} from '../atoms';
import {TransItem} from '../atoms';

import SmsAndroid from 'react-native-get-sms-android';
import {useEffect, useState} from 'react';
import {getLastWorkingDay} from '../../utils';
const data = [
  {
    title: 'sample ',
    desc: 'some sample',
    amount: 1000,
    type: 'income',
    date: new Date(),
  },
  {
    title: 'sample 2',
    desc: 'some sample2',
    amount: 10,
    type: 'expense',
    date: new Date(),
  },
  {
    title: 'sample ',
    desc: 'some sample',
    amount: 1000,
    type: 'income',
    date: new Date(),
  },
  {
    title: 'sample 2',
    desc: 'some sample2',
    amount: 10,
    type: 'expense',
    date: new Date(),
  },
];

const Recent = props => {
  const deleteItem = ({item, index}) => {
    console.log('delete', item, index);
  };

  const [items, setItems] = useState([]);
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
    minDate: 1677522600, // timestamp (in milliseconds since UNIX epoch)
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

  const requestSmsPermission = async () => {
    const tempItems = [];
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
              const temp = {
                title: object.body,
                desc: object.body,
                amount: 1000,
                type: 'income',
                date: object.date_sent,
              };
              tempItems.push(temp);
            });
            setItems(tempItems);
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  console.log(items);
  useEffect(() => {
    // getLastWorkingDay();
    requestSmsPermission();
  }, []);
  return (
    <Card style={{paddingHorizontal: 0}}>
      <Card.Title beforeColor={colors.VOILET_LIGHT} navigate="All Transactions">
        Recent
      </Card.Title>
      {items.map((item, index) => (
        <TransItem
          item={item}
          key={index}
          index={index}
          onClick={() => {
            //console.log("Pressed", item, index);
            deleteItem({item, index});
          }}
        />
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Recent;
