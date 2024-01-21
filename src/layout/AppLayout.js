import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {colors} from '../styles';
const AppLayout = ({children, style}) => {
  const backgroundStyle = {
    fontFamily: 'Pacifico-Regular',
    backgroundColor: colors.BLACK_5,
  };
  const {insets} = initialWindowMetrics;
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </SafeAreaView>
      <View
        style={[
          styles.container,
          backgroundStyle,
          style,
          {paddingBottom: insets.bottom, paddingTop: insets.top},
        ]}>
        {children}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default AppLayout;
