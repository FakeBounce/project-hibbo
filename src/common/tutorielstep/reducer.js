/**
 * Created by Fakebounce on 13/11/2016.
 */

import * as actions from './actions';
import TutorielStep from './tutorielstep.js';
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

const tutorielstepReducer = (state = new State(), action) => {

    switch (action.type) {

        case actions.LOAD_STEP_SUCCESS: {
            console.log("load step reducer", action);
            console.log("load step reducer state", state);
            return state;
        }

        default:
            return state;
    }
};

export default tutorielstepReducer;
