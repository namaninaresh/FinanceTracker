import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
function CardTitle({
  children,
  style = {},
  showBefore = true,
  navigate = null,
  beforeColor = colors.ORANGE_DARK,
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.cardTitleContainer]}>
      {showBefore && (
        <View
          style={[
            styles.cardTitleBefore,
            {backgroundColor: beforeColor},
          ]}></View>
      )}
      <Text style={[styles.cardTitle, style]}>{children}</Text>
      {navigate && (
        <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
          <Icon name="chevron-right" size={20} color={'white'} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const Card = ({children, style = {}, type = 'contained'}) => {
  let theme = type;

  switch (type) {
    case 'outlined':
      theme = styles.outlined;
      break;
    case 'elevated':
      theme = styles.elevated;
      break;
    default:
      theme = styles.contained;
      break;
  }

  return <View style={[styles.container, theme, style]}>{children}</View>;
};

Card.Title = CardTitle;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  contained: {
    backgroundColor: colors.BLACK_4,
  },
  elevated: {
    backgroundColor: colors.ORANGE_DARK,
  },
  outlined: {
    borderColor: colors.BLACK_2,
    borderWidth: 1,
  },
  cardTitleContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingVertical: 10,
  },
  cardTitleBefore: {
    width: 5,
    height: 20,
    backgroundColor: colors.ORANGE_DARK,
    position: 'absolute',
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    fontWeight: '800',
    paddingLeft: 20,
  },
});

export default Card;
