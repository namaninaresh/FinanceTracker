import {StyleSheet, View, Text} from 'react-native';

const Splash = props => {
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
});

export default Splash;
