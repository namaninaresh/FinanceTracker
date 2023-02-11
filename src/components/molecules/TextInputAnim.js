import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Animated, StyleSheet} from 'react-native';

import {colors} from '../../styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../atoms/Text';

const TextInputAnim = ({
  label,
  iconName,
  error,
  value = '',
  password,
  onChangeText,
  size = 56,
  inputMode = 'text',
  multiline = false,

  onFocus = () => {},
  style,
  ...props
}) => {
  const [focused, setFocused] = useState(value.length > 0 ? true : false);

  const [hidePassword, setHidePassword] = useState(password);

  const labelPosition = useRef(new Animated.Value(size / 3.7)).current;
  const labelOpacity = labelPosition.interpolate({
    inputRange: [0, 36],
    outputRange: [1, 0.5],
  });

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(labelPosition, {
      toValue: -25,
      duration: 200,
      useNativeDriver: false,
    }).start();
    //onFocus();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(labelPosition, {
      toValue: size / 3.7,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (value.length > 0) {
      handleFocus();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.BLACK_3,
        }}>
        <Animated.Text
          style={[
            styles.label,
            {
              position: 'absolute',
              top: labelPosition,
              opacity: labelOpacity,

              zIndex: focused ? 1000 : 0,
              fontSize: focused ? 14 : 16,
            },
          ]}>
          {iconName && <Icon name={iconName} color={'#6f7780'} size={20} />}
          {label}
        </Animated.Text>
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          cursorColor={colors.WHITE_2}
          value={value.toString()}
          inputMode={inputMode}
          multiline={multiline}
          style={[styles.input, {height: size}]}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      {error && (
        <Text style={{color: colors.WARNING, paddingLeft: 15, marginTop: 2}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    width: '100%',
    fontSize: 15,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: colors.WHITE_2,
    borderWidth: 1,
    borderColor: colors.BLACK_2,

    position: 'relative',
    zIndex: 1,
  },
  label: {
    color: '#fff',
    letterSpacing: 0.7,

    //color: '#6f7780',
    paddingHorizontal: 6,
    overflow: 'hidden',
    maxWidth: '90%',
  },
});

export default TextInputAnim;
/*import React, {useState} from 'react';
import {View, TextInput, Animated, StyleSheet} from 'react-native';

const TextInputAnim = () => {
  const [focused, setFocused] = useState(false);
  const [value, onChangeText] = useState('');

  const labelPosition = new Animated.Value(focused ? 0 : 36);
  const labelOpacity = labelPosition.interpolate({
    inputRange: [0, 36],
    outputRange: [1, 0.5],
  });

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            position: 'absolute',
            top: labelPosition,
            opacity: labelOpacity,
            fontSize: focused ? 14 : 20,
          },
        ]}>
        Username
      </Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 56,
    fontSize: 20,
    width: '100%',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    color: '#aaa',
  },
});

export default TextInputAnim; */
