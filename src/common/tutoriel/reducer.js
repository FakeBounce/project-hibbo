/**
 * Created by Fakebounce on 13/11/2016.
 */

import * as actions from './actions';
import * as appActions from '../app/actions';
import Tutoriel from './tutoriel.js';
import { Map } from 'immutable';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';
import firebase  from '../lib/redux-firebase/firebase';

const State = Record({
    tuto: null,
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

        case actions.LOAD_NOTHING: {
            if(action.payload.tutoriel)
            {
                return state.set('tuto', action.payload.tutoriel);
            }
            return state;
        }

        case actions.LOAD_TUTO_SUCCESS: {
            if(action.payload)
            {
                return state.set('tuto', action.payload);
            }
            return state;
        }

        case actions.CREATE_TUTO_SUCCESS: {
            return state.set('tuto', action.payload);
        }

        case actions.LOAD_STEP_SUCCESS: {
            console.log("payload",action.payload);

            let tuto = state;
            state.map(t => {
                if(t.step != null)
                {
                    t.step = action.payload;
                }
            });
            return state;
        }

        default:
            return state;
    }
};

export default tutorielReducer;
