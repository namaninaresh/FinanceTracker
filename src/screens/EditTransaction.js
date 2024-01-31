import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useContext, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import Loader from '../components/atoms/Loader';
import Text from '../components/atoms/Text';
import TextInput from '../components/atoms/TextInput';
import {UserContext} from '../context/UserContext';
import AppLayout from '../layout/AppLayout';
import {colors} from '../styles';
import {dateFormatter} from '../utils';

const EditTransaction = ({navigation, route}) => {
  //const navigation = useNavigation();
  console.log('edi', route.params);
  const {addTransaction} = useContext(UserContext);
  const [inputs, setInputs] = useState(route.params);
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
      handleReset();

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
    console.log('datfor', dateFormatter(currentDate));
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

      <Card style={{paddingHorizontal: 10}}>
        <Card.Title>Edit New Transaction</Card.Title>
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
      <View style={styles.center}>
        <Button title={'Update'} onPress={validate} />
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

export default React.memo(EditTransaction);
