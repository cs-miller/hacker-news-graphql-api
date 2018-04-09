// @flow
import type { db } from '../firebase';

type ArgsType = {
  id: string
};

type ContextType = {
  db: db
};

type Resolver = (any, ArgsType, ContextType, any) => Promise<any>;

// eslint-disable-next-line no-unused-vars
export const item: Resolver = async (root, args, context, info) => context.db.getItem(args.id);

// eslint-disable-next-line no-unused-vars
export const user: Resolver = async (root, args, context, info) => context.db.getUser(args.id);
