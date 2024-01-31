import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {useContext, useState} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import Button from '../components/atoms/Button';
import TextInput from '../components/atoms/TextInput';
import {UserContext} from '../context/UserContext';
import AppLayout from '../layout/AppLayout';
import {colors} from '../styles';
import secrets from '../utils/Secrets';

GoogleSignin.configure({
  webClientId:
    '539676487573-2l3v2t2h3065u9fsidcdivnbqmsqbtub.apps.googleusercontent.com',
  redirectUrl: 'http://localhost:3000',
  offlineAccess: true,
  scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
});

const fetchGmailData = async idToken => {
  try {
    // Exchange the ID token for an access token
    const response = await axios.post(secrets.googleAuthTokenUR, {
      code: idToken,
      client_id: secrets.clientId,
      client_secret: secrets.clientSecret,
      grant_type: 'authorization_code',
    });
    console.log('here ', response);
    const accessToken = response.data.access_token;

    // Fetch Gmail data using the access token
    const gmailResponse = await axios.get(secrets.gmailURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('gmail', gmailResponse);
    return gmailResponse.data;
  } catch (error) {
    console.error('Error fetching Gmail data:', error);
    throw error;
  }
};
const Login = ({navigation, route}) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const {updateProfile} = useContext(UserContext);
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const temp = {...userInfo.user, username: userInfo.user.name};

      // fetchGmailData(userInfo.idToken);
      updateProfile(temp);

      try {
        navigation.goBack();
      } catch (error) {}
      //  setState({userInfo, error: undefined});
    } catch (error) {
      setErrors({...errors, login: 'Failed to Login'});
    }
  };

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
      handleError('Please enter username or email', 'username');
      valid = false;
    }

    if (!inputs.password) {
      handleError('Please enter password', 'password');
      valid = false;
    }

    if (inputs.password.length > 0 && inputs.password.length < 6) {
      handleError('Password length is too short', 'password');
      valid = false;
    }

    if (valid) register();
  };

  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      console.log('login successfully');
      //addTransaction(inputs);
      handleReset();
      // Alert.alert('Error', 'Something is wrong');
    }, 3000);
  };
  const handleReset = () => {
    setInputs({
      username: '',
      password: '',
    });
    setErrors({});
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text>Login </Text>
        <TextInput
          value={inputs.username}
          error={errors.username}
          placeholderTextColor="#fff"
          placeholder="Email / Username"
          iconName="lock"
          onFocus={() => {
            handleError(null, 'username');
          }}
          onChangeText={text => handleChange(text, 'username')}
        />
        <TextInput
          value={inputs.password}
          error={errors.password}
          placeholderTextColor="#fff"
          placeholder="Password"
          iconName="eye-off"
          onFocus={() => {
            handleError(null, 'password');
          }}
          onChangeText={text => handleChange(text, 'password')}
        />
        {/* <TextInput
          iconName={'lock'}
          placeholder="Email / Username"
          placeholderTextColor="#fff"
        />
        <TextInput
          placeholder="Password"
          iconName={'eye-off'}
          placeholderTextColor="#fff"
        />  */}
        {errors.login && (
          <Text style={{color: colors.ALERT, textAlign: 'center'}}>
            Failed to Login
          </Text>
        )}
        <Button title={'Login'} onPress={validate} />
        <Button title={'Register'} mode="outlined" onPress={() => {}} />

        <View style={{marginVertical: 30}}>
          <Text
            style={{
              color: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            OR
          </Text>
        </View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
          disabled={false}
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default Login;
