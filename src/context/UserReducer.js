import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAsyncStorage} from '../store/StoreAsync';
import {
  generateUniqueId,
  getCurrentTimeUnix,
  smsPatternsVerify,
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
export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export const ADD_TRANSACTION_BOOK = 'ADD_TRANSACTION_BOOK';
export const UPDATE_TRANSACTION_BOOK = 'UPDATE_TRANSACTION_BOOK';
export const DELETE_TRANSACTION_BOOK = 'DELETE_TRANSACTION_BOOK';
export const initialState = {
  transactions: [],
  totalExpense: 0,
  accounts: [],
  books: [],
  readSMSIDs: [],
  lastReadTimeStamp: 0,
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
          if (transaction.desc.includes('PERSONAL LOAN')) {
          } else if (transaction.desc.includes('Balances for Ac')) {
            const regex = /Ac\s+X{8}(\d+)\s+/;
            const match = transaction.desc.match(regex);
            const accountNumber = match ? match[1] : null;

            const balanceMatch = transaction.desc.match(
              /Avbl\. Bal:\s+INR\s+([\d.]+)/,
            );
            const balance = balanceMatch ? parseFloat(balanceMatch[1]) : null;
            const account = accounts.find(acc =>
              accountNumber.includes(acc.desc),
            );
            if (account) account.amount = balance;
          } else {
            const smsDetails = smsPatternsVerify(transaction);

            //console.log('sms', smsDetails);
            if (smsDetails && smsDetails.title !== undefined) {
              transaction.title = smsDetails && smsDetails.title;
            }

            if (smsDetails && smsDetails.amount !== undefined) {
              smsDetails.amount = smsDetails.amount.replace(/,/g, '');
              transaction.amount = smsDetails && parseFloat(smsDetails.amount);
            }

            const regex = new RegExp(transaction.accountId);

            //  const sms2AccountType = sms2.match(accountTypeRegex)[0].toLowerCase();

            if (transaction.desc.includes('PPBL')) {
              transaction.amount = smsDetails && parseFloat(smsDetails.amount);
            }
            //  console.log(`card type: ${sms2AccountType}`);
            let account = accounts.find(
              account => regex.test(account.id),
              //account => account.id === transaction.accountId,
            );
            if (account) transaction.accountId = account.id;

            if (!account) {
              // createBankAccount() function should return the newly created account's id
              //accountId = createBankAccount(cardNumber);
              let accountId = generateUniqueId(transaction.accountId);

              const accountTypeRegex = /(acct|card|acc|a\/c)/i; // matches "acct" or "card" (case-insensitive)
              try {
                let accountType = transaction.desc
                  .match(accountTypeRegex)[0]
                  .toLowerCase();

                if (
                  (accountType === 'acc') |
                  (accountType === 'acct') |
                  (accountType === 'a/c')
                )
                  accountType = 'bank';

                const newAccount = {
                  id: accountId,
                  title: `${accountType.toUpperCase()} ${
                    transaction.accountId
                  }`,
                  amount: 0,
                  desc: transaction.accountId,
                  vendor: accountType,
                };

                account = newAccount;
                transaction.accountId = accountId;
                accounts.push(newAccount);
              } catch (e) {
                console.log('**', e, transaction.desc);
              }
            }

            if (transaction.type === 'debited') {
              if (account.vendor === 'bank') {
                account.amount =
                  parseFloat(account.amount) - parseFloat(transaction.amount);

                if (account.amount < 0) account.amount = 0;
                totalExpense =
                  parseFloat(transaction.amount) + parseFloat(totalExpense);
              }
              if (account.vendor === 'card') {
                account.amount += smsDetails && parseFloat(smsDetails.amount);
                //account.amount = smsDetails && smsDetails.availableBalance;

                totalExpense =
                  parseFloat(transaction.amount) + parseFloat(totalExpense);
              }
            } else if (transaction.type === 'credited') {
              if (account.vendor === 'card') {
                account.amount -= parseFloat(transaction.amount);
                if (account.amount < 0) account.amount = 0;
              } else
                account.amount =
                  parseFloat(account.amount) + parseFloat(transaction.amount);
            }
            if (smsDetails && smsDetails.availableBalance) {
              if (account.vendor !== 'card')
                account.amount = smsDetails.availableBalance;
            }

            if (transaction.desc.includes('ATM')) {
              if (smsDetails) {
                let balance = parseFloat(smsDetails.availableBalance);
                account.amount = balance;
              }
            }

            readSMSIDs.push(transaction.smsId);
            transactions.push({
              ...transaction,
              id: generateUniqueId(transaction.title),
            });
          }

          //console.log(transaction.desc);
          //smsPatternsVerify(transaction);
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

      updateAsyncStorage(temp);
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
      updateAsyncStorage(temp);
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

      updateAsyncStorage(temp);
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

    case ADD_BOOK:
      temp = {
        ...state,
        books: [
          ...state.books,
          {
            ...action.payload,
            id: generateUniqueId(action.payload.title),
            transactions: [],
          },
        ],
      };
      updateAsyncStorage(temp);
      return temp;
    case UPDATE_BOOK:
      temp = {
        ...state,
        books: state.books.map(book => {
          if (book.id === action.payload.id) {
            return action.payload;
          }
          return book;
        }),
      };
      updateAsyncStorage(temp);
      return temp;
    case DELETE_BOOK: {
      const books = [...state.books];
      const updatedBooks = books.filter(book => book.id !== action.payload.id);
      let temp = {
        ...state,
        books: [...updatedBooks],
      };
      updateAsyncStorage(temp);
      return temp;
    }

    case ADD_TRANSACTION_BOOK: {
      console.log('payload', action.payload);
      const {bookId, date, amount, type} = action.payload;
      const books = [...state.books];
      const bookIndex = books.findIndex(book => book.id === bookId);
      const book = books[bookIndex];

      if (type === 'debited')
        book.amount = parseFloat(book.amount) - parseFloat(amount);
      else book.amount = parseFloat(book.amount) + parseFloat(amount);
      var temp = {
        ...action.payload,
        id: generateUniqueId(action.payload.title),
        amount: parseFloat(amount),
      };
      book.transactions.push(temp);
      console.log('books=', books);
      updateAsyncStorage({
        ...state,
        books,
      });

      return {
        ...state,
        books,
      };
    }
    case UPDATE_TRANSACTION_BOOK: {
      console.log('update', action);
      const {
        id,
        bookId,
        oldBookId,
        oldAmount,
        oldType,
        amount,
        type,
        title,
        desc,
      } = action.payload;
      const books = [...state.books];
      console.log('booksupdate=', books);
      const fromBookIndex = books.findIndex(book => book.id === oldBookId);
      const toBookIndex = books.findIndex(book => book.id === bookId);

      const transactionToMove = books[fromBookIndex].transactions.find(
        transaction => transaction.id === id,
      );

      if (transactionToMove) {
        books[fromBookIndex].transactions = books[
          fromBookIndex
        ].transactions.filter(transaction => transaction.id !== id);

        let transctionCombined = {...transactionToMove, ...action.payload};
        if (oldType === 'debited') {
          books[fromBookIndex].amount =
            books[fromBookIndex].amount + parseFloat(oldAmount);
        } else
          books[fromBookIndex].amount =
            books[fromBookIndex].amount - parseFloat(oldAmount);

        if (type === 'debited') {
          books[toBookIndex].amount =
            books[toBookIndex].amount - parseFloat(amount);
        } else
          books[toBookIndex].amount =
            books[toBookIndex].amount + parseFloat(amount);
        books[toBookIndex].transactions.push(transctionCombined);
      }

      return {
        ...state,
        books,
      };
    }
    case DELETE_TRANSACTION_BOOK: {
      const {id, bookId, type, amount} = action.payload;
      const books = [...state.books];
      const bookIndex = books.findIndex(book => book.id === bookId);
      const book = books[bookIndex];

      books[bookIndex].transactions = books[bookIndex].transactions.filter(
        transaction => transaction.id !== id,
      );

      if (type === 'debited') {
        book.amount += parseFloat(amount);
      } else book.amount -= parseFloat(amount);

      temp = {
        ...state,
        books,
      };
      console.log('books==', books);
      updateAsyncStorage(temp);
      return temp;
    }
    default:
      return state;
  }
};
