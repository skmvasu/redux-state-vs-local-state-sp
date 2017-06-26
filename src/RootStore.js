import {createStore, combineReducers} from 'redux';
import flick from './FlickDuck';

const RootReducer = combineReducers({
    flick
});

export default createStore(RootReducer);