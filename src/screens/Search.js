import {StyleSheet, View} from 'react-native';
import AppLayout from '../layout/AppLayout';
import Text from '../components/atoms/Text';
import Dropdown from '../components/atoms/Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Badge from '../components/molecules/Badge';
const Search = props => {
  const options = ['Today', 'Price-High', 'Price-low'];

  const onValueChange = () => {
    console.log('change');
  };
  return (
    <AppLayout style={{backgroundColor: '#000'}}>
      <View style={styles.container}>
        <Text>Search </Text>
        {/*<Dropdown
          options={options}
          selectedValue={options[0]}
          onValueChange={onValueChange}
          label="User"
        /> */}
      </View>
      <Badge />
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
