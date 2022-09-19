import { encryptTransform } from 'redux-persist-transform-encrypt';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import userSlice from './userSlice';

const encryptor = encryptTransform({
    secretKey: process.env.REACT_APP_REDUX_STORAGE_SECRET_KEY,
    onError: function (error) {
        console.log(error)
    },
})
const persistConfig = {
    key: 'root',
    storage: storage,
    timeout: null,
    transforms: [encryptor]
};

const userReducer = combineReducers({
    user: userSlice,
    // content: contentSlice,
});

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: persistedReducer,
   // devTools: ENABLE_REDUX_DEV_TOOLS,
    middleware: [thunk]
  });
  export const persistor = persistStore(store);