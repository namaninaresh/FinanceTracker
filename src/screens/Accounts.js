import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from '../components/atoms/Card';
import TransItem from '../components/atoms/TransItem';
import AppLayout from '../layout/AppLayout';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles';
import Text from '../components/atoms/Text';
import {useContext} from 'react';
import {UserContext} from '../context/UserContext';
import Loader from '../components/atoms/Loader';

const data = [
  {
    title: 'Paytm Bank',
    desc: '91 8686506505',
    amount: 7908,
    type: 'income',
    vendor: 'bank',
  },
  {
    title: 'ICICI Bank ',
    desc: '***********902',
    amount: 20000,
    type: 'income',
    vendor: 'card',
  },
  {
    title: 'ICICI Credit Card ',
    desc: '4567',
    amount: 4590,
    vendor: 'card',
  },
  {
    title: 'Cash ',
    desc: 'Hand Cash',
    amount: 5000,
    type: 'income',
    vendor: 'cash',
  },
];
const Accounts = ({navigation}) => {
  const {accounts, deleteAccount} = useContext(UserContext);

  return (
    <AppLayout>
      <Card>
        <Card.Title beforeColor={colors.YELLOW_LIGHT}>All Accounts</Card.Title>

        {accounts.map((item, index) => (
          <TransItem
            item={item}
            key={index}
            style={{paddingVertical: 20}}
            index={index}
            prefix={true}
            onClick={() => {
              navigation.navigate('AddAccount', item);
            }}
            onDelete={() => deleteAccount(item)}
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
          onPress={() => navigation.navigate('AddAccount')}>
          <Icon name="plus-circle" size={30} color={colors.GREEN_DARK} />
        </TouchableOpacity>
      </View>

      <Text style={styles.note} variant="labelSmall">
        Note: Above Bank Details show available balance and Card details shows
        how much debicted
      </Text>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  note: {
    position: 'absolute',
    bottom: 0,
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Accounts;
