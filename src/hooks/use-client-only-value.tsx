
'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that returns null on the server and the provided value on the client.
 * This is useful for preventing hydration mismatches with values that are
 * different on the server and client (e.g., dates, window properties).
 * @param value The value to be returned on the client.
 */
export function useClientOnlyValue<T>(value: T): T | null {
  const [clientValue, setClientValue] = useState<T | null>(null);

  useEffect(() => {
    setClientValue(value);
  }, [value]);

  return clientValue;
}
