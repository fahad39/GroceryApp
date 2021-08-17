import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Select} from 'native-base';
import Modal from 'react-native-modal';
import UUIDGenerator from 'react-native-uuid-generator';
import moment from 'moment';

import Input from './Input';
import PrimaryButton from './PrimaryButton';
import authStorage from '../config/storage';
import useList from '../context/useList';

const AddItem = ({visible, onAccept, onReject}) => {
  // Variables
  const [product, setProduct] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState(moment().format('LLL'));
  const {addToList} = useList();

  //Save Product Function

  const handleStore = obj => {
    addToList(obj);
  };

  const handleSave = async () => {
    let id;
    UUIDGenerator.getRandomUUID(uuid => {
      id = uuid;
      let Obj = {
        id: id,
        status: status,
        title: product,
        priority: priority,
        history: [date],
      };

      setProduct(null);
      setStatus(null);
      setPriority(null);
      handleStore(Obj);
      onAccept();
    });
  };

  return (
    <Modal isVisible={visible}>
      {/* Modal Start From here */}

      <View style={styles.container}>
        {/* Product Title */}
        <Text style={styles.header}>Add Product</Text>

        {/* Input Fields */}
        <View style={{marginVertical: 20}}>
          <Input
            title={'Product name'}
            placeholder="Name"
            value={product}
            onChangeText={setProduct}
          />
          <View style={{marginBottom: 10}}>
            <Text style={styles.titleStyles}>Status</Text>
            <Select
              selectedValue={status}
              placeholder="Select Product Status"
              onValueChange={itemvalue => setStatus(itemvalue)}
              style={{
                height: 45,
              }}>
              <Select.Item label="Run Out" value="runOut" />
              <Select.Item label="Have" value="have" />
            </Select>
          </View>
          <View>
            <Text style={styles.titleStyles}>Priority</Text>
            <Select
              selectedValue={priority}
              placeholder="Select Product Priority"
              onValueChange={itemvalue => setPriority(itemvalue)}
              style={{
                height: 45,
              }}>
              <Select.Item label="1" value="1" />
              <Select.Item label="2" value="2" />
              <Select.Item label="3" value="3" />
              <Select.Item label="4" value="4" />
              <Select.Item label="5" value="5" />
            </Select>
          </View>
        </View>

        {/* Modal Button */}
        <View style={styles.btnView}>
          <PrimaryButton
            title="Add"
            color="#6e72b5"
            onPress={() => handleSave()}
          />
          <PrimaryButton onPress={onReject} title={'Cancel'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#ff9c38',
  },
  titleStyles: {
    fontSize: 16,
    fontWeight: '700',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
});

export default AddItem;
