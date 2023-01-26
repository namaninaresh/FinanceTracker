import React from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';
import TransItem from '../components/atoms/TransItem';
import AppLayout from '../layout/AppLayout';
const data = [
  {
    title: 'item 1',
    desc: 'item 1 descripion',
    amount: 24,
    type: 'expense',
    date: 'Mon , 26th Jan 2023',
  },
  {
    title: 'item 2',
    desc: 'item 3 descripion',
    amount: 290,
    type: 'income',
    date: 'Mon , 26th Jan 2023',
  },
  {
    title: 'item 3',
    desc: 'item 3 descripion',
    amount: 50,
    type: 'expense',
    date: 'Mon , 26th Jan 2023',
  },
  {
    title: 'Last Item',
    desc: 'Last Item desc',
    amount: 50,
    type: 'expense',
    date: 'Mon , 26th Jan 2023',
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
  return (
    <AppLayout>
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
