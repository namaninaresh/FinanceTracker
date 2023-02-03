import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {colors} from '../../styles';

const CustomPicker = ({items, onValueChange}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleValueChange = (value, id) => {
    setSelectedValue(value);
    setShowPicker(false);
    onValueChange(id);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={togglePicker}
        style={{
          backgroundColor: colors.BLACK_3,
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderRadius: 10,
          alignSelf: 'flex-start',
          overflow: 'hidden',
        }}>
        <Text style={styles.selectedValueText}>
          {selectedValue ? selectedValue : 'Select Bank'}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showPicker}
        animationType="slide"
        onRequestClose={togglePicker}>
        <View style={styles.modalContainer}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleValueChange(item.title, item.id)}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedValueText: {
    fontSize: 18,
    color: '#fff',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    height: '100%',
    padding: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomPicker;
