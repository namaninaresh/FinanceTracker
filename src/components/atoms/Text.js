import {StyleSheet, View, Text as RnText} from 'react-native/';

import {colors} from '../../styles';
import {scaleFont} from '../../styles/mixins';

const Text = ({children, style, variant, ...props}) => {
  let textStyle = {};

  switch (variant) {
    case 'displayLarge':
      textStyle = {fontSize: scaleFont(50), fontWeight: '600'};
      break;
    case 'displayMedium':
      textStyle = {fontSize: scaleFont(40), fontWeight: '600'};
      break;
    case 'displaySmall':
      textStyle = {fontSize: scaleFont(30), fontWeight: '600'};
      break;
    case 'headlineLarge':
      textStyle = {fontSize: scaleFont(30), fontWeight: '600'};
      break;
    case 'headlineMedium':
      textStyle = {fontSize: scaleFont(24), fontWeight: '600'};
      break;
    case 'headlineSmall':
      textStyle = {fontSize: scaleFont(22), fontWeight: '500'};
      break;

    case 'titleLarge':
      textStyle = {fontSize: 24, fontWeight: '500'};
      break;
    case 'titleMedium':
      textStyle = {fontSize: 18, fontWeight: '500'};
      break;
    case 'titleSmall':
      textStyle = {fontSize: 16, fontWeight: '500'};
      break;

    case 'bodyLarge':
      textStyle = {fontSize: 18, fontWeight: '500'};
      break;
    case 'bodyMedium':
      textStyle = {fontSize: 14, fontWeight: '500'};
      break;
    case 'bodySmall':
      textStyle = {fontSize: 12, fontWeight: '500'};
      break;
    case 'labelLarge':
      textStyle = {fontSize: 20, fontWeight: '400'};
      break;
    case 'labelMedium':
      textStyle = {fontSize: 16, fontWeight: '400'};
      break;
    case 'lableSmall':
      textStyle = {fontSize: 14, fontWeight: '200'};
      break;

    default:
      break;
  }
  return (
    <RnText style={[styles.container, textStyle, style]} {...props}>
      {children}
    </RnText>
  );
};

const styles = StyleSheet.create({
  container: {
    color: colors.WHITE_2,
    textAlign: 'left',
  },
});

export default Text;
