import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors} from '../../styles';
import Text from './Text';

const Button = ({
  mode = 'contained',
  title,
  size = 'sm',
  buttonColor = colors.BLUE_DARK,
  textColor = colors.WHITE_2,
  icon,
  disabled,
  uppercase,
  onPress = () => {},
  onLongPress = () => {},
  style = {},
  ...props
}) => {
  let sizeStyle = {width: 64, margin: 'auto'};
  let modeVa = {backgroundColor: buttonColor};

  switch (mode) {
    case 'text':
      modeVa = {};
      break;
    case 'outlined':
      modeVa = {borderWidth: 1, borderColor: colors.BLACK_1};
      break;

    case 'contained':
      modeVa = {...modeVa, borderWidth: 0.2, borderColor: colors.BLACK_1};
      break;

    case 'elevated':
      break;

    case 'contained-tonal':
      break;

    default:
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      {...props}
      style={[styles.button, modeVa, style]}>
      <View style={styles.content}>
        <Text
          numberOfLine={1}
          variant="labelSmall"
          style={{color: textColor, fontWeight: '600'}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 64,
    marginHorizontal: 10,
    marginVertical: 10,
    borderStyle: 'solid',
    margin: 'auto',
    minHeight: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  buttonOld: {
    minWidth: 64,
    marginHorizontal: 10,
    marginVertical: 10,
    borderStyle: 'solid',
    margin: 'auto',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
