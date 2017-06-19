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
    map: Map(),
    loaded: false,
    dungeonLoaded: null,
    worldmap: Map(),
    viewer: null,
    dungeonsOP: Map(),
}, 'dungeon');

const dungeonsReducer = (state = new State(), action) => {
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

        case actions.LOAD_SKILLS: {
            const skills = action.payload;
            let viewer = state.viewer;
            viewer.skills = skills.skills;
            return state.set('viewer', viewer);
        }

        case actions.LOAD_WEAPONS: {
          const weapons = action.payload;
          let viewer = state.viewer;
          viewer.weapons = weapons.weapons;
          return state.set('viewer', viewer);
        }

        case actions.LOAD_DUNGEONS: {
            const { dungeons } = action.payload;
            const list = Seq(dungeons)
                    // .map(dungeonpPresence => new Dungeon(dungeonpPresence))

                .map(dungeonpPresence => new Dungeon(dungeonpPresence))
                .toList();
            const dungeonsp = action.payload.dungeons;
            return state.update('map', map => map.merge(dungeonsp))
                .set('loaded', true)
                .set('dungeonLoaded', list);
        }

        case actions.CANCEL_DUNGEON: {
            const dungeonsOP = action.payload;
            if(dungeonsOP)
            {
                return state.update('dungeonsOP', map => map.set(state.viewer.id,null));
            }
            return state;
        }

        case actions.LOAD_WORLD_MAP_SUCCESS: {
            const dungeonsOP = action.payload;
            const list = Seq(dungeonsOP)
            // .map(dungeonpPresence => new Dungeon(dungeonpPresence))
                .toList();
            // state.dungeonsOP[action.payload.id].set(action.payload);

            return state.update('dungeonsOP', map => map.set(state.viewer.id,dungeonsOP));
        }

        case actions.PRELOAD_ACTIVE_DUNGEON_SUCCESS: {
            const dungeonsOP = action.payload;
            if(dungeonsOP)
            {
                return state.update('dungeonsOP', map => map.set(state.viewer.id,dungeonsOP));
            }
            return state;
        }

        case actions.RELOAD_WORLD_MAP: {
            const dungeonsOP = action.payload.dungeons;
            console.log('dungeon state: ',state);
            if(dungeonsOP)
            {
                return state.update('dungeonsOP', map => map.set(state.viewer.id,dungeonsOP[state.viewer.id]));
            }
            return state;

        }

        case actions.ATTACK_MONSTER: {
            console.log('reducer ok');
            console.log(action.payload);
            return state;
        }

        case actions.MOVE_CHARACTER: {
            let payload = action.payload;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload));
        }

        case actions.MOVING_CHARACTER: {
            let payload = action.payload;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload));
        }

        default:
            return state;
    }
};

export default dungeonsReducer;
