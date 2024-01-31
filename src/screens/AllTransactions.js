import React, {useContext, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';
import TransItem from '../components/atoms/TransItem';
import Chip from '../components/molecules/Chip';
import CustomPicker from '../components/molecules/CustomPicker';
import FAB from '../components/molecules/Fab';
import {UserContext} from '../context/UserContext';
import AppLayout from '../layout/AppLayout';
import {
  convertDateToUnix,
  getCurrentDayStartingTimeUnix,
  sortedTransactionsByDate,
} from '../utils';

const data = [
  {
    title: 'item 1',
    desc: 'item 1 descripion',
    amount: 24,
    type: 'debited',
    date: new Date(),
  },
  {
    title: 'item 2',
    desc: 'item 3 descripion',
    amount: 290,
    type: 'credited',
    date: new Date(),
  },
  {
    title: 'item 3',
    desc: 'item 3 descripion',
    amount: 50,
    type: 'debited',
    date: new Date(),
  },
  {
    title: 'Last Item',
    desc: 'Last Item desc',
    amount: 50,
    type: 'debited',
    date: new Date(),
  },
];
const AllTransactions = ({navigation}) => {
  const [filterSelected, setFilters] = useState([]);

  const {transactions, deleteTransaction} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [sortedTransactions, setSortedTrans] = useState(
    sortedTransactionsByDate(transactions),
  );
  //console.log('sorted', sortedTransactions);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const options = [
    {title: 'All', id: 'All'},
    {title: 'Today', id: 'Today'},
    {title: 'Price - High', id: 'Price-High'},
    {title: 'Price-Low', id: 'Price-Low'},
    {title: 'Date', id: 'date'},
  ];

  const deleteFilter = index => {
    setFilters(current => current.filter((item, i) => i !== index));
    /*const index= filterSelected.findIndex(item => item.include("price"));

   if(index !== -1)
   {
    filterSelected.splice(index,1,text);
   }
   else filterSelected.push(text); */
  };

  const onValueChange = text => {
    const array = [...filterSelected];

    if (text.includes('Price')) {
      const index = array.findIndex(item => item.includes('Price'));
      if (index !== -1) {
        array.splice(index, 1);
        setFilters([...array, text]);
      } else {
        setFilters([...array, text]);
      }
    } else if (text.includes('All') || text.includes('Today')) {
      const index = array.findIndex(
        item => item.includes('All') || item.includes('Today'),
      );
      if (index !== -1) {
        array.splice(index, 1);
        setFilters([...array, text]);
      } else {
        setFilters([...array, text]);
      }
    } else {
      if (filterSelected.indexOf(text) === -1)
        setFilters([...filterSelected, text]);
    }

    if (filterSelected.findIndex(item => item.includes('Today'))) {
      const lists = sortedTransactions.filter(
        item => convertDateToUnix(item.date) >= getCurrentDayStartingTimeUnix(),
      );
      setSortedTrans(lists);
    }
  };
  return (
    <AppLayout>
      <View
        style={{
          flexDirection: 'row',
          zIndex: 1000,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            justifyContent: 'flex-end',
          }}>
          <CustomPicker
            title="Filter By"
            items={options}
            onValueChange={text => onValueChange(text)}
          />
          <Text style={{paddingHorizontal: 10}}>Filter By</Text>

          {/*<Icon name="filter-variant" size={24} color={'white'} /> */}
        </TouchableOpacity>
        {/*<Dropdown options={options} onValueChange={onValueChange} /> */}
      </View>
      <View>
        <ScrollView
          horizontal
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsHorizontalScrollIndicator={false}
          bounces={true}>
          {filterSelected.map((filter, index) => (
            <Chip
              size="small"
              label={filter}
              key={index}
              variant="filled"
              color="default"
              onDelete={() => deleteFilter(index)}
            />
          ))}
        </ScrollView>
      </View>

      <Card>
        {sortedTransactions.length > 0 ? (
          <FlatList
            data={sortedTransactions}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TransItem
                item={item}
                index={index}
                key={index}
                onClick={() => {
                  navigation.navigate('addTransaction', item);
                }}
                onDelete={() => deleteTransaction(item)}
              />
            )}
            contentContainerStyle={{
              padding: 5,
              paddingBottom: 100 + (filterSelected.length > 0 && 30),
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
      <FAB />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AllTransactions;
