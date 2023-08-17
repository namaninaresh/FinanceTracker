import {View} from 'react-native';
import Text from './Text';
import {colors} from '../../styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MoneyFormat} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type Props = {
  name: number;
  amount: number;
};

const PrefixIcon = ({iconName = 'bank'}) => {
  let name = iconName;
  if (iconName === 'card') name = 'credit-card-outline';
  if (iconName === 'cash') name = 'cash-multiple';
  return (
    <View
      style={{
        backgroundColor: colors.BLACK_3,
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
      }}>
      <Icon name={name} color={colors.BLACK_1} size={20} />
    </View>
  );
};

const BookItem = ({item}: Props) => {
  const navigation = useNavigation();
  let rupeeColor = item.amount < 0 ? colors.ORANGE_DARK : colors.GREEN_DARK;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Book Details', item)}
      style={{
        backgroundColor: colors.BLACK_4,
        paddingVertical: 10,
        borderBottomWidth: 0.6,
        borderBottomColor: colors.BLACK_2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}>
        <PrefixIcon iconName={'book'} />
        <View style={[{flex: 1}]}>
          <View style={{flexDirection: 'row', paddingVertical: 3}}>
            <Text style={{color: 'white', flex: 1}} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={{fontWeight: '800', color: rupeeColor}}>
              {MoneyFormat(item.amount)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;
