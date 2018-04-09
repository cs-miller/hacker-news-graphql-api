// @flow

import * as firebase from 'firebase';

const config = {
  apiKey: '',
  databaseURL: 'https://hacker-news.firebaseio.com'
};

firebase.initializeApp(config);

const version = '/v0';

const api = firebase.database().ref(version);

const createListFetcher = refGetter => async () => {
  const snapshot = await refGetter().once('value');
  return snapshot.val();
};
const createIdFetcher = refGetter => async (id: string) => {
  const snapshot = await refGetter(id).once('value');
  return snapshot.val();
};
const itemRef = (id: string) => api.child(`item/${id}`);

export const fetchItem = createIdFetcher(itemRef);

const userRef = (id: string) => api.child(`user/${id}`);

export const fetchUser = createIdFetcher(userRef);

export const fetchTopStoriesList = createListFetcher(() => api.child('topstories'));

export const fetchNewStoriesList = createListFetcher(() => api.child('newstories'));

export const fetchBestStoriesList = createListFetcher(() => api.child('beststories'));

export const fetchAskStoriesList = createListFetcher(() => api.child('askstories'));

export const fetchShowStoriesList = createListFetcher(() => api.child('showstories'));

export const fetchJobStoriesList = createListFetcher(() => api.child('jobstories'));

export type db = {
  fetchItem: typeof fetchItem,
  fetchUser: typeof fetchUser,
  fetchTopStoriesList: typeof fetchTopStoriesList,
  fetchNewStoriesList: typeof fetchNewStoriesList,
  fetchBestStoriesList: typeof fetchBestStoriesList,
  fetchAskStoriesList: typeof fetchAskStoriesList,
  fetchShowStoriesList: typeof fetchShowStoriesList,
  fetchJobStories: typeof fetchJobStoriesList
};
