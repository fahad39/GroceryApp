import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'Grocery_key';
// const storeProduct = async item => {
//   try {
//     let key = JSON.stringify(item.id);
//     console.log(item);
//     let obj = JSON.stringify(item);
//     console.log('obj us', obj);
//     await AsyncStorage.setItem(key, obj);
//   } catch (error) {
//     console.log('Error saving Product.');
//   }
// };

// const getAllProduct = async () => {
//   //   First get keys
//   let keys = [];
//   try {
//     keys = await AsyncStorage.getAllKeys();
//   } catch (e) {
//     console.log('Error getting keys');
//   }

//   //Then get all items
//   let values = [];
//   try {
//     values = await AsyncStorage.multiGet(keys);
//   } catch (e) {
//     console.log('Error getting  product');
//   }

//   return values;
// };

const saveList = async list => {
  try {
    await removeList();
    await AsyncStorage.setItem(key, JSON.stringify(list));
  } catch (error) {
    console.log(error);
  }
};
const getList = async list => {
  try {
    const list = await AsyncStorage.getItem(key);
    return JSON.parse(list);
  } catch (error) {
    console.log(error);
  }
};
const removeList = async list => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export {saveList, getList, removeList};
