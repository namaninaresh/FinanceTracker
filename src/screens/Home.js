import {StyleSheet, View, Text} from 'react-native';
import AppLayout from '../layout/AppLayout';

const Home = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Home </Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
