import {StyleSheet, View, Text} from 'react-native';
import Dashboard from '../components/molecules/Dashboard';
import Recent from '../components/molecules/Recent';
import AppLayout from '../layout/AppLayout';

const Home = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Dashboard />
        <Recent />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
