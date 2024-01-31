import {useNavigation} from '@react-navigation/native';
import {Card} from '_atoms';
import {colors} from '_styles';
import {FONT_BOLD, FONT_SIZE_28} from '_styles/typography';
import {MoneyFormat} from '_utils';
import {useContext, useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {UserContext} from '../../context/UserContext';

import SmsAndroid from 'react-native-get-sms-android';
import {getLastWorkingDay, isFakeSms} from '../../utils';

const Dashboard = props => {
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
  const {totalExpense} = useContext(UserContext);

  return (
    <Card>
      <Card.Title>Dashboard</Card.Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={true}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Expenses')}
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            //backgroundColor: colors.BLACK_3,
            backgroundColor: 'rgba(167, 170, 247, 0.15)',
            height: 100,
            borderWidth: 0.5,
            borderColor: colors.BLACK_1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            width: 200,
          }}>
          <Text style={{color: colors.WHITE}}>EXPENSES</Text>
          <Text style={styles.totalCost}>{MoneyFormat(totalExpense)}</Text>
        </TouchableOpacity>

        {accounts.map((account, index) => {
          return (
            <View
              key={index}
              style={{
                marginVertical: 20,
                marginHorizontal: 10,
                backgroundColor: 'rgba(177, 229, 252, 0.1)',
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                width: 200,
              }}>
              <Text style={{color: colors.WHITE}}>{account.title}</Text>
              <Text style={styles.totalCost}>
                {MoneyFormat(account.amount)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  totalCost: {
    fontSize: FONT_SIZE_28,
    fontWeight: FONT_BOLD.fontWeight,
    color: 'white',
    paddingVertical: 10,
  },
});

export default Dashboard;
