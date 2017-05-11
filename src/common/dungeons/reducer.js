/**
 * Created by Ben on 13/11/2016.
 */

import * as actions from './actions';
import Dungeon from './dungeon';
import { Map } from 'immutable';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';

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

        case firebaseActions.FIREBASE_ON_AUTH: {
            const { user } = action.payload;
            return state.set('viewer', user);
        }

        case actions.FIREBASE_LOAD_DUNGEON: {
            const dungeon = new Dungeon(action.payload);
            return state.update('map', map => map.set(dungeon.id, dungeon));
        }

        case actions.LIST_DUNGEONS: {
            const dungeons = action.payload.reduce((dungeons, json) =>
                dungeons.set(json.id, new Dungeon(json)),Map());
            return state.update('map', map => map.merge(dungeons));
        }

        case actions.LAUNCH_DUNGEON: {
            const dungeon = new Dungeon(action.payload);
            return state.update('map', map => map.set(dungeon.id, dungeon));
        }

        case actions.ON_ACTIVE_DUNGEON: {
            const dungeons = action.payload.reduce((dungeons, json) =>
                dungeons.set(json.id, new Dungeon(json)),Map());

            return state.update('map', map => map.merge(dungeons));
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

        // case actions.LOAD_WORLD_MAP: {
        //     console.log('payload');
        //     console.log(action.payload);
        //     return state;
        // }

        case actions.LOAD_WORLD_MAP_SUCCESS: {
            const dungeonsOP = action.payload;
            const list = Seq(dungeonsOP)
            // .map(dungeonpPresence => new Dungeon(dungeonpPresence))
                .toList();
            // state.dungeonsOP[action.payload.id].set(action.payload);

            return state.update('dungeonsOP', map => map.set(state.viewer.id,dungeonsOP));
        }

        default:
            return state;
    }
};

export default dungeonsReducer;