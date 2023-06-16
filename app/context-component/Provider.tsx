'use client'

/* Session Provide is a context component and so it has to run in the client. That is why we use 'use client' up top! */

import { SessionProvider } from 'next-auth/react';

const Provider = ({ children }:
  { children: React.ReactNode }) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default Provider;
