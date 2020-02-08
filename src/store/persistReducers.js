import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'rmsmart',
      storage: AsyncStorage,
      whitelist: ['auth', 'user', 'visit'],
    },
    reducers,
  );

  return persistedReducer;
};
