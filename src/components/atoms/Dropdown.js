import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';
import {colors} from '../../styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Dropdown = ({
  options,
  onValueChange,
  defaultValue = options[0],
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [animation] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleOptionPress = option => {
    setSelectedOption(option);
    onValueChange(option);
    toggleDropdown();
  };

  const optionsContainerStyle = {
    opacity: animation,
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View style={styles.selectedOptionContainer}>
          {/* <Text style={styles.label}>{label}</Text> */}
          <Text style={styles.selectedOption}>{selectedOption}</Text>
          <Icon name="chevron-down" size={20} color={colors.WHITE_2} />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.optionsContainer,
          optionsContainerStyle,
          {height: isOpen ? options.length * 50 : 0},
        ]}>
        {options.map((option, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleOptionPress(option)}>
              <View style={styles.option}>
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  selectedOptionContainer: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.BLACK_2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: 'gray',
  },
  selectedOption: {
    fontSize: 15,
    color: 'white',
  },
  optionsContainer: {
    position: 'relative',
    zIndex: 5000,
    top: 0,
    right: 0,
    backgroundColor: colors.BLACK_4,
    borderColor: colors.BLACK_2,
    borderWidth: 1,
  },
  option: {
    height: 50,
    padding: 10,
    zIndex: 2000,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.BLACK_2,
  },
  optionText: {
    fontSize: 18,
    width: '100%',
    color: colors.WHITE_3,
  },
});

export default Dropdown;
