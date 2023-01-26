import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
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
  },
  {
    title: 'item 2',
    desc: 'item 3 descripion',
    amount: 290,
    type: 'income',
  },
  {
    title: 'item 3',
    desc: 'item 3 descripion',
    amount: 50,
    type: 'expense',
  },
  {
    title: 'Last Item',
    desc: 'Last Item desc',
    amount: 50,
    type: 'expense',
  },
];
const AllTransactions = props => {
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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {[...data, ...data, ...data].map((item, index) => {
            return <TransItem {...item} key={index} />;
          })}
        </ScrollView>
      </Card>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AllTransactions;
