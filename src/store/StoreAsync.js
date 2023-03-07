import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
const ASYNC_STORAGE_KEY = '@initialState';
const getInitialData = async () => {
  try {
    const data = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    //console.log('est', data);
    if (data !== null) {
      return {...JSON.parse(data)};
    }
    return {
      transactions: [],
      totalExpense: 0,
      accounts: [],
      readSMSIDs: [],
      lastReadTimeStamp: 0,
    };
  } catch (error) {
    console.error(error);
  }
};

const updateAsyncStorage = async data => {
  console.log('asyn updated called');
  try {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const clearCache = async () => {
  try {
    await AsyncStorage.clear();
    Alert.alert('Success', 'Cache cleared successfully.');
    console.log('Cache cleared successfully.');
  } catch (error) {
    Alert.alert('Error', 'Unable to clear cache.');
    console.log('Error clearing cache:', error);
  }
};

export {getInitialData, updateAsyncStorage, clearCache};
