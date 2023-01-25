import {StyleSheet, View} from 'react-native';
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
];
const AllTransactions = props => {
  return (
    <AppLayout>
      <Card>
        {data.map((item, index) => {
          return <TransItem {...item} key={index} />;
        })}
      </Card>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AllTransactions;
