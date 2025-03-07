import NextAuth from 'next-auth';
import { cache } from 'react';

import { authConfig } from './config';
import { Provider } from 'next-auth/providers';

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

const providers = authConfig.providers as Provider[];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export { auth, handlers, signIn, signOut };
