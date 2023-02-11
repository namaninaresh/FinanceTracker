import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '_styles';
import {FONT_BOLD, FONT_SIZE_28} from '_styles/typography';
import {rupee, MoneyFormat} from '_utils';
import {Card} from '_atoms';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {UserContext} from '../../context/UserContext';

const Dashboard = props => {
  const {totalExpense, accounts} = useContext(UserContext);

  const navigation = useNavigation();
  return (
    <Card>
      <Card.Title>Dashboard</Card.Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={true}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Expenses')}
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            //backgroundColor: colors.BLACK_3,
            backgroundColor: 'rgba(167, 170, 247, 0.15)',
            height: 100,
            borderWidth: 0.5,
            borderColor: colors.BLACK_1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            width: 200,
          }}>
          <Text style={{color: colors.WHITE}}>EXPENSES</Text>
          <Text style={styles.totalCost}>{MoneyFormat(totalExpense)}</Text>
        </TouchableOpacity>

        {accounts.map((account, index) => {
          return (
            <View
              key={index}
              style={{
                marginVertical: 20,
                marginHorizontal: 10,
                backgroundColor: 'rgba(177, 229, 252, 0.1)',
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                width: 200,
              }}>
              <Text style={{color: colors.WHITE}}>{account.title}</Text>
              <Text style={styles.totalCost}>
                {MoneyFormat(account.amount)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  totalCost: {
    fontSize: FONT_SIZE_28,
    fontWeight: FONT_BOLD.fontWeight,
    color: 'white',
    paddingVertical: 10,
  },
});

export default Dashboard;
