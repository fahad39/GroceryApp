import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const PrimaryButton = ({title, onPress, color = 'red'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.container, backgroundColor: color}}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginHorizontal: 15,
    width: '35%',
    marginVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 15,
  },
});

export default PrimaryButton;
