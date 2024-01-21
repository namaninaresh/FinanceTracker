import {StyleSheet, View} from 'react-native';
import Text from '../components/atoms/Text';
import AppLayout from '../layout/AppLayout';
const Settings = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={{color: 'red'}}>Settings </Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Settings;
