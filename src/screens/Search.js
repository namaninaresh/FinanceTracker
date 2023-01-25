import {StyleSheet, View} from 'react-native';
import AppLayout from '../layout/AppLayout';
import Text from '../components/atoms/Text';
const Search = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text>Search </Text>
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
