import AsyncStorage from '@react-native-async-storage/async-storage';

const storeProduct = async item => {
  try {
    let key = JSON.stringify(item.id);
    console.log(item);
    let obj = JSON.stringify(item);
    console.log('obj us', obj);
    await AsyncStorage.setItem(key, obj);
  } catch (error) {
    console.log('Error saving Product.');
  }
};

const getAllProduct = async () => {
  //   First get keys
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('Error getting keys');
  }

  //Then get all items
  let values = [];
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    console.log('Error getting  product');
  }

  return values;
};

export default {storeProduct, getAllProduct};
