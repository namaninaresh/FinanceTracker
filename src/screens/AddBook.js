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

export default function AddBook({navigation, route}) {
  const {addBook, updateBook} = useContext(UserContext);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params ? 'Update Book' : 'Add Book',
    });
  }, []);
  const [inputs, setInputs] = useState(
    route.params
      ? route.params
      : {
          id: '',
          title: '',
          amount: 0,
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

    if (valid) register();
  };

  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      route.params
        ? updateBook({
            ...inputs,
          })
        : addBook({
            ...inputs,
          });

      // addTransaction(inputs);
      setInputs({
        title: '',
        amount: 0,
      });
      navigation.navigate('Modal', {
        message: `Sucessfully ${route.params ? 'Updated' : 'Added'}`,
      });

      // Alert.alert('Error', 'Something is wrong');
    }, 3000);
  };
  const handleReset = () => {
    setInputs({
      title: '',
      amount: 0,
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
              {route.params ? 'Update' : 'Add New'} Book
            </Card.Title>

            <TextInput
              value={inputs.title}
              multiline={true}
              label={'Book Name'}
              error={errors.title}
              onFocus={() => {
                handleError(null, 'title');
              }}
              onChangeText={text => handleChange(text, 'title')}
              iconName="book"
              style={{width: '100%'}}
            />

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
