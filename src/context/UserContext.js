import {useNavigation} from '@react-navigation/native';
import {createContext, useEffect, useReducer} from 'react';
import {getInitialData} from '../store/StoreAsync';
import UserReducer, {
  ADD_ACCOUNT,
  ADD_BOOK,
  ADD_MULTIPLE_TRANSACTION,
  ADD_TRANSACTION,
  ADD_TRANSACTION_BOOK,
  DELETE_ACCOUNT,
  DELETE_BOOK,
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_BOOK,
  INITIAL_STATE,
  UPDATE_ACCOUNT,
  UPDATE_BOOK,
  UPDATE_PROFILE,
  UPDATE_TRANSACTION,
  UPDATE_TRANSACTION_BOOK,
  initialState,
} from './UserReducer';

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
  const addMultipleTransaction = transactions => {
    dispatch({
      type: ADD_MULTIPLE_TRANSACTION,
      payload: transactions,
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
  const addBook = book => {
    dispatch({
      type: ADD_BOOK,
      payload: book,
    });
  };
  const updateBook = book => [
    dispatch({
      type: UPDATE_BOOK,
      payload: book,
    }),
  ];
  const deleteBook = book => {
    dispatch({
      type: DELETE_BOOK,
      payload: book,
    });
  };
  const addTransactionBook = transaction => {
    dispatch({
      type: ADD_TRANSACTION_BOOK,
      payload: transaction,
    });
  };
  const updateTransactionBook = transaction => {
    dispatch({
      type: UPDATE_TRANSACTION_BOOK,
      payload: transaction,
    });
  };
  const deleteTransactionBook = transaction => {
    dispatch({
      type: DELETE_TRANSACTION_BOOK,
      payload: transaction,
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

  const updateProfile = account => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: account,
    });
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
        addBook,
        deleteBook,
        updateBook,
        addMultipleTransaction,
        updateTransaction,
        deleteTransaction,
        addTransactionBook,
        updateTransactionBook,
        deleteTransactionBook,
        updateProfile,
        books: state.books,
        readSMSIDs: state.readSMSIDs,
        totalExpense: state.totalExpense,
        accounts: state.accounts,
        lastReadTimeStamp: state.lastReadTimeStamp,
        profileData: state.profile,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
