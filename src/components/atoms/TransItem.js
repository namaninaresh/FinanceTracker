import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MoneyFormat, rupee} from '../../utils';

const TransItem = ({
  type = 'expense',
  desc = null,
  title,
  showArrow,
  amount = 0,
}) => {
  let rupeeColor = type === 'expense' ? colors.ORANGE_DARK : colors.GREEN_DARK;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.BLACK_4,
        paddingVertical: 10,
        borderBottomWidth: 0.6,
        borderBottomColor: colors.BLACK_2,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, paddingRight: 10}}>
          <View style={{flexDirection: 'row', paddingVertical: 3}}>
            <Text style={{color: 'white', flex: 1}}>{title}</Text>
            <Text style={{color: rupeeColor, fontWeight: '800'}}>
              {MoneyFormat(amount)}
            </Text>
          </View>
          {desc && (
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                opacity: 0.3,
              }}>
              {desc}
            </Text>
          )}

          <Text
            style={{
              color: 'white',
              fontSize: 12,
              opacity: 0.3,
            }}>
            Mon , 26th Jan 2023
          </Text>
        </View>
        {showArrow && (
          <View style={{justifyContent: 'center'}}>
            <Icon name="chevron-right" size={20} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TransItem;
