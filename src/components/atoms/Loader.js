import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

import {colors} from '../../styles';
import Text from './Text';
const Loader = ({visible = true}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    visible && (
      <View
        style={[styles.container, {height: windowHeight, width: windowWidth}]}>
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={colors.WHITE_2} />
          <Text style={{paddingHorizontal: 20}}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    marginTop: -60,
    height: 70,
    backgroundColor: colors.BLACK_3,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
export default Loader;
