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

const getTopStoryIds = async () => {
  const snapshot = await api.child('/topstories').once('value');
  return snapshot.val();
};

const getNewStoryIds = async () => {
  const snapshot = await api.child('/newstories').once('value');
  return snapshot.val();
};

const getBestStoryIds = async () => {
  const snapshot = await api.child('/beststories').once('value');
  return snapshot.val();
};

const getAskStoryIds = async () => {
  const snapshot = await api.child('/askstories').once('value');
  return snapshot.val();
};

const getShowStoryIds = async () => {
  const snapshot = await api.child('/showstories').once('value');
  return snapshot.val();
};

const getJobStoryIds = async () => {
  const snapshot = await api.child('/jobstories').once('value');
  return snapshot.val();
};

export const getFeed = async (type: string) => {
  switch (type) {
    case 'TOP':
      return getTopStoryIds();
    case 'NEW':
      return getNewStoryIds();
    case 'BEST':
      return getBestStoryIds();
    case 'ASK':
      return getAskStoryIds();
    case 'SHOW':
      return getShowStoryIds();
    case 'JOB':
      return getJobStoryIds();
    default:
      return Promise.resolve([]);
  }
};

export type db = {
  getItem: typeof getItem,
  getUser: typeof getUser
};
