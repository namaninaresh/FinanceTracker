import {StyleSheet, View, Text} from 'react-native';

const Badge = ({title = 'Sample', color = '#83BF6E', size}) => {
  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: `rgba(${parseInt(
            color.substring(1, 3),
            16,
          )}, ${parseInt(color.substring(3, 5), 16)}, ${parseInt(
            color.substring(5, 7),
            16,
          )}, 0.19)`,
        },
      ]}>
      <Text style={[styles.badgeText, {color: color, fontSize: size}]}>
        {title}
      </Text>
    </View>
  );
};

const styles = {
  badgeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  badgeText: {
    fontWeight: '600',
    textAlign: 'center',
  },
};

export default Badge;
