import axios from 'axios';
import {default as React, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {authorize, revoke} from 'react-native-app-auth';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

export default function EmailTransactions() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const config = {
    clientId:
      '539676487573-2l3v2t2h3065u9fsidcdivnbqmsqbtub.apps.googleusercontent.com',
    redirectUrl: 'http://localhost', // Use the same redirect URI you configured in the Google Cloud Console
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      tokenEndpoint: 'https://accounts.google.com/o/oauth2/token',
      revocationEndpoint: 'https://accounts.google.com/o/oauth2/revoke',
    },
  };
  //webClientId: 539676487573-2l3v2t2h3065u9fsidcdivnbqmsqbtub.apps.googleusercontent.com
  const [accessToken, setAccessToken] = React.useState('');
  const [labels, setLabels] = React.useState([]);

  // Function to initiate OAuth2 authentication
  const handleLogin = async () => {
    try {
      const authState = await authorize(config);
      const {accessToken} = authState;

      // Store the access token in state
      setAccessToken(accessToken);

      // Use the access token to fetch Gmail labels
      const apiUrl = 'https://www.googleapis.com/gmail/v1/users/me/labels';
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .get(apiUrl, {headers})
        .then(response => {
          setLabels(response.data.labels);
        })
        .catch(error => {
          setError('Error fetching labels: ' + error.message);
        });
    } catch (error) {
      setError('OAuth2 Error: ' + error.message);
    }
  };

  // Function to log out and revoke access
  const handleLogout = async () => {
    try {
      await revoke(config, {tokenToRevoke: accessToken});
      setAccessToken('');
      setLabels([]);
    } catch (error) {
      setError('Error revoking access: ' + error.message);
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
        <Button title={'Sign with Google'} onPress={handleLogin} />
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
