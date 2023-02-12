import {Picker as RnPicker} from '@react-native-picker/picker';
import {useRef, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors} from '../../styles';
import {capitalizeFirstLetter} from '../../utils';

const Picker = ({
  style,
  options,
  itemStyle,
  placeholder,
  onValueChange,
  selectedValue,
}) => {
  const pickerRef = useRef(null);

  const [focused, setFocused] = useState(false);

  return (
    <View style={{width: '100%'}}>
      <RnPicker
        ref={pickerRef}
        style={[styles.picker, style]}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        dropdownIconColor={colors.WHITE_3}
        mode="dialog">
        {!focused && !selectedValue && (
          <RnPicker.Item label={placeholder} value="" />
        )}
        {Array.isArray(options)
          ? options.map(item => (
              <RnPicker.Item
                style={itemStyle}
                label={capitalizeFirstLetter(item)}
                value={item}
                key={item}
              />
            ))
          : Object.keys(options).map(key => (
              <RnPicker.Item
                style={itemStyle}
                label={capitalizeFirstLetter(options[key])}
                value={key}
                key={key}
              />
            ))}
      </RnPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: colors.BLACK_3,
    marginBottom: 10,
    color: colors.WHITE_3,
    justifyContent: 'center',
  },
});

export default Picker;
