import {StyleSheet, View} from 'react-native';
import Text from '../components/atoms/Text';
import AppLayout from '../layout/AppLayout';

const Expenses = props => {
  return (
    <AppLayout>
      <View>
        <Text>Expenses Page</Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Expenses;
