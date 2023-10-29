import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import Card from '../components/atoms/Card';

import {useNavigation} from '@react-navigation/native';
import SmsAndroid from 'react-native-get-sms-android';
import Dropdown from '../components/atoms/Dropdown';
import Text from '../components/atoms/Text';
import TransItem from '../components/atoms/TransItem';
import Chip from '../components/molecules/Chip';
import FAB from '../components/molecules/Fab';
import {UserContext} from '../context/UserContext';
import AppLayout from '../layout/AppLayout';
import {getLastWorkingDay, isFakeSms} from '../utils';

const Notifications = props => {
  const navigation = useNavigation();
  var filter = {
    box: '', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

    minDate: getLastWorkingDay(),
    maxDate: new Date().getTime(),

    indexFrom: 0, // start from index 0
    bodyRegex:
      '(.*)(credited|debited|spent|received|Balance|sent|paid|balance)(.*)',
  };

  const {deleteTransaction, accounts, addMultipleTransaction, readSMSIDs} =
    useContext(UserContext);

  const [newtrans, settrans] = useState([]);

  const readSmsList = async () => {
    console.log('reading again');
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
            //console.warn('count', count);
            var arr = JSON.parse(smsList);

            // console.info('sord=>', sortedTransactionsByDate(smsList));

            let temp = [];
            let bankAccounts = accounts;

            arr.forEach(function (object, index) {
              if (readSMSIDs.includes(object._id)) {
                console.log('notification page : message read');
              } else {
                if (!isFakeSms(object.body.toString())) {
                  let title = object.body.toString();
                  let description = object.body;
                  let amount = 0.0;
                  let type = '';
                  let date = '';
                  let cardNumber = '';
                  let accountId = '';

                  // if (description.includes('debited')) {
                  //   title = description.match(/debited for.*?(\w+)/)[1];
                  // } else {
                  //   title = description.match(/spent on.*?at (\w+)/)[1];
                  // }
                  // Extract the amount
                  let amountMatch = description.match(
                    /(Rs|INR)\s([\d,]+(\.\d+)?)/,
                  );
                  if (amountMatch) {
                    amount = parseFloat(amountMatch[2].replace(/,/g, ''));
                    console.log('index=' + index + 'amount=', amount);
                  }

                  // Extract the date
                  let dateMatch = description.match(/(\d{2}-\w{3}-\d{2})/);
                  if (dateMatch) {
                    date = dateMatch[0];
                  }

                  // Extract the last 4 digits of the card
                  //let cardNumberMatch = description.match(/XX\d{4}/);

                  let cardNumberMatch = description.match(/XX\d+/);
                  if (cardNumberMatch) {
                    cardNumber = cardNumberMatch[0].substring(
                      2,
                      cardNumberMatch[0].length,
                    );
                  }
                  // if (cardNumberMatch) {
                  //             cardLastFourDigits = cardNumberMatch[0].substr(-4);
                  //           }

                  // Extract the type
                  let typeMatch = description.match(
                    /debited|credited|spent|sent|paid|received/,
                  );
                  if (typeMatch) {
                    type = typeMatch[0];

                    if ((type == 'spent') | (type == 'paid') | (type == 'sent'))
                      type = 'debited';
                    if (type == 'received') type = 'credited';
                  }

                  temp.push({
                    title: title,
                    desc: description,
                    amount: amount,
                    type: type,
                    smsId: object._id,
                    date: new Date(object.date),
                    accountId: cardNumber,
                    dateTimeText: {
                      date: null,
                      time: null,
                    },
                  });
                  /* addTransaction({
                    title: title,
                    desc: description,
                    amount: amount,
                    type: type,
                    smsId: object._id,
                    date: new Date(object.date_sent),
                    accountId: accountId,
                    dateTimeText: {
                      date: null,
                      time: null,
                    }, 
                  }); */
                }
              }
            });
            //console.log('bankacc', bankAccounts);
            if (temp.length > 0) addMultipleTransaction(temp);
            //settrans(temp);
          },
        );
      } else {
        console.log('Sms permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getLastWorkingDay();
    readSmsList();
  }, []);
  const [filterSelected, setFilters] = useState([]);

  const options = ['All', 'Today', 'Price-High', 'Price-low'];

  const deleteFilter = index => {
    setFilters(current => current.filter((item, i) => i !== index));
    /*const index= filterSelected.findIndex(item => item.include("price"));

   if(index !== -1)
   {
    filterSelected.splice(index,1,text);
   }
   else filterSelected.push(text); */
  };

  const onValueChange = text => {
    const array = [...filterSelected];
    if (text.includes('Price')) {
      const index = array.findIndex(item => item.includes('Price'));
      if (index !== -1) {
        array.splice(index, 1);
        setFilters([...array, text]);
      } else {
        setFilters([...array, text]);
      }
    } else if (text.includes('All') || text.includes('Today')) {
      const index = array.findIndex(
        item => item.includes('All') || item.includes('Today'),
      );
      if (index !== -1) {
        array.splice(index, 1);
        setFilters([...array, text]);
      } else {
        setFilters([...array, text]);
      }
    } else {
      if (filterSelected.indexOf(text) === -1)
        setFilters([...filterSelected, text]);
    }
  };
  return (
    <AppLayout>
      <View
        style={{
          flexDirection: 'row',
          zIndex: 1000,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            justifyContent: 'flex-end',
          }}>
          <Text style={{paddingHorizontal: 10}}>Filter By</Text>

          {/*<Icon name="filter-variant" size={24} color={'white'} /> */}
        </TouchableOpacity>
        <Dropdown options={options} onValueChange={onValueChange} />
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={true}>
          {filterSelected.map((filter, index) => (
            <Chip
              size="small"
              label={filter}
              key={index}
              variant="filled"
              color="default"
              onDelete={() => deleteFilter(index)}
            />
          ))}
        </ScrollView>
      </View>

      <Card>
        <FlatList
          data={newtrans}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TransItem
              item={item}
              index={index}
              key={index}
              onClick={() => {
                navigation.navigate('addTransaction', item);
              }}
              onDelete={() => deleteTransaction(item)}
            />
          )}
          contentContainerStyle={{
            padding: 5,
            paddingBottom: 20 + (filterSelected.length > 0 && 30),
          }}
        />
      </Card>
      <FAB />
    </AppLayout>
  );
};

export default Notifications;

/*import {StyleSheet, View} from 'react-native';
import AppLayout from '../layout/AppLayout';
import Text from '../components/atoms/Text';

const Notifications = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text variant={'displayLarge'}>Display Large </Text>
        <Text variant={'displayMedium'}>Display Medium </Text>
        <Text variant={'displaySmall'}>Display Small </Text>
        <Text variant={'headlineLarge'}>Headline Large </Text>
        <Text variant={'headlineMedium'}>Headline Medium </Text>
        <Text variant={'headlineSmall'}>Headline Small </Text>
        <Text variant={'titleLarge'}>Title Large </Text>
        <Text variant={'titleMedium'}>Title Medium </Text>
        <Text variant={'titleSmall'}>Title Small </Text>

        <Text variant={'labelLarge'}>Label Large </Text>
        <Text variant={'labelMedium'}>Label Medium </Text>
        <Text variant={'labelSmall'}>Label Small </Text>
        <Text variant={'bodyLarge'}>Body Large </Text>
        <Text variant={'bodyMedium'}>Body Medium </Text>
        <Text variant={'bodySmall'}>Body Small </Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});

export default Notifications; */
