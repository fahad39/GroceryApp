import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import AddItem from '../components/AddItem';
import FilterButton from '../components/FilterButton';
import useList from '../context/useList';
import {Radio} from 'native-base';
import moment from 'moment';
import {getList} from '../config/storage';

const ListView = ({navigation}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const [status, setStatus] = useState();
  const {list, updateList, deleteListItem, setList} = useList();

  useEffect(() => {
    setProducts(list);
  }, [deleted, showModal]);

  useEffect(() => {
    restoreList();
  }, []);

  const restoreList = async () => {
    const list = await getList();
    console.log({list});
    setList(list);
  };

  const renderItem = ({item}) => {
    let update = item.history.length;
    const handleOnChnage = value => {
      setStatus(value);
      item.history = [...item.history, moment().format('LLL')];
      updateList(item);
    };

    return (
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Name: {item.title}</Text>
        </View>

        <Text>Last Edit: {item.history[update - 1]}</Text>
        <Text>Priority: {item.priority}</Text>
        <Radio.Group
          accessibility="hello"
          value={item.status}
          onChange={handleOnChnage}>
          <Radio value="have">Have</Radio>
          <Radio value="ranOut">Ran Out</Radio>
        </Radio.Group>
        <View style={{alignSelf: 'center'}}>
          <FilterButton
            title="View"
            color="red"
            onPress={() => navigation.navigate('EntryView', {item: item})}
          />
          <FilterButton
            title="Delete"
            color="red"
            onPress={() => {
              deleteListItem(item);
              setDeleted(!deleted);
            }}
          />
        </View>
        {console.log({item})}
      </View>
    );
  };
  // Filter Function
  const renderFilter = status => {
    console.log({status});
    if (status.toLowerCase() === 'all') {
      return setProducts(list);
    }
    let temp = products.filter(
      item => item.status.toLowerCase() === status.toLowerCase(),
    );
    setProducts(temp);
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
          <FilterButton
            title={'Ran Out'}
            color="#ffbe6d"
            onPress={() => renderFilter('ranout')}
          />
          <FilterButton
            title={'Have'}
            color="#ffbe6d"
            onPress={() => renderFilter('have')}
          />
          <FilterButton
            title={'All'}
            color="#ffbe6d"
            onPress={() => renderFilter('all')}
          />
        </View>
      )}

      {/* FlatList */}
      <View style={styles.subContainer}>
        <FlatList
          data={products}
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
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginBottom: 20,
  },
});

export default ListView;
