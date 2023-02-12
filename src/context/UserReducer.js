import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View, Text} from 'react-native';
import getData, {updateAsyncStorage} from '../store/StoreAsync';
import StoreAsync from '../store/StoreAsync';
import {generateUniqueId} from '../utils';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const INITIAL_STATE = 'INITIAL_STATE';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const initialState = {
  transactions: [],
  totalExpense: 0,
  accounts: [],
  readSMSIDs: [],
};

export const initialStates = {
  transactions: [
    {
      id: 1,
      title: 'Test 1',
      amount: 1000,
      type: 'debited',
      desc: 'Test sampel',
      date: new Date(),
      accountId: 1,
      dateTimeText: {
        date: null,
        time: null,
      },
    },
    {
      id: 2,
      title: 'Test 2',
      amount: 200,
      type: 'credited',
      desc: 'Test sampel',
      date: new Date(),
      accountId: 1,
      dateTimeText: {
        date: null,
        time: null,
      },
    },
    {
      id: 3,
      title: 'Test 3',
      amount: 40,
      type: 'debited',
      desc: 'Test sampel',
      date: new Date(),
      accountId: 1,
      dateTimeText: {
        date: null,
        time: null,
      },
    },
    {
      id: 4,
      title: 'Test 4',
      amount: 90,
      type: 'credited',
      desc: 'Test sampel',
      date: new Date(),
      accountId: 1,
      dateTimeText: {
        date: null,
        time: null,
      },
    },
    {
      id: 5,
      title: 'Test 5',
      amount: 55,
      type: 'income',
      desc: 'Test sampel',
      date: new Date(),
      accountId: 1,
      dateTimeText: {
        date: null,
        time: null,
      },
    },
  ],
  totalExpense: 1000,
  accounts: [
    {
      id: 1,
      title: 'Paytm Bank',
      desc: '91 8686506505',
      amount: 7908,
      type: 'income',
      vendor: 'bank',
    },
    {
      id: 2,
      title: 'ICICI Bank',
      desc: '*********124',
      amount: 12340,
      type: 'income',
      vendor: 'bank',
    },
  ],
};

export default UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_TRANSACTION: {
      var temp = {
        ...state,
        readSMSIDs: [...state.readSMSIDs, action.payload.smsId],
        transactions: [
          ...state.transactions,
          {...action.payload, id: generateUniqueId(action.payload.title)},
        ],
        accounts: state.accounts.map(account => {
          if (account.id === action.payload.accountId) {
            if (action.payload.type === 'debited') {
              if (
                parseFloat(account.amount) >= parseFloat(action.payload.amount)
              ) {
                return {
                  ...account,
                  amount:
                    parseFloat(account.amount) -
                    parseFloat(action.payload.amount),
                };
              } else {
                console.log('errors', account.amount, action.payload.amount);
                //throw new Error('Insufficient balance');
              }
            } else if (action.payload.type === 'credited') {
              return {
                ...account,
                amount:
                  parseFloat(account.amount) +
                  parseFloat(action.payload.amount),
              };
            }
          }
          return account;
        }),
      };
      if (action.payload.type === 'debited') {
        temp = {
          ...temp,
          totalExpense:
            parseFloat(action.payload.amount) + parseFloat(state.totalExpense),
        };
      }
      // console.log('ad', temp);
      updateAsyncStorage(temp);
      return temp;
    }
    case UPDATE_TRANSACTION: {
      const {id, accountId, amount} = action.payload;
      const transactions = [...state.transactions];
      const accounts = [...state.accounts];
      const transactionIndex = transactions.findIndex(
        transaction => transaction.id === id,
      );
      const transaction = transactions[transactionIndex];
      const oldAccount = accounts.find(
        account => account.id === transaction.accountId,
      );
      const newAccount = accounts.find(account => account.id === accountId);
      if (amount > newAccount.amount) {
        throw new Error('Amount is greater than the account balance');
      }
      oldAccount.amount =
        parseFloat(oldAccount.amount) + parseFloat(transaction.amount);
      newAccount.amount = parseFloat(newAccount.amount) - parseFloat(amount);
      transactions[transactionIndex] = {
        ...transaction,
        ...action.payload,
      };
      try {
        const jsonValue = JSON.stringify(value);
        AsyncStorage.setItem('@initialState', jsonValue);
      } catch (e) {
        // saving error
      }
      updateAsyncStorage({
        ...state,
        transactions,
        accounts,
        totalExpense:
          parseFloat(state.totalExpense) -
          parseFloat(transaction.amount) +
          parseFloat(amount),
      });

      return {
        ...state,
        transactions,
        accounts,
        totalExpense:
          parseFloat(state.totalExpense) -
          parseFloat(transaction.amount) +
          parseFloat(amount),
      };
    }

    case DELETE_TRANSACTION:
      temp = {
        ...state,
        transactions: state.transactions.filter(
          item => item.id !== action.payload.id,
        ),
        accounts: state.accounts.map(account => {
          if (account.id === action.payload.accountId) {
            account.amount = parseFloat(account.amount);
            action.payload.amount = parseFloat(action.payload.amount);
            account.amount += action.payload.amount;
          }
          return account;
        }),
        totalExpense:
          parseFloat(state.totalExpense) - parseFloat(action.payload.amount),
      };
      updateAsyncStorage(temp);
      return temp;

    case ADD_ACCOUNT:
      temp = {
        ...state,
        accounts: [
          ...state.accounts,
          {...action.payload, id: generateUniqueId(action.payload.title)},
        ],
      };
      updateAsyncStorage(temp);
      return temp;
    case UPDATE_ACCOUNT:
      temp = {
        ...state,
        accounts: state.accounts.map(account => {
          if (account.id === action.payload.id) {
            return action.payload;
          }
          return account;
        }),
      };
      updateAsyncStorage(temp);
      return temp;
    case DELETE_ACCOUNT:
      temp = {
        ...state,
        accounts: state.accounts.filter(
          account => account.id !== action.payload.id,
        ),
      };
      updateAsyncStorage(temp);
      return temp;
    default:
      return state;
  }
};
