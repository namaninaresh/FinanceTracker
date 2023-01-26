import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MoneyFormat, rupee} from '../../utils';

import {Swipeable} from 'react-native-gesture-handler';

let row = [];
let prevOpenedRow;

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

const TransItem = ({item, index, onClick, prefix = false, style}) => {
  let {type = 'expense', title, desc = null, amount = 0, date, vendor} = item;
  let rupeeColor = type === 'expense' ? colors.ORANGE_DARK : colors.GREEN_DARK;
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderRightActions = (progress, dragX, onClick) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          width: 50,
        }}>
        <Icon
          name="trash-can-outline"
          size={30}
          color={colors.ORANGE_DARK}
          style={{
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    );
  };
  const renderLeftActions = (progress, dragX, onClick) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          width: 50,
        }}>
        <Icon
          name="file-document-edit-outline"
          size={30}
          color={colors.GREEN_DARK}
          style={{
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    );
  };

  const itemStyle = {
    paddingRight: 10,
    paddingHorizontal: prefix ? 0 : 20,
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, onClick)
      }
      renderLeftActions={(progress, dragX) =>
        renderLeftActions(progress, dragX, onClick)
      }
      onSwipeableOpen={() => closeRow(index)}
      ref={ref => (row[index] = ref)}
      rightOpenValue={-100}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.BLACK_4,
          paddingVertical: 10,
          borderBottomWidth: 0.6,
          borderBottomColor: colors.BLACK_2,
          ...style,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {prefix && <PrefixIcon iconName={vendor} />}
          <View style={[{flex: 1}, itemStyle]}>
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

            {date && (
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  opacity: 0.3,
                }}>
                {date}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TransItem;
