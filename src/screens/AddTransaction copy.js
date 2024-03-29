import React, {useContext, useState} from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import Loader from '../components/atoms/Loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInput from '../components/atoms/TextInput';
import AppLayout from '../layout/AppLayout';
import {colors} from '../styles';
import Text from '../components/atoms/Text';
import {dateFormatter} from '../utils';
import {UserContext} from '../context/UserContext';
import {useNavigation} from '@react-navigation/native';
import CustomPicker from '../components/molecules/CustomPicker';

const AddTransaction = ({navigation}) => {
  // const navigation = useNavigation();
  const {addTransaction, accounts} = useContext(UserContext);

  const [inputs, setInputs] = useState({
    title: '',
    amount: 0,
    desc: '',
    date: new Date(),
    dateTimeText: {
      date: null,
      time: null,
    },
  });
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState('date');
  const [modeDate, setDateMode] = useState({mode: 'date', showDate: false});

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

    if (!inputs.desc) {
      handleError('Please enter description', 'desc');
      valid = false;
    }

    if (valid) register();
  };

  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      addTransaction(inputs);
      setInputs({
        title: '',
        amount: 0,
        desc: '',
        date: new Date(),
        dateTimeText: {
          date: null,
          time: null,
        },
      });

      // Alert.alert('Error', 'Something is wrong');
    }, 3000);
  };
  const handleReset = () => {
    setInputs({
      title: '',
      amount: 0,
      desc: '',
      date: new Date(),
      dateTimeText: {
        date: null,
        time: null,
      },
    });
    setErrors({});
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || inputs.date;
    let datTime = setDateTime(currentDate);
    setInputs(prevState => ({
      ...prevState,
      date: currentDate,
      dateTimeText: {date: datTime[0], time: datTime[1]},
    }));
    setShowDate(!showDate);
  };

  const setDateTime = (currentDate = inputs.date) => {
    let tempDate = new Date(currentDate);

    let date = tempDate.getDate();
    let m = tempDate.getMonth() + 1;

    if (date < 10) date = '0' + date;
    if (m < 10) m = '0' + m;

    let fDate = date + '/' + m + '/' + tempDate.getFullYear();

    //dateTimeText.date = fDate;

    let hr = tempDate.getHours();
    let min = tempDate.getMinutes();
    if (min < 10) min = '0' + min;
    let ampm = 'am';
    if (hr > 12) {
      hr -= 12;
      ampm = 'pm';
    }
    if (hr < 10) hr = '0' + hr;
    let fTime = hr + ':' + min + ' ' + ampm;
    //dateTimeText = fTime;

    return [fDate, fTime];
  };
  return (
    <AppLayout>
      {loading && <Loader />}

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
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
              value={inputs.desc}
              multiline={true}
              label={'desc'}
              error={errors.desc}
              onFocus={() => {
                handleError(null, 'desc');
              }}
              onChangeText={text => handleChange(text, 'desc')}
              iconName="comment-text-outline"
              style={{width: '100%'}}
            />

            <View style={[styles.center, {paddingBottom: 10}]}>
              <TouchableOpacity
                onPress={() => {
                  setMode('date');
                  setShowDate(!showDate);
                }}
                style={[
                  styles.center,
                  {
                    marginHorizontal: 10,
                    backgroundColor: colors.BLACK_3,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                  },
                ]}>
                <Icon
                  name="calendar-range-outline"
                  size={22}
                  color={colors.WHITE_3}
                />
                <Text style={{paddingHorizontal: 10}}>
                  {inputs.dateTimeText.date || setDateTime()[0]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMode('time');
                  setShowDate(!showDate);
                }}
                style={[
                  styles.center,
                  {
                    marginHorizontal: 10,
                    backgroundColor: colors.BLACK_3,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                  },
                ]}>
                <Icon name="timer-outline" size={22} color={colors.WHITE_3} />
                <Text style={{paddingHorizontal: 10}}>
                  {inputs.dateTimeText.time || setDateTime()[1]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        <CustomPicker
          items={accounts}
          onValueChange={text => {
            console.log(text);
          }}
        />
        <View style={styles.center}>
          <Button title={'Add'} onPress={validate} />
          <Button title={'Reset'} mode="outlined" onPress={handleReset} />
        </View>

        <Button
          title={'View All Transactions'}
          buttonColor={colors.YELLOW_LIGHT}
          textColor={colors.BLACK_2}
          onPress={() => navigation.navigate('All Transactions')}
        />
        {showDate && (
          <DateTimePicker
            mode={mode}
            is24Hour={false}
            value={inputs.date}
            onChange={onDateChange}
          />
        )}
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(AddTransaction);
