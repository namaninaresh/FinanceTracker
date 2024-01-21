import {StyleSheet, View} from 'react-native';
import Text from '../components/atoms/Text';
import AppLayout from '../layout/AppLayout';

const Splash = props => {
  return (
    <AppLayout>
      <Text>Spalsh</Text>
    </AppLayout>
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
