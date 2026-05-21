import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const useIsMount = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
