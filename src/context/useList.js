import React, {useContext} from 'react';
import {ListContext} from './Context';
import {saveList} from '../config/storage';

const useList = () => {
  const {list, setList} = useContext(ListContext);

  const addToList = obj => {
    let newList = [...list, obj];
    setList(newList);
    saveList(newList);
  };

  const updateList = obj => {
    const newList = list.map(item => {
      if (item.id === obj.id) {
        return {...obj};
      } else {
        return {...item};
      }
    });

    setList(newList);
    saveList(newList);
  };

  const deleteListItem = obj => {
    const newList = list.filter(item => item.id !== obj.id);

    setList(newList);
    saveList(newList);
  };

  return {list, addToList, updateList, deleteListItem, setList};
};

export default useList;
