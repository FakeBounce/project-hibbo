/**
 * Created by Fakebounce on 13/11/2016.
 */

import * as actions from './actions';
import Tutoriel from './tutoriel.js';
import { Map } from 'immutable';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';
import firebase from '../lib/redux-firebase/firebase';

const State = Record({
    tutoriel: null,
    loaded: false,
    viewer: false
}, 'tutoriel');

const tutorielReducer = (state = new State(), action) => {

    switch (action.type) {

        case actions.LOAD_TUTO: {
            console.log('test');
            console.log(action.payload);
            return state;
        }

        default:
            return state;
    }
};

export default tutorielReducer;
