import {StyleSheet, View} from 'react-native';
import Text from '../components/atoms/Text';
import AppLayout from '../layout/AppLayout';

const EditProfile = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text>Edit Profile</Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default EditProfile;
