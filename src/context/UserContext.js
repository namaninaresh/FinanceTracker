import {createContext, useEffect, useReducer, useState} from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import {PermissionsAndroid} from 'react-native';
import UserReducer, {
  ADD_ACCOUNT,
  ADD_TRANSACTION,
  DELETE_ACCOUNT,
  DELETE_TRANSACTION,
  initialState,
  INITIAL_STATE,
  UPDATE_ACCOUNT,
  UPDATE_TRANSACTION,
} from './UserReducer';
import {useNavigation} from '@react-navigation/native';
import {getInitialData, updateAsyncStorage} from '../store/StoreAsync';

export const UserContext = createContext(initialState);

const UserContextProvider = ({children}) => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const addTransaction = transaction => {
    dispatch({
      type: ADD_TRANSACTION,
      payload: transaction,
    });
  };
  const updateTransaction = transaction => {
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: transaction,
    });
  };
  const deleteTransaction = transaction => {
    dispatch({
      type: DELETE_TRANSACTION,
      payload: transaction,
    });
  };
  const addAccount = account => {
    dispatch({
      type: ADD_ACCOUNT,
      payload: account,
    });
  };
  const updateAccount = account => {
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: account,
    });
  };

  const deleteAccount = account => {
    dispatch({
      type: DELETE_ACCOUNT,
      payload: account,
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

    getInitialData()
      .then(res =>
        dispatch({
          type: INITIAL_STATE,
          payload: res,
        }),
      )
      .catch(er => console.log('ere', er));
  }, []);

  return (
    <UserContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        addAccount,
        updateAccount,
        deleteAccount,
        updateTransaction,
        deleteTransaction,
        readSMSIDs: state.readSMSIDs,
        totalExpense: state.totalExpense,
        accounts: state.accounts,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
