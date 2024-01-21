import {useContext, useEffect, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import TextInput from '../components/atoms/TextInput';
import {UserContext} from '../context/UserContext';
import AppLayout from '../layout/AppLayout';
import {colors} from '../styles';

const EditProfile = ({navigation, route}) => {
  const {profileData, updateProfile} = useContext(UserContext);
  const [inputs, setInputs] = useState(profileData);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const handleChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.username) {
      handleError('Please enter username', 'username');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please enter password', 'password');
      valid = false;
    }
    if (inputs.password.length > 0 && inputs.password.length < 5) {
      handleError('Password length is too short', 'password');
      valid = false;
    }

    if (!inputs.email) {
      handleError('Please enter email', 'email');
      valid = false;
    }

    if (valid) register();
  };
  const register = () => {
    updateProfile(inputs);
    setInputs({
      username: '',
      password: '',
      email: '',
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title + ' Profile',
    });
  }, []);
  return (
    <AppLayout>
      <Card>
        <Card.Title>{route.params.title} Profile</Card.Title>

        <View></View>
        <Card
          style={{
            backgroundColor: colors.BLACK_4,
            paddingHorizontal: 5,
            margin: 0,
          }}>
          <TextInput
            label={'Username'}
            value={inputs.username}
            iconName="account"
            error={errors.username}
            style={{width: '100%'}}
            onFocus={() => {
              handleError(null, 'username');
            }}
            onChangeText={text => handleChange(text, 'username')}
          />
          <TextInput
            label={'Email'}
            iconName="email"
            value={inputs.email}
            error={errors.email}
            style={{width: '100%'}}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={text => handleChange(text, 'email')}
          />
          <TextInput
            value={inputs.password}
            password={true}
            label={'Password'}
            error={errors.password}
            iconName="lock"
            onFocus={() => {
              handleError(null, 'password');
            }}
            style={{width: '100%'}}
            onChangeText={text => handleChange(text, 'password')}
          />
        </Card>
      </Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button title={'Save'} onPress={validate} />
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
