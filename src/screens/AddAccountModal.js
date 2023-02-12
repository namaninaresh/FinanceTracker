import {
  Animated,
  View,
  Pressable,
  StyleSheet,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useCardAnimation} from '@react-navigation/stack';

import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import TextInput from '../components/atoms/TextInput';
import {colors} from '../styles';
import Dropdown from '../components/atoms/Dropdown';
import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../context/UserContext';
import Loader from '../components/atoms/Loader';
import AppLayout from '../layout/AppLayout';
import Card from '../components/atoms/Card';

export default function AddAccountModal({navigation, route}) {
  const {addAccount, updateAccount} = useContext(UserContext);
  const {current} = useCardAnimation();
  const options = ['card', 'bank'];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params ? 'Update Account' : 'Add Account',
    });
  }, []);
  const [inputs, setInputs] = useState(
    route.params
      ? route.params
      : {
          id: '',
          title: '',
          amount: 0,
          desc: '',
          vendor: 'bank',
        },
  );
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
    if (!inputs.title) {
      handleError('Please enter title', 'title');
      valid = false;
    }
    if (!inputs.amount | (parseFloat(inputs.amount) === 0)) {
      handleError('Please enter amount', 'amount');
      valid = false;
    }

    if (!inputs.desc) {
      handleError('Please enter Card /Account', 'desc');
      valid = false;
    }

    if (valid) register();
  };

  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      route.params
        ? updateAccount(inputs)
        : addAccount({
            ...inputs,
            type: inputs.vendor === 'bank' ? 'credited' : 'debited',
          });

      // addTransaction(inputs);
      setInputs({
        title: '',
        amount: 0,
        desc: '',
        vendor: 'bank',
      });
      navigation.navigate('Modal', {message: 'Sucessfully Added'});

      // Alert.alert('Error', 'Something is wrong');
    }, 3000);
  };
  const handleReset = () => {
    setInputs({
      title: '',
      amount: 0,
      desc: '',
      vendor: 'bank',
    });
    setErrors({});
  };

  return (
    <AppLayout>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Card>
            <Card.Title beforeColor={colors.YELLOW_LIGHT}>
              {route.params ? 'Update' : 'Add New'} Account
            </Card.Title>

            <TextInput
              value={inputs.title}
              multiline={true}
              label={'Account Name'}
              error={errors.title}
              onFocus={() => {
                handleError(null, 'title');
              }}
              onChangeText={text => handleChange(text, 'title')}
              iconName="bank"
              style={{width: '100%'}}
            />
            <TextInput
              value={inputs.amount}
              inputMode="numeric"
              label={'Amount'}
              error={errors.amount}
              keyboardType="numeric"
              iconName="cash"
              onFocus={() => {
                handleError(null, 'amount');
              }}
              onChangeText={text => handleChange(text, 'amount')}
            />
            <TextInput
              value={inputs.desc}
              multiline={true}
              label={'Account/Card Number last 4 digits'}
              error={errors.desc}
              onFocus={() => {
                handleError(null, 'desc');
              }}
              onChangeText={text => handleChange(text, 'desc')}
              iconName="credit-card-outline"
              style={{width: '100%'}}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Dropdown
                options={options}
                defaultValue={inputs.vendor}
                onValueChange={text => handleChange(text, 'vendor')}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                title={route.params ? 'Save' : 'Add'}
                onPress={() => validate()}
              />
              <Button title={'Reset'} mode="outlined" onPress={handleReset} />
            </View>
          </Card>
        </ScrollView>
      )}
    </AppLayout>
  );
}
