import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View, Text} from 'react-native';
import getData, {updateAsyncStorage} from '../store/StoreAsync';
import StoreAsync from '../store/StoreAsync';
import {
  generateUniqueId,
  getCurrentTimeUnix,
  sortedTransactionsByDate,
  sortedTransactionsOld,
} from '../utils';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const INITIAL_STATE = 'INITIAL_STATE';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const ADD_MULTIPLE_TRANSACTION = 'ADD_MULTIPLE_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const initialState = {
  transactions: [],
  totalExpense: 0,
  accounts: [],
  readSMSIDs: [],
  lastReadTimeStamp: 0,
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
      //updateAsyncStorage(temp);
      return temp;
    }
    case ADD_MULTIPLE_TRANSACTION: {
      let transactions = state.transactions;
      let accounts = [...state.accounts];
      let readSMSIDs = state.readSMSIDs;
      let totalExpense = state.totalExpense;
      action.payload = sortedTransactionsOld(action.payload);

      // Check if the payload is an array or an object
      if (Array.isArray(action.payload)) {
        // If it's an array, loop through each item and add the transaction
        action.payload.forEach((transaction, index) => {
          const regex = new RegExp(transaction.accountId);

          //  const sms2AccountType = sms2.match(accountTypeRegex)[0].toLowerCase();

          //  console.log(`card type: ${sms2AccountType}`);
          let account = accounts.find(
            account => regex.test(account.id),
            //account => account.id === transaction.accountId,
          );

          if (!account) {
            // createBankAccount() function should return the newly created account's id
            //accountId = createBankAccount(cardNumber);
            let accountId = generateUniqueId(transaction.accountId);

            const accountTypeRegex = /(acct|card|acc)/i; // matches "acct" or "card" (case-insensitive)
            try {
              let accountType = transaction.desc
                .match(accountTypeRegex)[0]
                .toLowerCase();

              if ((accountType === 'acc') | (accountType === 'acct'))
                accountType = 'bank';
              //  const bankName = sms1.match(/^\w+\s+Bank/)[0];

              const newAccount = {
                id: accountId,
                title: `${accountType.toUpperCase()} ${transaction.accountId}`,
                amount:
                  transaction.type === 'credited' ? 0 : transaction.amount,
                desc: transaction.accountId,
                vendor: accountType,
              };
              account = newAccount;
              transaction.accountId = accountId;
              accounts.push(newAccount);
            } catch (e) {
              console.log(e, transaction.desc);
            }
          }

          if (transaction.type === 'debited') {
            if (account.vendor === 'bank') {
              if (
                parseFloat(account.amount) >= parseFloat(transaction.amount)
              ) {
                account.amount =
                  parseFloat(account.amount) - parseFloat(transaction.amount);
                totalExpense =
                  parseFloat(transaction.amount) + parseFloat(totalExpense);
              } else {
                console.log('errors', account.amount, transaction.amount);
              }
            }
            if (account.vendor === 'card') {
              const availableBalanceRegex =
                /Avl\sLmt:\s?INR\s?([\d,]+(?:\.\d+)?)/;
              const availableBalanceMatch = transaction.desc.match(
                availableBalanceRegex,
              );
              const avlBalance = availableBalanceMatch
                ? availableBalanceMatch[1].replace(/,/g, '')
                : null;

              console.log('avl balance for card', avlBalance);
              account.amount = avlBalance;
              totalExpense =
                parseFloat(transaction.amount) + parseFloat(totalExpense);
            }
          } else if (transaction.type === 'credited') {
            console.log('amount=', account.amount, transaction.amount);
            account.amount =
              parseFloat(account.amount) + parseFloat(transaction.amount);

            /*return {
              ...account,
              amount:
                parseFloat(account.amount) + parseFloat(transaction.amount),
            }; */
          }

          readSMSIDs.push(transaction.smsId);
          transactions.push({
            ...transaction,
            id: generateUniqueId(transaction.title),
          });
        });
      }
      /*    let totalExpense = state.totalExpense;
    action.payload.forEach(transaction => {
        if (transaction.type === 'debited') {
          totalExpense =
            parseFloat(transaction.amount) + parseFloat(totalExpense);
        }
      }); */
      //console.log('accounts', accounts);
      // Update the state with the new transactions and accounts
      let temp = {
        ...state,
        readSMSIDs,
        transactions,
        accounts,
        lastReadTimeStamp: getCurrentTimeUnix(),
        totalExpense,
      };
      // updateAsyncStorage(temp);
      return temp;
    }
    case 'ADD_MULTIPLE_TRANSACTIONs': {
      let transactions = state.transactions;
      let accounts = state.accounts.slice();
      let readSMSIDs = state.readSMSIDs;

      // Check if the payload is an array or an object
      if (Array.isArray(action.payload)) {
        // console.log('accounts=>', accounts);
        // If it's an array, loop through each item and add the transaction
        action.payload.forEach(transaction => {
          const regex = new RegExp(transaction.accountId);
          const existingAccount = accounts.find(
            account => regex.test(account.id),
            //account => account.id === transaction.accountId,
          );

          console.log('exist', existingAccount, transaction.accountId);

          if (!existingAccount) {
            // createBankAccount() function should return the newly created account's id
            //accountId = createBankAccount(cardNumber);
            let accountId = generateUniqueId(transaction.accountId);
            const newAccount = {
              id: accountId,
              title: transaction.accountId,
              amount: transaction.amount,
              desc: transaction.accountId,
              vendor: 'bank',
            };

            transaction.accountId = accountId;
            accounts.push(newAccount);
          }

          accounts = accounts.map(account => {
            if (account.id === action.payload.accountId) {
              if (action.payload.type === 'debited') {
                if (
                  parseFloat(account.amount) >=
                  parseFloat(action.payload.amount)
                ) {
                  return {
                    ...account,
                    amount:
                      parseFloat(account.amount) -
                      parseFloat(action.payload.amount),
                  };
                } else {
                  console.log('errors', account.amount, action.payload.amount);
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
          });

          readSMSIDs.push(transaction.smsId);
          transactions.push({
            ...transaction,
            id: generateUniqueId(transaction.title),
          });
        });
      }
      console.log('after accounts', accounts);
      let totalExpense = state.totalExpense;
      action.payload.forEach(transaction => {
        if (transaction.type === 'debited') {
          totalExpense =
            parseFloat(transaction.amount) + parseFloat(totalExpense);
        }
      });

      // Update the state with the new transactions and accounts
      let temp = {
        ...state,
        readSMSIDs,
        transactions,
        accounts,
        totalExpense,
      };
      // updateAsyncStorage(temp);
      return temp;
    }

    /* case ADD_MULTIPLE_TRANSACTION: {
      console.log('add multple');
      let transactions = state.transactions;
      let accounts = state.accounts;
      let readSMSIDs = state.readSMSIDs;
      // Check if the payload is an array or an object
      if (Array.isArray(action.payload)) {
        // If it's an array, loop through each item and add the transaction
        action.payload.forEach(transaction => {
          readSMSIDs.push(transaction.smsId);
          transactions.push({
            ...transaction,
            id: generateUniqueId(transaction.title),
          });

          accounts = accounts.map(account => {
            if (account.id === transaction.accountId) {
              if (transaction.type === 'debited') {
                if (
                  parseFloat(account.amount) >= parseFloat(transaction.amount)
                ) {
                  return {
                    ...account,
                    amount:
                      parseFloat(account.amount) -
                      parseFloat(transaction.amount),
                  };
                } else {
                  console.log('errors', account.amount, transaction.amount);
                }
              } else if (transaction.type === 'credited') {
                return {
                  ...account,
                  amount:
                    parseFloat(account.amount) + parseFloat(transaction.amount),
                };
              }
            }
            return account;
          });
        });
      } else {
        // If it's an object, add the transaction as usual
        transactions = [
          ...state.transactions,
          {...action.payload, id: generateUniqueId(action.payload.title)},
        ];

        accounts = accounts.map(account => {
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
        });
      }

      let totalExpense = state.totalExpense;
      action.payload.forEach(transaction => {
        if (transaction.type === 'debited') {
          totalExpense =
            parseFloat(transaction.amount) + parseFloat(totalExpense);
        }
      });

      // Update the state with the new transactions and accounts
      let temp = {
        ...state,
        readSMSIDs,
        transactions,
        accounts,
        totalExpense,
      };
      // updateAsyncStorage(temp);
      return temp;
    } */
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

    case DELETE_TRANSACTION: {
      let transactions = state.transactions.filter(
        item => item.id !== action.payload.id,
      );
      let totalExpense = state.totalExpense;

      let accounts = state.accounts.map(account => {
        if (new RegExp(action.payload.accountId).test(account.id)) {
          account.amount = parseFloat(account.amount);
          action.payload.amount = parseFloat(action.payload.amount);
          if (action.payload.type === 'debited') {
            account.amount += action.payload.amount;
          } else account.amount -= action.payload.amount;
        }
        return account;
      });

      if (action.payload.type === 'debited') {
        totalExpense =
          parseFloat(state.totalExpense) - parseFloat(action.payload.amount);
      }

      //  updateAsyncStorage(temp);
      return (temp = {
        ...state,

        transactions,
        totalExpense,
        accounts,
      });
    }

    case ADD_ACCOUNT:
      temp = {
        ...state,
        accounts: [
          ...state.accounts,
          {...action.payload, id: generateUniqueId(action.payload.title)},
        ],
      };
      //updateAsyncStorage(temp);
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
