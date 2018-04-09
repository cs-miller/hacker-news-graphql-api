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

export const getItem = async (id: string) => {
  const snapshot = await itemRef(id).once('value');
  return snapshot.val();
};

const userRef = (id: string) => api.child(`user/${id}`);

export const getUser = async (id: string) => {
  const snapshot = await userRef(id).once('value');
  return snapshot.val();
};

export type db = {
  getItem: typeof getItem,
  getUser: typeof getUser
};
