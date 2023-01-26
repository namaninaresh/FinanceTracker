import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {colors} from '../../styles';

import {Card} from '../atoms';
import {TransItem} from '../atoms';

const data = [
  {
    title: 'sample ',
    desc: 'some sample',
    amount: 1000,
    type: 'income',
    date: new Date(),
  },
  {
    title: 'sample 2',
    desc: 'some sample2',
    amount: 10,
    type: 'expense',
    date: new Date(),
  },
  {
    title: 'sample ',
    desc: 'some sample',
    amount: 1000,
    type: 'income',
    date: new Date(),
  },
  {
    title: 'sample 2',
    desc: 'some sample2',
    amount: 10,
    type: 'expense',
    date: new Date(),
  },
];

const Recent = props => {
  const deleteItem = ({item, index}) => {
    console.log('delete', item, index);
  };
  return (
    <Card style={{paddingHorizontal: 0}}>
      <Card.Title beforeColor={colors.VOILET_LIGHT} navigate="All Transactions">
        Recent
      </Card.Title>
      {data.map((item, index) => (
        <TransItem
          item={item}
          key={index}
          index={index}
          onClick={() => {
            //console.log("Pressed", item, index);
            deleteItem({item, index});
          }}
        />
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Recent;
