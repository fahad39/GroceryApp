import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const FilterButton = ({title, onPress, color}) => {
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
    height: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginHorizontal: 15,
    width: 85,
    marginVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 15,
  },
});

export default FilterButton;
