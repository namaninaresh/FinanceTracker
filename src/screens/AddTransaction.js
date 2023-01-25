import {StyleSheet, View} from 'react-native';
import Text from '../components/atoms/Text';
import AppLayout from '../layout/AppLayout';

const AddTransaction = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text>Add Transaction</Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddTransaction;
