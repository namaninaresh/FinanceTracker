import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from '../components/atoms/Card';
import TransItem from '../components/atoms/TransItem';
import AppLayout from '../layout/AppLayout';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles';

const data = [
  {
    title: 'Paytm Bank',
    desc: '91 8686506505',
    amount: 1000,
    type: 'income',
    vendor: 'bank',
  },
  {
    title: 'ICICI Bank ',
    desc: '***********902',
    amount: 1000,
    type: 'income',
    vendor: 'card',
  },
  {
    title: 'ICICI Credit Card ',
    desc: 'xxxx xxxx xxxx 4567',
    amount: 1000,
    type: 'income',
    vendor: 'card',
  },
];
const Accounts = ({navigation}) => {
  return (
    <AppLayout>
      <Card>
        <Card.Title>All Accounts</Card.Title>

        {data.map((item, index) => (
          <TransItem
            item={item}
            key={index}
            style={{paddingVertical: 20}}
            index={index}
            prefix={true}
            onClick={() => {
              //console.log("Pressed", item, index);
              deleteItem({item, index});
            }}
          />
        ))}
      </Card>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: colors.BLACK_3,
            borderRadius: 50,
          }}
          onPress={() =>
            navigation.navigate('Modal', {
              message: 'Want to add bank account',
            })
          }>
          <Icon name="plus-circle" size={30} color={colors.GREEN_DARK} />
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Accounts;
