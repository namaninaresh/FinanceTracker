import {createContext, useEffect, useReducer, useState} from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';

const initialState = {
  transactions: [
    {
      title: 'Test 1',
      amount: 1000,
      desc: 'Test sampel',
      date: new Date(),
      dateTimeText: {
        date: null,
        time: null,
      },
    },
  ],
  totalExpense: 0,
  accounts: [],
};
export const UserContext = createContext(initialState);

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        totalExpense:
          Number(action.payload.amount) + Number(state.totalExpense),
        transactions: [...state.transactions, action.payload],
      };
    default:
      return state;
  }
};

const UserContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const addTransaction = transaction => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  };

  // State to store the SMS details
  const [smsData, setSmsData] = useState([]);

  var filter = {
    box: 'inbox',
    minDate: 1677522600, // timestamp (in milliseconds since UNIX epoch)

    indexFrom: 0, // start from index 0
    maxCount: 10, // count of SMS to return each time
  };

  const requestSmsPermission = async () => {
    const tempItems = [];
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'Sms Permission',
          message:
            'To read automatic transactions ' + ',need to get sms permission',
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
            //console.log('Count: ', count);
            //console.log('List: ', smsList);
            var arr = JSON.parse(smsList);

            /*arr.forEach(function (object) {
              const temp = {
                title: object.body,
                desc: object.body,
                amount: 1000,
                type: 'income',
                date: object.date_sent,
              };
              tempItems.push(temp);
            });
            setItems(tempItems); */

            setSmsData(arr);
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //console.log(smsData);
  useEffect(() => {
    // getLastWorkingDay();
    // requestSmsPermission();
  }, []);

  return (
    <UserContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        totalExpense: state.totalExpense,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
