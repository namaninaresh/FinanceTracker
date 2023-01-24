import {StyleSheet, View, Text} from 'react-native';
import AppLayout from '../layout/AppLayout';
const Search = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Search </Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Search;
