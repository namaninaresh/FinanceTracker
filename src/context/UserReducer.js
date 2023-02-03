import {StyleSheet, View, Text} from 'react-native';
import {generateUniqueId} from '../utils';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export const initialState = {
  transactions: [
    {
      id: 1,
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
  ],
};

export default UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        totalExpense:
          Number(action.payload.amount) + Number(state.totalExpense),
        transactions: [
          ...state.transactions,
          {...action.payload, id: generateUniqueId(action.payload.title)},
        ],
      };

    case 'UPDATE_TRANSACTION':
      let prevAmount = 0;
      return {
        ...state,

        transactions: state.transactions.map(item => {
          if (item.id === action.payload.id) {
            prevAmount = item.amount;
            return action.payload;
          }
          return item;
        }),
        totalExpense:
          Number(state.totalExpense) +
          (Number(action.payload.amount) - Number(prevAmount)),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          item => item.id !== action.payload.id,
        ),
        totalExpense:
          Number(state.totalExpense) - Number(action.payload.amount),
      };

    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [
          ...state.accounts,
          {...action.payload, id: generateUniqueId(action.payload.title)},
        ],
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map(account => {
          if (account.id === action.payload.id) {
            return action.payload;
          }
          return account;
        }),
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};
