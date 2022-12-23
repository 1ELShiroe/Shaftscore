import { configureStore, combineReducers } from '@reduxjs/toolkit'
import favorite from './favoritesRedux'
import {
    persistStore,
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({ favorite: favorite })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }))
})

export const persistor = persistStore(store)

















// const redux = require('redux');
// const createStore = redux.createStore


// //Actions
// export function addFavorite(fav) {
//     let isContent = initialState.filter(f => f.id === fav.id)
//     // if (!isContent.length > 0) {
//     return {
//         type: "add",
//         info: "add the current favorites",
//         playload: fav
//     };
//     // }

// }

// export function removeFavorite(id) {
//     return {
//         type: "remove",
//         info: "remove the current favorites",
//     };
// }

// export function getState() {
//     return {
//         type: "list",
//         fav: initialState
//     };
// }

// const initialState = [
// ];

// // Reducers
// function favoriteReducer(prevState = initialState, action) {
//     switch (action.type) {
//         case "add":
//             let isContent = initialState.filter(f => f.id === action.playload.id)
//             if (isContent.length === 0) {
//                 return {
//                     prevState: initialState.push(action.playload)
//                 }
//             }
//             return
//         // return {
//         //
//         // }
//         case "remove":
//             console.log('LOGOUT')
//             return {
//                 ...prevState,
//             };
//         case 'list':
//             return prevState.favorite
//         default:
//             return prevState;
//     }
// }

// export const store = createStore(favoriteReducer)

// // console.log(store.getState());
// // store.dispatch(changeFavorite('test2e'))
// // console.log(store.getState());
// // store.dispatch(logout())
// // console.log(store.getState());

