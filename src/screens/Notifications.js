import {StyleSheet, View, Text} from 'react-native';
import AppLayout from '../layout/AppLayout';

const Notifications = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text>Notifications </Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Notifications;
