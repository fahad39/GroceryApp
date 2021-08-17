import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';

import AddItem from '../components/AddItem';
import FilterButton from '../components/FilterButton';
import authStorage from '../config/storage';

const ListView = ({navigation}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, [showModal]);

  const getProducts = async () => {
    let values = await authStorage.getAllProduct();
    console.log('value is', values);
    values.forEach(item => {
      let products = JSON.parse(item[1]);
      setProduct([...product, products]);
    });
  };

  const renderItem = ({item}) => {
    let update = item.history.length;
    return (
      <View style={styles.card}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Name: {item.title}</Text>
          <Switch value={item.status === 'have' ? true : false} />
        </View>

        <Text>Last Edit: {item.history[update - 1]}</Text>
        <Text>Priority: {item.priority}</Text>
        <FilterButton
          title="View"
          color="red"
          onPress={() => navigation.naviagte('EntryView')}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Grocery List</Text>

      {/* Filters */}
      <View style={styles.filterView}>
        <FilterButton
          title={'Add'}
          color="#6e72b5"
          onPress={() => setShowModal(true)}
        />
        <FilterButton
          title={'Filter'}
          color="#ffbe6d"
          onPress={() => setShowFilter(!showFilter)}
        />
      </View>

      {/* Add Item */}
      <AddItem
        visible={showModal}
        onReject={() => setShowModal(false)}
        onAccept={() => setShowModal(false)}
      />

      {/* Filter View */}
      {showFilter && (
        <View style={styles.filter}>
          <FilterButton title={'Ran Out'} color="#ffbe6d" />
          <FilterButton title={'Have'} color="#ffbe6d" />
          <FilterButton title={'All'} color="#ffbe6d" />
        </View>
      )}

      {/* Product List */}
      <View style={styles.subContainer}>
        <FlatList
          data={product}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
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
  subContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterView: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    height: 60,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginBottom: 20,
    paddingVertical: 10,
  },
});

export default ListView;
