import AsyncStorage from '@react-native-async-storage/async-storage';
const ASYNC_STORAGE_KEY = '@initialState';
const getInitialData = async () => {
  try {
    const data = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    console.log('est', data);
    if (data !== null) {
      return {...JSON.parse(data)};
    }
    return {
      transactions: [],
      totalExpense: 0,
      accounts: [],
      readSMSIDs: [],
    };
  } catch (error) {
    console.error(error);
  }
};

const updateAsyncStorage = async data => {
  try {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

export {getInitialData, updateAsyncStorage};
