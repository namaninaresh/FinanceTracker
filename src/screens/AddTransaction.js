import React, {useState} from 'react';
import {Alert, Keyboard, View} from 'react-native';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import Loader from '../components/atoms/Loader';

import TextInput from '../components/atoms/TextInput';
import AppLayout from '../layout/AppLayout';
import {colors} from '../styles';

const AddTransaction = ({navigation}) => {
  const [inputs, setInputs] = useState({
    title: '',
    amount: 0,
    description: '',
  });
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
    if (!inputs.amount | (Number(inputs.amount) === 0)) {
      handleError('Please enter amount', 'amount');
      valid = false;
    }

    if (!inputs.description) {
      handleError('Please enter description', 'description');
      valid = false;
    }

    if (valid) register();
  };

  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);

      setInputs({
        title: '',
        amount: 0,
        description: '',
      });

      // Alert.alert('Error', 'Something is wrong');
    }, 3000);
  };
  const handleReset = () => {
    setInputs({
      title: '',
      amount: 0,
      description: '',
    });
    setErrors({});
  };
  return (
    <AppLayout>
      {loading && <Loader />}

      <Card style={{paddingHorizontal: 10}}>
        <Card.Title>Add New Transaction</Card.Title>
        <View>
          <TextInput
            value={inputs.title}
            error={errors.title}
            label={'Title'}
            iconName="card-text-outline"
            onFocus={() => {
              handleError(null, 'title');
            }}
            onChangeText={text => handleChange(text, 'title')}
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
            value={inputs.description}
            multiline={true}
            label={'Description'}
            error={errors.description}
            onFocus={() => {
              handleError(null, 'description');
            }}
            onChangeText={text => handleChange(text, 'description')}
            iconName="comment-text-outline"
            style={{width: '100%'}}
          />
        </View>
      </Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button title={'Add'} onPress={validate} />
        <Button title={'Reset'} mode="outlined" onPress={handleReset} />
      </View>
      <Button
        title={'View All Transactions'}
        buttonColor={colors.YELLOW_LIGHT}
        textColor={colors.BLACK_2}
        onPress={() => navigation.navigate('All Transactions')}
      />
    </AppLayout>
  );
};

export default React.memo(AddTransaction);
