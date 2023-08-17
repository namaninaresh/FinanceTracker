import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';
import TransItem from '../components/atoms/TransItem';
import Chip from '../components/molecules/Chip';
import CustomPicker from '../components/molecules/CustomPicker';
import FAB from '../components/molecules/Fab';
import {UserContext} from '../context/UserContext';
import AppLayout from '../layout/AppLayout';

import {sortedTransactionsByDate} from '../utils';

const BookInfo = ({navigation, route}) => {
  const [filterSelected, setFilters] = useState([]);

  const {books} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const booksIndex = books.findIndex(book => book.id === route.params.id);

  let transactions = [...books[booksIndex]['transactions']];
  //= books[route.params.id];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
    });
  }, []);

  return (
    <AppLayout>
      <Card>
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TransItem
                item={item}
                index={index}
                key={index}
                onClick={() => {
                  navigation.navigate('addTransactionBook', item);
                }}
                onDelete={() => console.log(item)}
              />
            )}
            contentContainerStyle={{
              padding: 5,
              paddingBottom: 10 + (transactions.length > 8 && 50),
            }}
          />
        ) : (
          <Text
            style={{opacity: 0.2, textAlign: 'center', paddingVertical: 20}}>
            There are no Transactions
          </Text>
        )}

        {/*<ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {[...data, ...data, ...data].map((item, index) => {
            return (
              <TransItem
                item={item}
                index={index}
                key={index}
                onClick={() => {}}
              />
            );
          })} 
        </ScrollView>*/}
      </Card>
      <FAB redirectTo="addTransactionBook" />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default BookInfo;
