import {StyleSheet, View, Text} from 'react-native';
import AppLayout from '../layout/AppLayout';
const Settings = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Settings </Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Settings;
