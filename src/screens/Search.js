import {StyleSheet, View} from 'react-native';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';
import Badge from '../components/molecules/Badge';
import Chip from '../components/molecules/Chip';
import TextInputAnim from '../components/molecules/TextInputAnim';
import AppLayout from '../layout/AppLayout';
const SearchOld = props => {
  return (
    <AppLayout style={{backgroundColor: '#000'}}>
      <View style={styles.container}>
        <Text>Search </Text>

        <Chip size="medium" label={'medium'} />
        <Chip size="small" label={'small'} />

        <Chip color="error" label={'error'} />
        <Chip color="error" variant="outlined" label={'error=o'} />

        <Chip color="primary" variant="filled" label={'primary'} />
        <Chip color="primary" variant="outlined" label={'primary-o'} />

        <Chip color="sucess" label={'sucess'} />
        <Chip
          color="sucess"
          variant="outlined"
          label={'sucess-o'}
          onDelete={() => {}}
        />

        <Chip
          color="warning"
          label={'war'}
          icon={'account'}
          onDelete={() => {}}
        />
        <TextInputAnim
          label={'Username'}
          iconName="account"
          onChangeText={() => {}}
        />
        <Chip
          label={'warning-o'}
          color="warning"
          variant="outlined"
          onDelete={() => {}}
        />
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

const Search = props => {
  return (
    <AppLayout style={{backgroundColor: '#000'}}>
      <Card>
        <Card.Title>Search</Card.Title>
        <View style={styles.container}>
          <Text>Search </Text>
        </View>
      </Card>
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
