import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {colors} from '_styles';
import {FONT_BOLD, FONT_SIZE_28} from '_styles/typography';
import {rupee, MoneyFormat} from '_utils';
import {Card} from '_atoms';

const Dashboard = props => {
  return (
    <Card>
      <Card.Title>Dashboard</Card.Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={true}>
        <View
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
          <Text style={styles.totalCost}>{MoneyFormat(1000)}</Text>
        </View>
        <View
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
          <Text style={{color: colors.WHITE}}>BALANCE</Text>
          <Text style={styles.totalCost}>{MoneyFormat(650000)} </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 10,
            backgroundColor: 'rgba(167, 170, 247, 0.15)',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            width: 200,
          }}>
          <Text style={{color: colors.WHITE}}>CARDS</Text>
          <Text style={styles.totalCost}>{MoneyFormat(20000)}</Text>
        </View>
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
