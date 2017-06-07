/**
 * Created by bromanelli on 11/10/2016.
 */

import * as actions from './actions';
import Character from './character';
import { Map } from 'immutable';
import { Record } from '../transit';
import { firebase } from '../../common/lib/redux-firebase';

const State = Record({
    map: Map(),
}, 'maptiles');

/* no error but no db
 const saveMaptile = maptile => ({ firebase }) => {
 const promise = firebaseDatabase.ref('maptiles/'+maptile.id).set({
 test: maptile.title,
 });
 return {
 type: 'FIREBASE_SAVE_MAPTILE',
 payload: promise,
 };
 };
 */
/*
 const saveMaptile = maptile => ({ firebase }) => {
 const { ...json } = maptile.toJS();
 const promise = firebase.update({
 [`maptiles/${maptile.id}`]: { json },
 });
 return {
 type: 'FIREBASE_SAVE_MAPTILE',
 payload: promise,
 };
 };*/

const maptilesReducer = (state = new State(), action) => {
    switch (action.type) {

        case actions.MAPTILE_COMPLETED: {
            const maptile = new MapTile(action.payload);
            return state;
        }

        case actions.FIREBASE_SAVE_MAPTILE: {
            const maptile = new MapTile(action.payload);
            console.log(action.payload);
            return state;
        }

        default:
            return state;

    }
};

export default maptilesReducer;
