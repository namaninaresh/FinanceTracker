import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

import {Card, TransItem} from '../atoms';

import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {UserContext} from '../../context/UserContext';
const Recent = props => {
  const navigation = useNavigation();

  const {transactions, deleteTransaction} = useContext(UserContext);
  const [items, setItems] = useState([]);

  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <Card style={{paddingHorizontal: 0}}>
      <Card.Title beforeColor={colors.VOILET_LIGHT} navigate="All Transactions">
        Recent
      </Card.Title>
      {sortedTransactions.map((item, index) => {
        if (index < 4) {
          return (
            <TransItem
              item={item}
              key={index}
              index={index}
              onClick={() => {
                navigation.navigate('addTransaction', item);
              }}
              onDelete={() => deleteTransaction(item)}
            />
          );
        }
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Recent;
