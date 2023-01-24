import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {colors} from '../styles';
const AppLayout = ({children, style}) => {
  const backgroundStyle = {
    fontFamily: 'Pacifico-Regular',
    backgroundColor: colors.BLACK_5,
  };
  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </SafeAreaView>
      <View style={[styles.container, backgroundStyle, style]}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppLayout;
