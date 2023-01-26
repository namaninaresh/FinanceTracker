import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';
import TextInput from '../components/atoms/TextInput';
import AppLayout from '../layout/AppLayout';
import {colors} from '../styles';

const EditProfile = props => {
  const navigation = useNavigation();

  const handleSave = () => {
    console.log('save clicked');
  };
  return (
    <AppLayout>
      <Card>
        <Card.Title>Edit Profile</Card.Title>

        <View></View>
        <Card
          style={{
            backgroundColor: colors.BLACK_4,
            paddingHorizontal: 5,
            margin: 0,
          }}>
          <TextInput
            label={'Username'}
            value=""
            iconName="account"
            style={{width: '100%'}}
          />
          <TextInput
            label={'Email'}
            iconName="email"
            value=""
            style={{width: '100%'}}
          />
          <TextInput
            value=""
            password={true}
            label={'Password'}
            iconName="lock"
            style={{width: '100%'}}
          />
        </Card>
      </Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button title={'Save'} onPress={handleSave} />
        <Button
          title={'Cancel'}
          mode="outlined"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default EditProfile;
