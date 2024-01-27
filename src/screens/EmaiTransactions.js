import axios from 'axios';
import {decode} from 'base-64';
import {default as React, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {authorize} from 'react-native-app-auth';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import {UserContext} from '../context/UserContext';
const response = {
  access_token:
    'ya29.a0AfB_byDHJl0EXE3vzO0wkIgHM395jJeIwD9ZjQmLg9FBhNRU_8NnzaBp_Z_RJ_Juv6_rHIvKdcITA_JnXw6K3vzbD7pWSksEFOFPQCoB-TpthYsfW8yAH-Z9TXITdilBNnDqyd9WDKEdqKvu4GQPz4KIPro6thDukX0uaCgYKAZoSARASFQHGX2Mi8-ekv_lzUXqaH3p2M5_FPg0171',
  scope:
    'https://www.googleapis.com/auth/gmail.insert https://www.googleapis.com/auth/gmail.addons.current.message.action https://mail.google.com/ https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.addons.current.action.compose https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.addons.current.message.metadata https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.settings.basic https://www.googleapis.com/auth/gmail.settings.sharing https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  token_type: 'Bearer',
  expires_in: 3599,
  refresh_token:
    '1//04czV52nJCVEMCgYIARAAGAQSNwF-L9Ir9SyXZtMCVYpNCr2pQ_e_yMa6WD4zkM9c4KXZjrQBOAsk5Szc0xhEpdpTbWsXmvpxbV0',
};
//539676487573-2l3v2t2h3065u9fsidcdivnd.apps.googleusercontent.com

const isMessageFromSender = (messageData, desiredSender) => {
  const fromHeader = messageData.payload.headers.find(
    header => header.name === 'From',
  );
  return fromHeader && fromHeader.value.includes(desiredSender);
};

const getMessageBody = payload => {
  const body = payload.parts.find(part => part.mimeType === 'text/plain');

  if (body && body.body && body.body.data) {
    const cleanedBase64 = body.body.data.replace(/_/g, '/').replace(/-/g, '+');
    try {
      return decode(cleanedBase64);
    } catch (error) {
      console.error('Error decoding base64 string:', error);
      return ''; // Return an empty string or handle the error as needed
    }
  }

  return '';
};

const extractPayment = emailData => {
  const headers = emailData.headers.reduce((acc, header) => {
    acc[header.name] = header.value;
    return acc;
  }, {});

  const body = emailData.parts.find(part => part.mimeType === 'text/plain').body
    .data;

  // Parse and extract details
  const parsedBody = decode(body);
  const matchPaidTo = parsedBody.match(/Paid To : (.+)/);
  const matchAmount = parsedBody.match(/Amount  :(.+)/);
  const matchTxnID = parsedBody.match(/Txn\. ID\s+: (.+)/);
  const matchTxnStatus = parsedBody.match(/Txn\. Status\s+: (.+)/);
  const matchDebitedFrom = parsedBody.match(/Debited From\s+: (.+)/);
  const matchBankRefNo = parsedBody.match(/Bank Ref\. No\.\s+: (.+)/);
  const matchMessage = parsedBody.match(/Message\s+: (.+)/);

  // Display extracted details
  if (matchPaidTo)
    console.log('Paid To:', matchPaidTo[1].trim().replace(/\s+/g, ' '));
  if (matchAmount)
    console.log('Amount:', matchAmount[1].trim().replace(/\s+/g, ' '));
  if (matchTxnID)
    console.log('Txn. ID:', matchTxnID[1].trim().replace(/\s+/g, ' '));
  if (matchTxnStatus)
    console.log('Txn. Status:', matchTxnStatus[1].trim().replace(/\s+/g, ' '));
  if (matchDebitedFrom)
    console.log(
      'Debited From:',
      matchDebitedFrom[1].trim().replace(/\s+/g, ' '),
    );
  if (matchBankRefNo)
    console.log(
      'Bank Ref. No.:',
      matchBankRefNo[1].trim().replace(/\s+/g, ' '),
    ); /*
  if (matchMessage) console.log('Message:', matchMessage[1]); */
};

async function getAccessToken() {
  const tokenEndpoint = 'https://oauth2.googleapis.com/token';

  try {
    const response = await axios.post(tokenEndpoint, {
      client_id:
        '539676487573-2l3v2t2h3065u9fsidcdivnbqmsqbtub.apps.googleusercontent.com',
      client_secret: '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',
      refresh_token:
        '1//04czV52nJCVEMCgYIARAAGAQSNwF-L9Ir9SyXZtMCVYpNCr2pQ_e_yMa6WD4zkM9c4KXZjrQBOAsk5Szc0xhEpdpTbWsXmvpxbV0',
      grant_type: 'refresh_token',
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching access token:', error.message);
  }
}

export default function EmailTransactions() {
  const [user, setUser] = useState(null);
  const [googleReqHeader, setGoogleReqHeader] = useState(getAccessToken());

  // 539676487573-tageg578j1rl0qlaih1v9hsdltgn2a42.apps.googleusercontent.com

  const [accessToken, setAccessToken] = React.useState('');
  const [labels, setLabels] = React.useState([]);
  const [error, setError] = React.useState('');

  const {profileData} = useContext(UserContext);
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

      console.log('ac', accessToken);
      axios
        .get(apiUrl, {headers})
        .then(response => {
          console.log('r', response);
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

  const fetchGmailData = async () => {
    // Include the access token in the Authorization header
    const headers = {
      Authorization: `Bearer ${response.access_token}`,
    };

    // Make a request to the Gmail API using the access token
    try {
      const apiResponse = await fetch(
        'https://www.googleapis.com/gmail/v1/users/me/messages',
        {
          method: 'GET',
          headers: headers,
        },
      );

      const jsonData = await apiResponse.json();
      // console.log('Gmail API Response:', jsonData);
      //console.log('hs', jsonData);
      const messages = jsonData.messages;

      for (let i = 0; i < 3; i++) {
        const messageId = messages[i].id;
        // for (const message of messages) {
        // const messageId = message.id;
        const messageResponse = await fetch(
          `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
          {
            method: 'GET',
            headers: headers,
          },
        );

        const messageData = await messageResponse.json();
        const desiredSender = '<noreply@phonepe.com>';

        // Extract specific details if the message is from the desired sender
        if (isMessageFromSender(messageData, desiredSender)) {
          console.log('here', messageData.payload);
          // extractPayment(messageData.payload);
          /* console.log(messageData.payload);
          const subject = messageData.payload.headers.find(
            header => header.name === 'Subject',
          ).value;
          const from = messageData.payload.headers.find(
            header => header.name === 'From',
          ).value;
          const date = messageData.payload.headers.find(
            header => header.name === 'Date',
          ).value;
          const bodyText = getMessageBody(messageData.payload);
  
          console.log('Subject:', subject);
          console.log('From:', from);
          console.log('Date:', date); */
          //  console.log('Body Text:', bodyText);
        }
      }

      /* for (let i = 0; i < 5; i++) {
        const messageId = messages[i].id;
        const messageResponse = await fetch(
          `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
          {
            method: 'GET',
            headers: headers,
          },
        );
  
        const messageData = await messageResponse.json();
        const subject = messageData.payload.headers.find(
          header => header.name === 'Subject',
        ).value;
        const from = messageData.payload.headers.find(
          header => header.name === 'From',
        ).value;
        const date = messageData.payload.headers.find(
          header => header.name === 'Date',
        ).value;
        const bodyText = getMessageBody(messageData.payload);
  
        console.log('Subject:', subject);
        console.log('From:', from);
        console.log('Date:', date);
        console.log('Body Text:', bodyText);
        // Process the message details as needed (e.g., display subject, content, etc.)
      } */
    } catch (error) {
      console.error('Error fetching Gmail data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gmail Label Viewer</Text>
      {accessToken ? (
        <View>
          <Button title="Log Out" onPress={handleLogout} />
          <Text style={styles.label}>Access Token: {accessToken}</Text>
          {labels.length > 0 && <Text style={styles.label}>Gmail Labels:</Text>}
          <Text style={styles.label}>
            {labels.map(label => label.name).join(', ')}
          </Text>
        </View>
      ) : (
        <Button title="Log In with Google" onPress={fetchGmailData} />
      )}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
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
