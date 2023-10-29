import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from '../components/atoms/Card';
import TransItem from '../components/atoms/TransItem';
import AppLayout from '../layout/AppLayout';

import {useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../components/atoms/Text';
import {UserContext} from '../context/UserContext';
import {colors} from '../styles';

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
