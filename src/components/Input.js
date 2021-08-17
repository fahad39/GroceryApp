import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

const Input = ({title, placeholder, value, onChangeText}) => {
  return (
    <View style={styles.container}>
      {/* Input Field title */}
      <Text style={styles.titleStyles}>{title}</Text>
      {/* Input Field */}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 50,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#d3d3d3',
  },
  titleStyles: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Input;
