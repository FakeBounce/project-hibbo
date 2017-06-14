/**
 * Created by Fakebounce on 13/11/2016.
 */

import * as actions from './actions';
import Tutoriel from './tutoriel.js';
import { Map } from 'immutable';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';
import firebase  from '../lib/redux-firebase/firebase';

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

<<<<<<< HEAD
        case actions.LOAD_TUTO_SUCCESS: {
=======
        case actions.LOAD_TUTO: {
            console.log("action paylord reducer", action.payload);
>>>>>>> 7c8f9f9db554b53befa470ce71586e9cf151226c
            return state.set('tutoriel', action.payload);
        }

        case actions.CREATE_TUTO: {
            return state.set('tutoriel', action.payload);
        }

        default:
            return state;
    }
};

export default tutorielReducer;
