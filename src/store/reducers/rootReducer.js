import authReducer from './authReducer'
import homeReducer from './homeReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;