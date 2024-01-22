import {default as React, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

export default function EmailTransactions() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gmail Label Viewer</Text>
      {user ? (
        <View>
          <Button title="Log Out" onPress={() => {}} />
          <Text style={styles.label}>User: {user.user.email}</Text>
        </View>
      ) : (
        <Button title={'Sign with Google'} onPress={() => {}} />
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
