import {StyleSheet, View, Text} from 'react-native';
import AppLayout from '../layout/AppLayout';

const Profile = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text>Profile </Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Profile;
