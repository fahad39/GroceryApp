import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EntryView = ({route}) => {
  const {item} = route.params;

  const renderHistory = items => {
    return (
      <View>
        {items.map(item => {
          return <Text>{item}</Text>;
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Details</Text>
      <View>
        <Text>Name :</Text>
        <Text>{item.title}</Text>
        <Text>Priority :</Text>
        <Text>{item.priority}</Text>
        <Text>History :</Text>
        {renderHistory(item.history)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 35,
    alignSelf: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
    color: '#ff9c38',
  },
});

export default EntryView;
