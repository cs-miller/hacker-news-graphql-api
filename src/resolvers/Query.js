import { get } from 'axios';

const baseURL = 'https://hacker-news.firebaseio.com/v0/item';

// eslint-disable-next-line import/prefer-default-export, no-unused-vars
export async function item(root, args, context, info) {
  const { status, data } = await get(`${baseURL}/${args.id}.json`);
  if (status !== 200) throw new Error('request failed');
  return data;
}
