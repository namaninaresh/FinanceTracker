import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../styles';

import {Card} from '../atoms';
import {TransItem} from '../atoms';

const Recent = props => {
  return (
    <Card>
      <Card.Title beforeColor={colors.VOILET_LIGHT} navigate="All Transactions">
        Recent
      </Card.Title>

      <TransItem title={'Metro Pay'} desc="metro scan from uppal to raidurg" />
      <TransItem
        type="income"
        title={'Hyderabad Journey'}
        desc="Hyderabad bus journey started at 8AM,Delux"
      />
      <TransItem
        title={'Lunch Office'}
        desc="office la lunch -manchuriya with snehitha"
      />
      <TransItem
        title={'Train Journey wgl'}
        desc="train to wgl -shathavahana at 4PM"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Recent;
