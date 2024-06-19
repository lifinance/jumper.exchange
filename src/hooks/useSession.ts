import { useEffect, useState } from 'react';
import { uuidv7 } from 'uuidv7';

export const useSession = (): string => {
  const sessionIdFromStorage = sessionStorage?.getItem('session_id');
  const [session, setSession] = useState('');

  useEffect(() => {
    if (sessionIdFromStorage) {
      setSession(sessionIdFromStorage);
    } else {
      setSession(uuidv7());
      sessionStorage?.setItem('session_id', session);
    }

    // Log the session ID for testing purposes
  }, [session, sessionIdFromStorage, setSession]);

  return session;
};
