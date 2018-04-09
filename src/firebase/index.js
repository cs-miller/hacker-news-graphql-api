// @flow

import * as firebase from 'firebase';

const config = {
  apiKey: '',
  databaseURL: 'https://hacker-news.firebaseio.com'
};

firebase.initializeApp(config);

const version = '/v0';

const api = firebase.database().ref(version);

const itemRef = (id: string) => api.child(`item/${id}`);

const fetchItem = async (id: string) => {
  const snapshot = await itemRef(id).once('value');
  return snapshot.val();
};

const userRef = (id: string) => api.child(`user/${id}`);

const fetchUser = async (id: string) => {
  const snapshot = await userRef(id).once('value');
  return snapshot.val();
};

const fetchItems = async (ids: string[]) => {
  const items = await Promise.all(ids.map(fetchItem));
  return items;
};

export const db = {
  itemRef,
  userRef,
  fetchItem,
  fetchUser,
  fetchItems
};
