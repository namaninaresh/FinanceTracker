import React, {useState} from 'react';
import {
  TextInput as RNInput,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {colors} from '../../styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TextInput = ({
  label,
  iconName,
  error,
  password,
  onChangeText,
  onFocus = () => {},
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {borderColor: error ? 'red' : isFocused ? 'blue' : '#E0E0E0'},
        ]}>
        <Icon
          name={iconName}
          color={colors.WHTIE_4}
          size={20}
          style={{paddingHorizontal: 10, opacity: 0.8}}
        />
        <RNInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          value
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{flex: 1, color: colors.WHITE_2}}
          {...props}
        />
        {password && (
          <Icon
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{
              fontSize: 22,
              paddingHorizontal: 10,
              color: colors.BLACK_1,
            }}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
      {error && (
        <Text style={{color: colors.WARNING, paddingLeft: 15, marginTop: 7}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },

  label: {
    fontSize: 14,
    marginVertical: 5,
    color: 'grey',
    marginHorizontal: 10,
  },
  inputContainer: {
    height: 55,
    backgroundColor: colors.BLACK_3,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default TextInput;
