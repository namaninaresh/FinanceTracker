import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import Card from '../components/atoms/Card';
import TransItem from '../components/atoms/TransItem';
import AppLayout from '../layout/AppLayout';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles';
import Text from '../components/atoms/Text';
import {useContext} from 'react';
import {UserContext} from '../context/UserContext';
import Loader from '../components/atoms/Loader';
import Accordion from '../components/molecules/Accordion';
import {MoneyFormat} from '../utils';

const data = [
  {
    title: 'Venkatesh',
    desc: 'Given on Last year back',
    amount: 24500,
    type: 'income',
    vendor: 'bank',
  },
  {
    title: 'Hrushikesh',
    desc: 'Given on Last year back',
    amount: 26000,
    type: 'income',
    vendor: 'bank',
  },
  {
    title: 'Raesh',
    desc: 'Given on Last year back',
    amount: 1000,
    type: 'income',
    vendor: 'bank',
  },
  {
    title: 'Boddu Akhil',
    desc: 'Given on Last year back',
    amount: 6000,
    type: 'income',
    vendor: 'bank',
  },
  {
    title: 'Harish Namani',
    desc: 'Given on Last year back',
    amount: 26000,
    type: 'income',
    vendor: 'bank',
  },
  {
    title: 'Dornakal',
    desc: 'Given while Shabari',
    amount: 10000,
    type: 'income',
    vendor: 'bank',
  },
  {
    title: 'Bijay',
    desc: 'Given on Last year back',
    amount: 9000,
    type: 'income',
    vendor: 'bank',
  },
];
const Loans = ({navigation, route}) => {
  const {accounts, deleteAccount} = useContext(UserContext);
  const {page} = route.params;
  let debitAmout = 0;
  return (
    <AppLayout>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          paddingBottom: 40,
        }}>
        {page.includes('Credit') && (
          <Card>
            <Card.Title beforeColor={colors.YELLOW_LIGHT}>
              All Credit Loans
            </Card.Title>
            {data.map((item, index) => (
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

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.BLACK_5,
              }}>
              <View style={[{flex: 1}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{color: 'white', flex: 1, paddingLeft: 10}}
                    numberOfLines={2}>
                    Total Amount
                  </Text>
                  <Text style={{color: colors.GREEN_DARK, fontWeight: '800'}}>
                    {MoneyFormat(debitAmout)}
                  </Text>
                </View>
              </View>
            </View>

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
          </Card>
        )}
        {page.includes('Debit') && (
          <Card>
            <Card.Title beforeColor={colors.YELLOW_LIGHT}>
              All Debit Loans
            </Card.Title>

            {data.map((item, index) => {
              debitAmout += item.amount;
              return (
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
              );
            })}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.BLACK_5,
              }}>
              <View style={[{flex: 1}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{color: 'white', flex: 1, paddingLeft: 10}}
                    numberOfLines={2}>
                    Total Amount
                  </Text>
                  <Text style={{color: colors.GREEN_DARK, fontWeight: '800'}}>
                    {MoneyFormat(debitAmout)}
                  </Text>
                </View>
              </View>
            </View>

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
          </Card>
        )}
      </ScrollView>

      {/* <Text style={styles.note} variant="labelSmall">
        Note: Credit Loans means amount which are given to others .Debit Loans
        means amount which I have took
      </Text> */}
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  note: {
    position: 'absolute',
    bottom: 15,
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Loans;
