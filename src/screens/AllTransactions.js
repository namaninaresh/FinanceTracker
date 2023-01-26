import React, {useState} from 'react';
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
import Dropdown from '../components/atoms/Dropdown';
import Text from '../components/atoms/Text';
import TransItem from '../components/atoms/TransItem';
import AppLayout from '../layout/AppLayout';
import {colors} from '../styles';

const data = [
  {
    title: 'item 1',
    desc: 'item 1 descripion',
    amount: 24,
    type: 'expense',
    date: new Date(),
  },
  {
    title: 'item 2',
    desc: 'item 3 descripion',
    amount: 290,
    type: 'income',
    date: new Date(),
  },
  {
    title: 'item 3',
    desc: 'item 3 descripion',
    amount: 50,
    type: 'expense',
    date: new Date(),
  },
  {
    title: 'Last Item',
    desc: 'Last Item desc',
    amount: 50,
    type: 'expense',
    date: new Date(),
  },
];
const AllTransactions = props => {
  const deleteItem = ({item, index}) => {
    console.log('delete', item, index);
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const options = ['All', 'Today', 'Price-High', 'Price-low'];

  const onValueChange = () => {
    console.log('change');
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
          <Text style={{paddingHorizontal: 10}}>Filter By</Text>
          {/*<Icon name="filter-variant" size={24} color={'white'} /> */}
        </TouchableOpacity>
        <Dropdown options={options} onValueChange={onValueChange} />
      </View>

      <Card>
        <FlatList
          data={[...data, ...data, ...data]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TransItem
              item={item}
              index={index}
              key={index}
              onClick={() => {
                //console.log("Pressed", item, index);
                deleteItem({item, index});
              }}
            />
          )}
          contentContainerStyle={{
            padding: 5,
            paddingBottom: 20,
          }}
        />

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
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AllTransactions;
