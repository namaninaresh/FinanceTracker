import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {default as React, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
//539676487573-2l3v2t2h3065u9fsidcdivnd.apps.googleusercontent.com
export default function EmailTransactions() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '539676487573-2l3v2t2h3065u9fsidcdivnbqmsqbtub.apps.googleusercontent.com',
    });
  });

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      console.log('user', userInfo);
      setState({userInfo, error: undefined});
    } catch (error) {
      console.log('eeror', error.code);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gmail Label Viewer</Text>
      {user ? (
        <View>
          <Button title="Log Out" onPress={() => {}} />
          <Text style={styles.label}>User: {user.user.email}</Text>
        </View>
      ) : (
        <Button title={'Sign with Google'} onPress={_signIn} />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
