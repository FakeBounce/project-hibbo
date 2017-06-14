/**
 * Created by Fakebounce on 13/11/2016.
 */

import * as actions from './actions';
import Dungeon from './dungeon';
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
        case firebaseActions.FIREBASE_SAVE_USER_SUCCESS: {
            let viewer = state.viewer;
            if(!viewer)
            {
                return state.set('viewer', action.payload);
            }
            else
            {
                return state;
            }
        }

        case actions.LOAD_TUTO: {
            console.log(action.payload);
            return state;
        }

        default:
            return state;
    }
};

export default tutorielReducer;
