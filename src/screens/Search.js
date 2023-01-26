import {StyleSheet, View} from 'react-native';
import AppLayout from '../layout/AppLayout';
import Text from '../components/atoms/Text';
import TextInput from '../components/atoms/TextInput';
import Button from '../components/atoms/Button';
const Search = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text>Search </Text>
        <TextInput
          label={'Username'}
          icon="account"
          error={'Username is less than 4 words'}
        />
        <Button />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
