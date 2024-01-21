import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../styles';
import Text from '../atoms/Text';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const chipColor = {
  default: colors.BLACK_2,
  primary: colors.PRIMARY,
  error: 'rgb(244, 67, 54)',
  sucess: 'rgb(102, 187, 106)',
  warning: 'rgb(255, 167, 38)',
};

const textColor = {
  filled: {
    default: colors.WHTIE_4,
    primary: colors.WHTIE_4,
    error: 'white',
    info: 'rgba(0, 0, 0, 0.87)',
    sucess: 'rgba(0, 0, 0, 0.87)',
    warning: 'rgba(0, 0, 0, 0.87)',
  },
  outlined: {
    default: 'white',
    primary: 'rgb(144, 202, 249)',
    error: 'rgb(244, 67, 54)',
    info: 'rgb(41, 182, 246)',
    sucess: 'rgb(102, 187, 106)',
    warning: 'rgb(255, 167, 38)',
  },
};
const Chip = ({
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  icon = null,
  label,
  onDelete = null,
  style,
  textStyle,
  deleteIcon = (
    <Icon name="close-circle" color={textColor[variant][color]} size={15} />
  ),
}) => {
  let chipStyle = {};
  let cusTextStyle = {color: 'white'};
  let postIcon = {};
  let preIcon = {};

  switch (variant) {
    case 'filled':
      chipStyle = {backgroundColor: chipColor[color]};
      cusTextStyle = {color: textColor[variant][color]};
      break;
    case 'outlined':
      chipStyle = {
        backgroundColor: 'transparent',
        borderColor: 'rgb(97, 97, 97)',
        borderWidth: 1,
        borderStyle: 'solid',
      };
      cusTextStyle = {color: textColor[variant][color]};
      break;
  }

  switch (size) {
    case 'medium':
      chipStyle = {...chipStyle, height: 35, borderRadius: 16};
      cusTextStyle = {...cusTextStyle, fontSize: 18};
      break;

    case 'small':
      chipStyle = {...chipStyle, height: 24, borderRadius: 16};
      cusTextStyle = {...cusTextStyle, fontSize: 16};
      break;
  }
  return (
    <View style={[styles.chip, chipStyle, style]}>
      {icon && (
        <View style={{padding: 0}}>
          {<Icon name={icon} color={textColor[variant][color]} size={20} />}
        </View>
      )}
      <View>
        <Text style={[styles.chipText, cusTextStyle, textStyle]}>{label}</Text>
      </View>
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={{}}>
          {deleteIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  chip: {
    maxWidth: '100%',
    fontSize: '0.8125rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
    color: 'rgb(255, 255, 255)',
    borderRadius: 16,
    whiteSpace: 'nowrap',
    cursor: 'default',
    outline: 0,
    textDecoration: 'none',
    border: 0,
    paddingHorizontal: 10,
    verticalAlign: 'middle',
  },
  selectedChip: {
    backgroundColor: 'blue',
  },
  outlined: {
    borderColor: 'rgb(97, 97, 97)',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  filled: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  small: {},
  medium: {},

  chipText: {
    color: 'white',
    paddingHorizontal: 12,
    overflow: 'hidden',
    fontSize: 16,
  },
});

export default Chip;
